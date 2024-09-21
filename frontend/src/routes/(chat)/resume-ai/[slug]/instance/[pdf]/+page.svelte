<script>
  import DialogGenerateResumePdf from "$lib/components/resume_ai/DialogGenerateResumePdf.svelte";
  export let data;
</script>

<DialogGenerateResumePdf bind:dataResume={data.resume}/>
