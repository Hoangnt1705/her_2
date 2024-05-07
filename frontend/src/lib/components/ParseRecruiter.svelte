<script>
  import { fade } from 'svelte/transition'
  export let data
</script>

<div
  class="flex-col justify-center items-center h-[10vh]"
  style="flex-wrap: wrap;">
  <div
    class="relative flex flex-col items-center rounded-[20px] w-[700px]
    max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500
    dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
    <div class="mt-2 mb-8 w-full ">
      <h4 class="px-2 text-xl font-bold text-navy-700 dark:text-white">
        {#if data.staticParseRecruiter[0].state}
          {data.staticParseRecruiter[0].content}
        {/if}
      </h4>
    </div>
    <div class="grid grid-cols-2 gap-4 px-2 w-full">
      {#each data.staticParseRecruiter.slice(1, data.staticParseRecruiter.length) as item (item.title)}
        {#if item.state}
          <div
            transition:fade
            class="flex flex-col items-start justify-center rounded-2xl bg-white
            bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500
            dark:!bg-navy-700 dark:shadow-none">
            <p class="text-sm text-gray-600">{item.title}</p>
            <p class="text-base font-medium text-navy-700 dark:text-white">
              {item.content}
            </p>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>

<svelte:head>

  <link
    rel="stylesheet"
    href="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/css/main.ad49aa9b.css" />

</svelte:head>
