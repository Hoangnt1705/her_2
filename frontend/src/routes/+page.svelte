<script>
  import ProtectedRoute from '$lib/components/ProtectedRoute.svelte'
  import '$lib/css/main.css'
  import { getContext, onMount, setContext, tick } from 'svelte'
  import Sidebar from '$lib/components/Sidebar.svelte'
  import { sidebar } from '$lib/stores.js'
  import { accessToken, user } from '$lib/stores.js'
  import {invalidateAll} from '$app/navigation'


  // const myContext = getContext('myContext')
  // $: console.log($myContext)

  let newChatView = true
  let selectedModel = 'gpt-3'
  let messageBoxHeight = '30px'

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
  function showView(view) {
    newChatView = view === 'newChat'
  }

</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer" />

</svelte:head>

<ProtectedRoute>

  <main class="main-page">
    {#if newChatView}
      <div class="view new-chat-view" class:show-main-page={$sidebar}>
        <div class="model-selector">
          <button
            class="gpt-3"
            class:selected={selectedModel === 'gpt-3'}
            on:click={() => selectModel('gpt-3')}>
            <i class="fa fa-bolt" />
            GPT-3.5
            <div class="model-info">
              <div class="model-info-box">
                <p>Our fastest model, great for most every day tasks.</p>

                <p class="secondary">Available to Free and Plus users</p>
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

        <!-- <div class="logo">ChatWTF</div> -->
      </div>
      
    {:else}
      <div class="view conversation-view">
        <div class="model-name">
          <i class="fa fa-bolt" />
          Default (GPT-3.5)
        </div>
        <div class="user message">
          <div class="identity">
            <i class="user-icon">u</i>
          </div>
          <div class="content">
            <p>Hello, how are you?</p>
          </div>
        </div>
        <div class="assistant message">
          <div class="identity">
            <i class="gpt user-icon">G</i>
          </div>
          <div class="content">
            <p>I'm doing well, thank you!</p>
          </div>
        </div>
      </div>
      
    {/if}
    
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

  </main>
</ProtectedRoute>
