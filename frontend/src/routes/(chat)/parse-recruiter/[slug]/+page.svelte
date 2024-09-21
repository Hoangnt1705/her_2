<script>
	import { visible } from './../../../../lib/stores.js';
    import '$lib/css/main.css'
    import { getContext, onMount, setContext, tick, onDestroy, afterUpdate, beforeUpdate } from 'svelte'
    import Nav from '$lib/components/Nav.svelte'
    import { sidebar } from '$lib/stores.js'
    import { invalidateAll } from '$app/navigation'
    import { svg } from '$lib/constants.js'
    import { browser } from '$app/environment'
    import { fade } from 'svelte/transition'
    import ParseRecruiter from '$lib/components/ParseRecruiter.svelte'
    import { END_POINT } from '$lib/constants.js'
    import { accessToken, dataParseRecruiter, statusSend } from '$lib/stores.js'
    import AlertMissingField from '$lib/components/alert/alertMissingField.svelte';

    import axios from 'axios'
  
    export let data;
  
    let selectedModel = 'gpt-3'
    let messageBoxHeight = '30px'
    let translateXContent = '0px'
    let inputParseRecruiter
    let disabled = false
    let btnFocus = ''
    let div;
    let visibleWarning = false;
    let errorMessage;
    const focus = (node) => node.focus();
    
  
    // Select a random placeholder text from the array
    // $: console.log('>>>>>>>>>>>>>>>>>>>>>>>>', $dataParseRecruiter)

    let inputHasValue = false
  
    $: $sidebar ? (translateXContent = '0px') : (translateXContent = '259px')
    // function selectModel(model) {
    //   selectedModel = model
    // }
  
    // function updateMessageBoxHeight() {
    //   const messageBox = document.getElementById('message')
    //   messageBoxHeight = `${messageBox.scrollHeight + 2}px`
    //   if (messageBoxHeight > '200px') {
    //     messageBoxHeight = '200px'
    //   }
    // }
  

    const handleInputChange = (event) => {
      if (event.target.value.trim().length > 0) inputHasValue = true
    }
  
    const handleKeyDown = async (e) => {
      if (e.keyCode === 13 && !e.shiftKey) {
        return handleParseRecruiter()
      } else return
    }
    const handleParseRecruiter = async () => {
    if(!inputParseRecruiter.trim()) return;
    const wordCount = inputParseRecruiter.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 200) {
      disabled = true;
      visibleWarning = true;
      errorMessage = `Your input contains only ${wordCount} word${wordCount === 1 ? '' : 's'}. Please enter at least 200 words.`;
      return setTimeout(async () => {
        visibleWarning = false;
        disabled = false;
        await tick();
        inputParseRecruiter = '';
      }, 1500);
    } else {
      // Perform the form submission or other actions here
      // Disable the button
      disabled = true;
      errorMessage = '';
    }

    console.log(!inputParseRecruiter.trim())
    try {
      disabled = true
      let response = new Promise((resolve, reject) => {
        axios
          .post(
            `${END_POINT}/v1/parse-recruiter/`,
            { data: inputParseRecruiter.trim(), cid: data.cid },
            {
              headers: { authorization: `Bearer ${$accessToken}` },
            },
          )
          .then((value) => {
            if (value.status === 200) {
              resolve(value)
            } else {
              reject(new Error('error'))
            }
            disabled = false
          })
          .catch((err) => {
            reject(new Error(err.message))
            disabled = false
          })
      })
      let get = await response;
      statusSend.set(get.status);
      data.data = [get.data.data.result, ...data.data]
      console.log('>>>>>',get.data.data.result);
      console.log('data.data', data.data);
      // post data into database 
      inputParseRecruiter = '';
      await tick();
      btnFocus.focus();
      return data;
    } catch (error) {
      console.log(error)
    }
  }

    // function handleUpdate(event) {
    //   isOpen = event.detail.isOpen
    // }
    afterUpdate(() => {
      div.scrollTo(0, 0);
    });
  </script>
  
 
    <AlertMissingField visible={visibleWarning} content={errorMessage} title="Warning!"/>
    <main class="main-page content-center" bind:this={div}>
      <Nav />
      <div
        class="grid grid-cols-1 text-xl leading-6 justify-center
        .max-h-1 wrap-view-parse-recruiter">
        <div class="view new-func-view">
          <div class="p-4 rounded-lg col-span-1">
            <div data-mdb-input-init class="form-outline">
              <div class="mx-auto">
                <textarea
                  {disabled}
                  bind:value={inputParseRecruiter}
                  on:input={handleInputChange}
                  on:keydown={handleKeyDown}
                  bind:this={btnFocus}
                  use:focus
                  placeholder="Paste Recruitment Information"
                  style="clear: both;"
                  rows="8"
                  class="block p-2.5 w-full text-base text-gray-900 bg-gray-50
                  rounded-lg border border-gray-300 focus:ring-red-500
                  focus:border-red-500 textareaScroll outline-none
                   disabled:opacity-50 disabled:pointer-events-none
                  dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                  dark:placeholder-neutral-500 dark:focus:ring-neutral-600 textareaScroll" />
                <!-- dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 -->
              </div>
            </div>
          </div>
          <div class="p-4 rounded-lg col-span-2 text-center">
            <div class="inline-flex gap-2">
              <button 
                type="button"
                on:click={handleParseRecruiter}
                class="flex items-center gap-2 py-2.5 px-5 text-sm gap-1 select-none rounded-lg bg-red-600 py-2 px-4 text-center align-middle
                font-sans text-xs font-bold uppercase text-white shadow-md
                shadow-gray-900/10 transition-all {!inputParseRecruiter?.trim() ? '' : 'hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'}
                disabled:cursor-not-allowed disabled:opacity-50
                disabled:shadow-none " disabled={disabled || !inputParseRecruiter?.trim()}>
                {@html disabled ? svg.spinnerLoading : svg.btnParseRecruiter}
                Condense
              </button>
            </div>
          </div>

        
            
          <div class="p-4 rounded-lg col-span-2 font-bold">
            {#if disabled}
            <div style="margin-bottom: 50px">
              {@html svg.loadingTablePR}            
            </div>
            {/if}
            <ParseRecruiter data={data.data}/>
          </div>
        </div>
      </div>
    </main>
  
  <!-- <Row>
                <Col xs="3">.col-3</Col>
                <Col xs="auto">.col-auto - variable width content</Col>
                <Col xs="3">.col-3</Col>
              </Row>
              <Row>
                <Col xs="6">.col-6</Col>
                <Col xs="6">.col-6</Col>
              </Row>
              <Row>
                <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
                <Col xs="6" sm="4">.col-6 .col-sm-4</Col>
                <Col sm="4">.col-sm-4</Col>
              </Row>
              <Row>
                <Col sm={{ size: 6, order: 2, offset: 1 }}>
                  .col-sm-6 .order-sm-2 .offset-sm-1
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  .col-sm-12 .col-md-6 .offset-md-3
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
                <Col sm={{ size: 'auto', offset: 1 }}>.col-sm-auto .offset-sm-1</Col>
              </Row>
              <Row cols={2}>
                <Col>col-1</Col>
                <Col>col-2</Col>
                <Col>col-3</Col>
                <Col>col-4</Col>
                <Col>col-5</Col>
                <Col>col-6</Col>
              </Row>
              <Row cols={{ lg: 3, md: 2, sm: 1 }}>
                <Col>col-1</Col>
                <Col>col-2</Col>
                <Col>col-3</Col>
                <Col>col-4</Col>
                <Col>col-5</Col>
                <Col>col-6</Col>
              </Row> -->
  
  <!-- 
              <div class="model-selector">
                <button
                class="gpt-4"
                class:selected={selectedModel === 'gpt-4'}
                on:click={() => selectModel('gpt-4')}>
                  <i class="fa fa-wand-magic-sparkles" />
                  GPT-4
                  <div class="model-info">
                    <div class="model-info-box">
                      <p>Our most capable model, great for creative stuff.</p>
      
                      <p class="secondary">Available for Plus users.</p>
                    </div>
                  </div>
                </button>
                <button
                  class="gpt-4"
                  class:selected={selectedModel === 'gpt-4'}
                  on:click={() => selectModel('gpt-4')}>
                  <i class="fa fa-wand-magic-sparkles" />
                  GPT-4
                  <div class="model-info">
                    <div class="model-info-box">
                      <p>Our most capable model, great for creative stuff.</p>
      
                      <p class="secondary">Available for Plus users.</p>
                    </div>
                  </div>
                </button>
              </div>
             -->
  
  <!-- <div id="message-form">
              <div class="message-wrapper">
                <textarea
                  id="message"
                  rows="1"
                  placeholder="Send a message"
                  on:input={updateMessageBoxHeight} />
                <button class="send-button">
                  <i class="fa fa-paper-plane" />
                </button>
              </div>
              <div class="disclaimer">
                Her can make mistakes. Consider checking important information.
              </div>
            </div> -->
  