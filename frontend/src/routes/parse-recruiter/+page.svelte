<script>
  import '$lib/css/main.css'
  import { getContext, onMount, setContext, tick, onDestroy } from 'svelte'
  import Sidebar from '$lib/components/Sidebar.svelte'
  import { sidebar } from '$lib/stores.js'
  import { accessToken, user } from '$lib/stores.js'
  import { invalidateAll } from '$app/navigation'
  import SidebarToggle from '$lib/components/SidebarToggle.svelte'
  import { svg } from '$lib/constants.js'
  import { browser } from '$app/environment'
  import { fade } from 'svelte/transition'
  import ParseRecruiter from '$lib/components/ParseRecruiter.svelte';
  import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    Row,
    Col,
  } from '@sveltestrap/sveltestrap'

  import { Styles } from '@sveltestrap/sveltestrap'

  // $: console.log($myContext)
  let selectedModel = 'gpt-3'
  let messageBoxHeight = '30px'
  let translateXContent = '0px'
  let isOpen = true
  export let data

  $: $sidebar ? (translateXContent = '0px') : (translateXContent = '259px')

  function selectModel(model) {
    selectedModel = model
  }

  function updateMessageBoxHeight() {
    const messageBox = document.getElementById('message')
    messageBoxHeight = `${messageBox.scrollHeight + 2}px`
    if (messageBoxHeight > '200px') {
      messageBoxHeight = '200px'
    }
  }
  let text = ''
  let typingSpeed = 50 // Adjust typing speed as needed

  // Select a random placeholder text from the array
  let randomIndex = Math.floor(Math.random() * data.placeholderTexts.length)
  let placeholderText = data.placeholderTexts[randomIndex]
  let inputHasValue = false

  const typeWriter = () => {
    if (!inputHasValue && text.length < placeholderText.length) {
      text = placeholderText.slice(0, text.length + 1)
      setTimeout(typeWriter, typingSpeed)
    } else {
      setTimeout(() => {
        text = ''
        placeholderText =
          data.placeholderTexts[
            Math.floor(Math.random() * data.placeholderTexts.length)
          ]
        setTimeout(typeWriter, typingSpeed)
      }, 1500)
    }
  }

  const handleInputChange = (event) => {
    if (event.target.value.trim().length > 0) inputHasValue = true
  }

  const stopAutoWriter = () => {
    inputHasValue = true
  }
  let countStaticPR = 0
  const handleStaticPR = () => {
    if (countStaticPR <= data.staticParseRecruiter.length - 1) {
      data.staticParseRecruiter[countStaticPR].state = true
      setTimeout(handleStaticPR, 500)
    }
    countStaticPR++
  }

  onDestroy(() => {
    stopAutoWriter()
  })

  onMount(() => {
    typeWriter()
    handleStaticPR()
  })

  // function handleUpdate(event) {
  //   isOpen = event.detail.isOpen
  // }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer" />
</svelte:head>

<Styles />

{#if browser}
  <main class="main-page overflow-auto">
    <Navbar class="hide-navbar" light expand="md">
      <SidebarToggle visible={$sidebar ? 'visible' : 'hidden'} />

      <NavItem class="remove-style-li">
        <div class="drop-menu-toggle">
          <div
            class="drop"
            style="display:flex"
            on:click={() => (isOpen = !isOpen)}>
            <span>chatGPT</span>
            {@html svg.downDrop}
          </div>
        </div>
        <div class="drop-main">
          <ul class:open-drop-menu={isOpen} class="drop-menu-main-page">
            <div class="titleSelectModelAi">
              <div>Model</div>
            </div>
            <div class="drhv intern-ai-drop">
              <div>
                {@html svg.internAi}
              </div>
              <div class="wrap-style-intern">
                <div
                  class="bold-intern-ai-drop font-bold text-navy-700
                  dark:text-white">
                  Condense Job Posting Information
                  <!-- Condense Job Posting Information -->
                </div>
                <div class="static-intern-ai-drop text-base text-gray-600">
                  Great information Analysis Functionality
                </div>
              </div>
              <div>
                {@html svg.activeModel}
              </div>
            </div>
            <div class="drhv senior-ai-drop">
              <div>
                {@html svg.seniorAi}
              </div>
              <div class="wrap-style-senior">
                <div
                  class="bold-senior-ai-drop font-bold text-navy-700
                  dark:text-white">
                  Senior AI
                </div>
                <div class="static-senior-ai-drop text-base text-gray-600">
                  Generate a Resume with AI Using Two-Way Data for Precision.
                </div>
                <Button class="update-to-senior">Upgrade to Senior</Button>
              </div>
              <div>
                {@html svg.activeModel}
              </div>
            </div>
          </ul>
        </div>
      </NavItem>

      <NavItem class="new-write remove-style-li" style="padding:12px">
        {@html svg.newWrite}
      </NavItem>
    </Navbar>

    <Container class="view new-func-view">
      <Row>
        <Col>
          <div data-mdb-input-init class="form-outline">
            <textarea
              class="form-control"
              id="textAreaExample1"
              rows="6"
              placeholder={text}
              on:input={handleInputChange} />
          </div>
        </Col>
      </Row>
      <Row style="margin: 20px auto">
        <Col xs="10">
          <Button outline color="danger">Condense</Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <ParseRecruiter data={data} />
        </Col>
      </Row>
    </Container>
  </main>
{/if}

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
