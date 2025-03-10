<script>
  import { svg } from "$lib/constants.js";
  import { sidebar } from "$lib/stores.js";
  import SidebarToggle from "$lib/components/SidebarToggle.svelte";
  import { page, navigating } from "$app/stores";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let isOpen = true;
  let loadPage = true;
  export let hiddenNavItems;

  // Regular expressions for dynamic paths
  const parseRecruiterPath = /^\/parse-recruiter(\/[^\/]+)?$/;
  const createCvPath = /^\/resume-ai(\/[^\/]+)?$/;
  // Function to check if a path matches a regex
  function isActivePath(regex) {
    return regex.test($page.url.pathname);
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
  <SidebarToggle visible={!$sidebar ? 'visible' : 'hidden'} />

  <li
    class="remove-style-li"
    style={hiddenNavItems ? 'visibility: hidden' : ''}>
    <div class="drop-menu-toggle">
      <button
        class="drop"
        style="display:flex;"
        on:click={() => (isOpen = !isOpen)}>
        <span>
          {#if isActivePath(parseRecruiterPath)}Condense{:else}Resume AI{/if}
        </span>
        {@html svg.downDrop}
      </button>
    </div>
    <div class="drop-main">
      <ul class:open-drop-menu={isOpen} class="drop-menu-main-page">
        <div class="titleSelectModelAi">
          <div>Model</div>
        </div>

        <a
          href={isActivePath(parseRecruiterPath) ? '' : '/parse-recruiter'}
          class="drhv intern-ai-drop"
          on:click={() => (isActivePath(parseRecruiterPath) ? '' : (loadPage = !loadPage))}
          aria-current={isActivePath(parseRecruiterPath)}
          class:active={isActivePath(parseRecruiterPath)}
          data-sveltekit-preload-code>
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
          href={isActivePath(createCvPath) ? '' : '/resume-ai'}
          class="drhv senior-ai-drop"
          on:click={() => (isActivePath(createCvPath) ? '' : (loadPage = !loadPage))}
          aria-current={isActivePath(createCvPath)}
          class:active={isActivePath(createCvPath)}
          data-sveltekit-preload-code>
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
              cursor-pointer font-semibold text-center transition-all
              duration-500"
              style=" background-color: #8546F0; /* Button color */ box-shadow:
              0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19); /*
              Shadow for depth */ position: relative; overflow: hidden; /*
              Ensures the glossy effect stays inside the button */ transition:
              background-color 0.3s ease, box-shadow 0.3s ease; "
              onmouseover="this.style.boxShadow='0 8px 16px rgba(0, 0, 0, 0.3),
              0 12px 24px rgba(0, 0, 0, 0.22)';"
              onmouseout="this.style.boxShadow='0 4px 8px rgba(0, 0, 0, 0.2), 0
              6px 20px rgba(0, 0, 0, 0.19)';">
              Upgrade to Resume AI
              <!-- Glossy Effect -->
              <div
                style=" content: ''; position: absolute; top: 0; left: 0; right:
                0; height: 50%; background: rgba(255, 255, 255, 0.2); /* White
                glossy layer */ border-radius: inherit; pointer-events: none;
                transform: translateY(-100%); transition: transform 0.5s ease; " />

            </button>
          </div>
          <div>
            {#if isActivePath(createCvPath)}
              {@html svg.activeModel}
            {/if}
          </div>

        </a>
        <div
          class:hidden={loadPage}
          class="absolute top-0 start-0 size-full bg-white/50 rounded-lg " />

        <div
          class:hidden={loadPage}
          class="absolute top-1/2 start-1/2 transform -translate-x-1/2
          -translate-y-1/2">
          <div class="grid gap-3">
            <div class="flex items-center justify-center">
              <svg
                class="animate-spin border-red-600"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none">
                <circle
                  cx="15"
                  cy="15"
                  r="14"
                  stroke="#DC2626"
                  stroke-width="2"
                  stroke-dasharray="6 6" />
              </svg>
            </div>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </ul>
    </div>
  </li>

  <li
    on:click={() => goto('/')}
    data-ripple-light="true"
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
