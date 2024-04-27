<script>
  import ProtectedRoute from '$lib/components/ProtectedRoute.svelte';
  import '$lib/css/main.css';
  import { onMount, tick } from 'svelte';

  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import {user} from '$lib/store.js';

  let sidebar = true
  let userMenu = false
  let newChatView = true
  let selectedModel = 'gpt-3'
  let messageBoxHeight = '30px'
  let showAnimate = false
  function toggleSidebar() {
    sidebar = !sidebar
  }

  async function toggleUserMenu() {
    userMenu = !userMenu
    setTimeout(() => {
      showAnimate = !showAnimate
    }, 200)
  }

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
  <section
    style="width: 100%; display: flex; height: 100vh; box-sizing: border-box;
    margin: 0; padding: 0">
    <nav
      id="sidebar"
      class:hidden={!sidebar}
      transition:slide={{ duration: 200, quintOut: quintOut }}>
      <div class="float-top">
        <div class="sidebar-controls">
          <button class="new-chat">
            <i class="fa fa-plus" />
            New chat
          </button>
          <button on:click={toggleSidebar} class="hide-sidebar">
            <i class="fa fa-chevron-left" />
          </button>
        </div>
        <ul class="conversations">
          <li class="grouping">Today</li>
          <li class="active">
            <button class="conversation-button">
              <i class="fa fa-message fa-regular" />
              This is a conversation title
            </button>
            <div class="fade" />
            <div class="edit-buttons">
              <button>
                <i class="fa fa-edit" />
              </button>
              <button>
                <i class="fa fa-trash" />
              </button>
            </div>
          </li>
          <li class="grouping">Yesterday</li>
          <li>
            <button class="conversation-button">
              <i class="fa fa-message fa-regular" />
              This is a very super long conversation title that doesn't fit
            </button>
            <div class="fade" />
            <div class="edit-buttons">
              <button>
                <i class="fa fa-edit" />
              </button>
              <button>
                <i class="fa fa-trash" />
              </button>
            </div>
          </li>
          <li class="grouping">Previous 7 days</li>
        </ul>
      </div>
      <div class="user-menu">
        <button on:click={toggleUserMenu}>
          <i class="user-icon">u</i>
          username
          <i class="fa fa-ellipsis dots" />
        </button>
        <ul
          class:show={userMenu}
          class:show-animate={showAnimate}
          transition:slide={{ duration: 200, easing: quintOut }}>
          <li>
            <button>My plan</button>
          </li>
          <li>
            <button>Custom instructions</button>
          </li>
          <li>
            <button>Settings &amp; Beta</button>
          </li>
          <li>
            <button>Log out</button>
          </li>
        </ul>
      </div>
    </nav>
    <main>
      {#if newChatView}
        <div class="view new-chat-view">
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
      <div id="message-form">
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
      </div>

    </main>
  </section>
</ProtectedRoute>
