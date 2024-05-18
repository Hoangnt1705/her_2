<script>
  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'
  export let data;
  let dataSuccess = data.data;
  let countStaticPR = 0
  // const handleStaticPR = () => {
  //   if (countStaticPR <= dataSuccess.length - 1) {
  //     dataSuccess[countStaticPR].state = true
  //     setTimeout(handleStaticPR, 200)
  //   }
  //   countStaticPR++
  // }
  function renameKey(obj, oldKey, newKey) {
    if (obj.hasOwnProperty(oldKey)) {
      obj[newKey] = obj[oldKey]
      delete obj[oldKey]
    }
  }
  $: if (dataSuccess) {
    renameKey(dataSuccess, 'salary_max', 'salary max')
    renameKey(dataSuccess, 'salary_min', 'salary min')
    renameKey(dataSuccess, 'is_remote', 'is remote')
    renameKey(dataSuccess, 'next_step', 'next step')
    renameKey(dataSuccess, 'role_name', 'role name')
  }

  // $: handleStaticPR();
  onMount(() => {
    // handleStaticPR();
  })
</script>

{#if dataSuccess}
  <div class="flex-col justify-center items-center w-[100%]">
    <div
      class="relative flex flex-col items-center rounded-[20px] mx-auto bg-white
      bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800
      dark:text-white dark:!shadow-none p-3">
      <div class="mt-2 mb-8 w-full text-center">
        <h4 class="px-2 text-xl font-bold text-navy-700 dark:text-white">
          {dataSuccess.recruiter}
        </h4>
      </div>
      <div class="columns-1 md:columns-3 xl:columns-4 gap-3 ">
        {#each Object.entries(dataSuccess) as [key, value]}
          {#if key !== 'recruiter'}
          <div class=" break-inside-avoid mb-4">
            <div
              transition:fade
              class="flex flex-col items-start justify-center rounded-2xl
              bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500
              dark:!bg-navy-700 dark:shadow-none text-left">
              <p class="text-sm text-gray-600">{key}</p>
              <p class="text-base font-medium text-navy-700 dark:text-white">
                {#if value === null}
                  No
                {:else if value === false}No{:else}{value}{/if}
              </p>
            </div>
          </div>
          {/if}
        {/each}
      </div>
    </div>
  </div>
{/if}
{#if !data.success && data.code === 401}
<div class="bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg class="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m15 9-6 6"></path>
        <path d="m9 9 6 6"></path>
      </svg>
    </div>
    <div class="ms-4">
      <h3 class="text-sm font-semibold">
        A problem has been occurred while submitting your data.
      </h3>
      <div class="mt-2 text-sm text-red-700 dark:text-red-400">
        <ul class="list-disc space-y-1 ps-5">
          <li>
            {data.message.error ? data.message.error : 'Please try again'}
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
{/if}

<svelte:head>

  <link
    rel="stylesheet"
    href="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/css/main.ad49aa9b.css" />

</svelte:head>
