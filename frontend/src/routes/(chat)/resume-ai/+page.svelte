<script>
  import HistoryConversationBottomSidebar from "$lib/components/resume_ai/HistoryConversationBottomSidebar.svelte";
  import {
    dataResume,
    resumeConversationID,
    documentsByIDConversation,
  } from "$lib/stores.js";
  import DialogGenerateResumePdf from "$lib/components/resume_ai/DialogGenerateResumePdf.svelte";

  $: console.log('$dataResume?.data?.result?.document', $dataResume?.data?.result?.document);

</script>

{#if $dataResume?.data?.result?.document}
  <DialogGenerateResumePdf bind:dataResume={$dataResume.data.result.document} />
{/if}
{#if $resumeConversationID && $documentsByIDConversation.length > 0}
  <HistoryConversationBottomSidebar />
{/if}
