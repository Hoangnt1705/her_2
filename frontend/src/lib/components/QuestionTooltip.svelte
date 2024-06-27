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
<div class="relative inline-block">
  <button
    class="bg-primary inline-flex rounded text-base font-semibold text-black
    whitespace-nowrap"
    on:mouseover={showTooltip}
    on:mouseout={hideTooltip}>
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25
        12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75
        12 2.75ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75
        6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25
        17.9371 1.25 12ZM12 7.75C11.3787 7.75 10.875 8.25368 10.875 8.875C10.875
        9.28921 10.5392 9.625 10.125 9.625C9.71079 9.625 9.375 9.28921 9.375
        8.875C9.375 7.42525 10.5503 6.25 12 6.25C13.4497 6.25 14.625 7.42525
        14.625 8.875C14.625 9.83834 14.1056 10.6796 13.3353 11.1354C13.1385
        11.2518 12.9761 11.3789 12.8703 11.5036C12.7675 11.6246 12.75 11.7036
        12.75 11.75V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25
        13.4142 11.25 13V11.75C11.25 11.2441 11.4715 10.8336 11.7266
        10.533C11.9786 10.236 12.2929 10.0092 12.5715 9.84439C12.9044 9.64739
        13.125 9.28655 13.125 8.875C13.125 8.25368 12.6213 7.75 12 7.75ZM12
        17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11
        15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
        fill="#1C274C" />
    </svg>
  </button>
  <div
    style="margin-left: 0"
    class="absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 border w-[200px] 
    border-gray-300 rounded-md bg-white py-3 px-4 text-xs text-gray-800
    font-medium shadow-[-12px_0px_30px_-4px_rgba(16,24,40,0.08)]
    transition-opacity {isTooltipVisible ? 'visible' : 'invisible'} w-full "
    role="tooltip"
    id="left-tooltip">
    <span
      class="absolute -left-1.5 top-1/2 -z-10 h-3 w-3 border-gray-300 border-b
      border-l -translate-y-1/2 rotate-45 bg-white" />
      {information}
  </div>
</div>
