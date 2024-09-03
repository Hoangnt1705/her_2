<script>
  import { slide } from "svelte/transition";
  let isOpen = false;

  // Function to toggle the sidebar
  function toggleSidebar() {
    isOpen = !isOpen;
  }
</script>

<style>
  /* Sidebar styling */
  .sidebar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: rgba(
      249,
      217,
      217,
      0.7
    ); /* Modern translucent background matching #f9d9d9 */
    backdrop-filter: blur(15px); /* Stronger blur for a modern look */
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }

  /* Content inside the sidebar */
  .content {
    color: #333;
    text-align: center;
  }

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
</style>

<!-- Redesigned sidebar toggle button -->
<div class="fixed bottom-10 left-0 right-0 flex justify-center z-50">
  <button
    on:click={toggleSidebar}
    class="relative bg-white bg-opacity-70 backdrop-blur-md p-3 rounded-full
    shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center
    justify-center">
    <!-- Arrow animation -->
    <div class="flex flex-col space-y-1">
      <span
        class="block w-2 h-2 bg-blue-500 rounded-full animate-bounce arrow" />
      <span
        class="block w-2 h-2 bg-blue-500 rounded-full animate-bounce arrow
        delay-75" />
      <span
        class="block w-2 h-2 bg-blue-500 rounded-full animate-bounce arrow
        delay-150" />
    </div>
  </button>
</div>

<!-- Sidebar container -->
{#if isOpen}
  <div class="sidebar" in:slide={{ y: 200 }} out:slide={{ y: 200 }}>
    <!-- Sidebar content -->
    <div class="content">
      <p>Sidebar Content</p>
    </div>
  </div>
{/if}

