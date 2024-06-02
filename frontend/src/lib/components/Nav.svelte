<script>
  import { svg } from '$lib/constants.js'
  import { sidebar } from '$lib/stores.js'
  import SidebarToggle from '$lib/components/SidebarToggle.svelte'
  import { page, navigating } from '$app/stores'
  import { onMount } from 'svelte'
  let isOpen = true
  export let hiddenNavItems

  // Regular expressions for dynamic paths
  const parseRecruiterPath = /^\/parse-recruiter(\/[^\/]+)?$/
  const createCvPath = /^\/create-cv(\/[^\/]+)?$/
  // Function to check if a path matches a regex
  function isActivePath(regex) {
    return regex.test($page.url.pathname)
  }
</script>

<style>
  .active {
    background-color: #e2e8f0; /* Example background color */
    color: #1b254b; /* Example text color */
    border-radius: 4px;
    cursor: default;
  }

  .drhv {
    display: flex;
    align-items: center;
    padding: 10px; /* Example padding */
    transition: background-color 0.3s ease;
  }
</style>

<ul class="hide-navbar">
  <SidebarToggle visible={$sidebar ? 'visible' : 'hidden'} />

  <li
    class="remove-style-li"
    style={hiddenNavItems ? 'visibility: hidden' : ''}>
    <div class="drop-menu-toggle">
      <button
        class="drop"
        style="display:flex;"
        on:click={() => (isOpen = !isOpen)} on:blur={() => (isOpen = !isOpen)}>
        <span>{#if isActivePath(parseRecruiterPath)}Condense{:else}Resume AI{/if}</span> 
        {@html svg.downDrop}
      </button>
    </div>
    <div class="drop-main">
      <ul class:open-drop-menu={isOpen} class="drop-menu-main-page">
        <div class="titleSelectModelAi">
          <div>Model</div>
        </div>

        <a
          href={isActivePath(parseRecruiterPath) ? $page.url.pathname : '/parse-recruiter'}
          class="drhv intern-ai-drop"
          aria-current={isActivePath(parseRecruiterPath)}
          class:active={isActivePath(parseRecruiterPath)}>
          <div>
            {@html svg.internAi}
          </div>
          <div class="wrap-style-intern">
            <div class="bold-intern-ai-drop font-bold text-navy-700">
              Condense Job Posting Information
            </div>
            <div class="static-intern-ai-drop text-sm text-slate-500">
              Great information Analysis Functionality
            </div>
          </div>
          <div>
            {#if isActivePath(parseRecruiterPath)}
              {@html svg.activeModel}
            {/if}
          </div>
        </a>

        <a
          href={isActivePath(createCvPath) ? $page.url.pathname : '/create-cv'}
          class="drhv senior-ai-drop"
          aria-current={isActivePath(createCvPath)}
          class:active={isActivePath(createCvPath)}>
          <div>
            {@html svg.seniorAi}
          </div>
          <div class="wrap-style-senior">
            <div class="bold-senior-ai-drop font-bold text-navy-700">
              Resume AI
            </div>
            <div class="static-senior-ai-drop text-sm text-slate-500">
              Generate a Resume with AI Using Two-Way Data for Precision.
            </div>
            <button
              type="button"
              class="update-to-senior py-2.5 px-6 text-sm rounded-lg text-white
              cursor-pointer font-semibold text-center shadow-xs transition-all
              duration-500">
              Upgrade to Resume AI
            </button>
          </div>
          <div>
            {#if isActivePath(createCvPath)}
              {@html svg.activeModel}
            {/if}
          </div>
        </a>
      </ul>
    </div>
  </li>

  <li
    class="new-write remove-style-li"
    style="padding:12px; {hiddenNavItems ? 'visibility: hidden' : ''}">
    {@html svg.newWrite}
  </li>
</ul>

<!-- <script>

</script><nav>
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
</nav> -->
