<script>
  import { slide, fly, fade } from "svelte/transition";
  import CardHistoryConversationResume from "$lib/components/resume_ai/CardHistoryConversationResume.svelte";
  import { openSidebarResumeConversation, sidebar } from "$lib/stores.js";
  import { onMount } from "svelte";
  import interact from "interactjs"; // Updated import statement

  let isDragging = false; // Flag to track if the button was dragged

  // Function to toggle the sidebar
  function toggleSidebar() {
    // Only toggle sidebar if not dragging
    if (!isDragging) {
      openSidebarResumeConversation.update((sidebar) => (sidebar = !sidebar));
    }
  }

  // Drag move listener function
  function dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    // Apply transform for drag effect
    target.style.transform = `translate(${x}px, ${y}px)`;
    // Update attributes
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
  }

  onMount(() => {
    interact("#buttonResumeConversation").draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: ".main-page",
          endOnly: true,
        }),
      ],
      autoScroll: true,
      listeners: {
        start: (event) => {
          const target = event.target;
          target.style.opacity = "0.5"; // Set the opacity to 50% when dragging
        },
        move: (event) => {
          isDragging = true; // Set dragging to true on move
          dragMoveListener(event);
        },
        end: (event) => {
          const textEl = event.target.querySelector(
            "#buttonResumeConversation"
          );

          if (textEl) {
            textEl &&
              (textEl.textContent =
                "moved a distance of " +
                Math.sqrt(
                  (Math.pow(event.pageX - event.x0, 2) +
                    Math.pow(event.pageY - event.y0, 2)) |
                    0
                ).toFixed(2) +
                "px");
          }
          const target = event.target;
          target.style.opacity = "1";
          setTimeout(() => {
            isDragging = false; // Reset dragging flag after a delay to prevent immediate click
          }, 200); // Adjust the delay as needed
        },
      },
      cursorChecker: (action, interactable, element, interacting) => {
        return interacting ? "grabbing" : "pointer";
      },
      holdDuration: 500, // Time to hold before drag starts
    });
  });
</script>

<style>
  .content {
    display: flex;
    justify-content: center;
    overflow: auto;
    height: 600px;
  }
  .btnOffSidebar {
    width: 100%;
  }
  /* Sidebar styling */
  #buttonResumeConversation {
    z-index: 10;
    position: absolute; /* Position it relative to its container */
    top: 80%; /* Move it 50% down the screen */
    left: calc(50%); /* Move it 50% from the left */
    transform: translate(-50%, 0);
    background: transparent;
    background: linear-gradient(to top, rgba(241, 243, 251, 0) 0%, #f1f3fb 60%);
    touch-action: none;
    user-select: none;
    transform: translate(0px, 0px);
  }
  #buttonResumeConversation:hover {
    cursor: pointer; /* Pointer on hover */
  }

  #buttonResumeConversation:active {
    cursor: grabbing; /* Grabbing when active */
  }
  #buttonResumeConversation.offSidebar {
  }

  .sidebar {
    position: relative;
    width: 100%; /* Make the sidebar full width */
    height: 100%; /* Height of the sidebar */
    background: rgba(255, 255, 255, 0.7); /* Semi-transparent background */
    backdrop-filter: blur(10px); /* Blur effect */
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }

  /* Content inside the sidebar */

  /* Keyframe animation for bouncing arrows */
  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  /* Animation delays for staggered effect */
  .arrow {
    animation: bounce 1s infinite;
  }

  .delay-75 {
    animation-delay: 0.15s;
  }

  .delay-150 {
    animation-delay: 0.3s;
  }
  .arrow-down {
    animation: bounceArrowDown 1.5s infinite;
    width: 50px;
    margin: 0 auto;
    padding-bottom: 10px;
  }

  @media screen and (max-width: 768px) {
    #buttonResumeConversation {
      z-index: 4;
      transform: translate(-50%, 0);
    }
    .content{
      height: 1000px;
    }
  }

  @keyframes bounceArrowDown {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(10px); /* Adjust bounce height */
    }
  }
</style>

<!-- Sidebar toggle button -->
<button
  on:click={toggleSidebar}
  style="display: {$openSidebarResumeConversation ? 'none' : ''}"
  id="buttonResumeConversation"
  class:offSidebar={!$sidebar}
  class="bg-white bg-opacity-70 backdrop-blur-md p-3 rounded-full shadow-lg
  hover:shadow-xl transition-shadow duration-300 flex items-center
  justify-center">
  <!-- Arrow animation -->
  <div class="flex flex-col space-y-1">
    <span
      class="block w-2 h-2 bg-[#8546F0] rounded-full animate-bounce arrow" />
    <span
      class="block w-2 h-2 bg-[#8546F0] rounded-full animate-bounce arrow
      delay-75" />
    <span
      class="block w-2 h-2 bg-[#8546F0] rounded-full animate-bounce arrow
      delay-150" />
  </div>
</button>
<!-- Sidebar container -->
{#if $openSidebarResumeConversation}
  <div
    class="sidebar z-10"
    in:fly={{ y: 1000, duration: 300 }}
    out:fly={{ y: 600, duration: 50 }}>
    <div class="btnOffSidebar">
      <button class="arrow-down"  on:click={toggleSidebar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            d="M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0
            1.414 0l4-4a1 1 0 0 0 .217-1.09z"
            style="fill:#8546f0"
            data-name="Down" />
        </svg>
      </button>
    </div>

    <!-- Sidebar content -->
    <div>
      <div class="content">
        <CardHistoryConversationResume />
      </div>
    </div>
  </div>
{/if}
