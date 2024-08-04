<script>
  import { onMount, afterUpdate  } from "svelte";
  import flatpickr from "flatpickr";
  import "flatpickr/dist/flatpickr.min.css";

  let datepicker;
  export let birthday;

  function applyCustomStyles(instance) {
    const calendarContainer = instance?.calendarContainer;
    const calendarMonthNav = instance?.monthNav;
    const calendarNextMonthNav = instance?.nextMonthNav;
    const calendarPrevMonthNav = instance?.prevMonthNav;
    const calendarDaysContainer = instance?.daysContainer;

    if (calendarContainer) {
      calendarContainer.className = `${calendarContainer.className} bg-white p-4 border border-blue-gray-50 rounded-lg shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 focus:outline-none break-words whitespace-normal`;
    }

    if (calendarMonthNav) {
      calendarMonthNav.className = `${calendarMonthNav.className} flex items-center justify-between mb-4 [&>div.flatpickr-month]:-translate-y-[-3px]`;
    }

    if (calendarNextMonthNav) {
      calendarNextMonthNav.className = `${calendarNextMonthNav.className} absolute !top-2.5 !right-1.5 h-6 w-6 bg-transparent hover:bg-blue-gray-50 !p-1 rounded-md transition-colors duration-300`;
    }

    if (calendarPrevMonthNav) {
      calendarPrevMonthNav.className = `${calendarPrevMonthNav.className} absolute !top-2.5 !left-1.5 h-6 w-6 bg-transparent hover:bg-blue-gray-50 !p-1 rounded-md transition-colors duration-300`;
    }

    if (calendarDaysContainer) {
      calendarDaysContainer.className = `${calendarDaysContainer.className} [&_span.flatpickr-day]:!rounded-md [&_span.flatpickr-day.selected]:!bg-gray-900 [&_span.flatpickr-day.selected]:!border-gray-900`;
    }
  }

  onMount(() => {
    datepicker = flatpickr("#date-picker", {
      onReady: (selectedDates, dateStr, instance) => {
        applyCustomStyles(instance);
      },
      onChange: (selectedDates, dateStr, instance) => {
        applyCustomStyles(instance);
      }
    });
  });
</script>

<style>
  .flatpickr-calendar {
    z-index: 16; /* Ensure the date picker appears above other elements */
  }
</style>


<div class="relative">
  <input
    bind:value={birthday}
    id="date-picker"
    class="peer p-4 block w-full border-gray-200 rounded-lg text-sm
    placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500
    dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
    dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2
    [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2
    autofill:pt-6 autofill:pb-2 outline-none"
    placeholder="Address" />
  <label
    for="hs-floating-input-address"
    class="absolute top-0 left-0 p-4 h-full text-sm truncate pointer-events-none
    transition ease-in-out duration-100 border border-transparent origin-[0_0]
    dark:text-white peer-focus:scale-90 peer-focus:translate-x-0.5
    peer-focus:-translate-y-1.5 peer-focus:text-gray-500
    dark:peer-focus:text-neutral-500 peer-[&:not(:placeholder-shown)]:scale-90
    peer-[&:not(:placeholder-shown)]:translate-x-0.5
    peer-[&:not(:placeholder-shown)]:-translate-y-1.5
    peer-[&:not(:placeholder-shown)]:text-gray-500
    dark:peer-[&:not(:placeholder-shown)]:text-neutral-500">
    --Please select birthday--
  </label>
</div>
