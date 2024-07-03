<script>
  export let information
  let isTooltipVisible = false

  function showTooltip() {
    isTooltipVisible = true
  }

  function hideTooltip() {
    isTooltipVisible = false
  }
</script>

<style>
  button {
		display: block;
		margin: 0px;
		padding: 0px;
		border: medium none;
		background: transparent none repeat scroll 0% 0%;
		cursor: pointer;
		text-align: left;
		font: inherit;
		opacity: 0.75;
	}
	
	.visuallyHidden {
		position: absolute;
		overflow: hidden;
		clip: rect(0px, 0px, 0px, 0px);
		height: 1px;
		width: 1px;
		margin: -1px;
		padding: 0px;
		border: 0px none;
	}
  .invisible {
    visibility: hidden;
    opacity: 0;
  }
  .visible {
    visibility: visible;
    opacity: 1;
  }
  .transition-opacity {
    transition: opacity 0.3s;
  }
</style>

<div />
<!-- Show tooltip on -->
<div class="relative inline-block pl-2 content-center">
  <button on:mouseover={showTooltip} on:mouseout={hideTooltip}>
    <svg class="w-[20px]" fill="none" style="display:inline-block;vertical-align:middle" height="48" width="48" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
      <line x1="12" y1="17" x2="12" y2="17"></line>
    </svg>
    <div class="visuallyHidden">Help icon (Question mark in a circle)</div>
  </button>
 
  <div
    class="absolute left-full top-1/2 z-20 -translate-y-1/2 border w-[200px] 
    border-gray-300 rounded-md bg-white py-3 px-2 text-xs text-gray-800 ml-3.5 mt-[-5px]
    font-medium shadow-[-12px_0px_30px_-4px_rgba(16,24,40,0.08)]
    transition-opacity {isTooltipVisible ? 'visible' : 'invisible'}"
    role="tooltip"
    id="left-tooltip">
    <span
      class="absolute -left-1.5 top-1/2 -z-10 h-3 w-3 border-gray-300 border-b
      border-l -translate-y-1/2 rotate-45 bg-white" />
      {information}
  </div>
</div>
