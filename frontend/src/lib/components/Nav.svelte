<script>
  import { svg } from '$lib/constants.js'
  import { sidebar } from '$lib/stores.js'
  import SidebarToggle from '$lib/components/SidebarToggle.svelte'


  let isOpen = true;
  export let hiddenNavItems;

</script>


<ul class="hide-navbar">
  <SidebarToggle visible={$sidebar ? 'visible' : 'hidden'} />
  
  <li class="remove-style-li" style="{hiddenNavItems ? 'visibility: hidden' : ''}">
    <div class="drop-menu-toggle">
      <div
        class="drop"
        style="display:flex;"
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
              class="bold-intern-ai-drop font-bold text-navy-700 dark:text-white">
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
              class="bold-senior-ai-drop font-bold text-navy-700 dark:text-white">
              Senior AI
            </div>
            <div class="static-senior-ai-drop text-base text-gray-600">
              Generate a Resume with AI Using Two-Way Data for Precision.
            </div>
            <button type='button' class='update-to-senior py-2.5 px-6 text-sm rounded-lg text-white cursor-pointer font-semibold text-center shadow-xs transition-all duration-500'>
              Upgrade to Senior</button>
          </div>
          <div>
            {@html svg.activeModel}
          </div>
        </div>
      </ul>
    </div>
  </li>

  <li class="new-write remove-style-li" style="padding:12px; {hiddenNavItems ? 'visibility: hidden' : ''}">
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
