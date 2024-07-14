<script>
  import '$lib/css/main.css'
  import GenerateResumeBtn from '$lib/components/resume_ai/generateResumeBtn.svelte'
  export let generateResume
  export let jobValue
</script>

<div class="max-w-md space-y-3">
  <h3 class="text-gray-900 text-4xl font-extrabold md:text-3xl lg:text-4xl">
    <span
      class="text-transparent bg-clip-text bg-gradient-to-r to-gray-600
      from-pink-500">
      Job
    </span>
    Information
  </h3>
  <div class="relative">
    <div class="max-w-full space-y-3 ">
      <textarea
        bind:value={jobValue}
        style="resize:none"
        class="outline-none py-3 px-4 block w-full border border-solid
        border-red-200 rounded-lg text-sm focus:border-red-500
        focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none
        dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
        dark:placeholder-neutral-500 dark:focus:ring-neutral-600 textareaScroll"
        rows="15"
        placeholder="Please enter the recruitment information." />
    </div>
  </div>
  <GenerateResumeBtn generateResume={generateResume}/>
</div>
