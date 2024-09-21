<script>
  import "$lib/css/main.css";
  import GenerateResumeBtn from "$lib/components/resume_ai/GenerateResumeBtn.svelte";
  import SelectLanguage from '$lib/components/resume_ai/SelectLanguage.svelte';
  export let generateResume;
  export let jobValue;
  export let languageResume;
</script>

<div class="max-w-md space-y-3 margin-title-job">
  <h3 class="text-gray-900 text-4xl font-extrabold md:text-3xl lg:text-4xl">
    <span
      class="text-black
      from-[#EECC8C]">
      Job Information
    </span>
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
  <SelectLanguage bind:languageResume />
  <GenerateResumeBtn bind:generateResume />
</div>
