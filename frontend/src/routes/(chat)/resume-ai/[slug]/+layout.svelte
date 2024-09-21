<script>
  import HistoryConversationBottomSidebar from "$lib/components/resume_ai/HistoryConversationBottomSidebar.svelte";
  import {
    resumeConversationID,
    documentsByIDConversation,
    dataResume,
  } from "$lib/stores.js";
  import { onDestroy, onMount } from "svelte";
  import DialogGenerateResumePdf from "$lib/components/resume_ai/DialogGenerateResumePdf.svelte";
  export let data;
  $: documentsByIDConversation.set(data.data);
  onDestroy(() => documentsByIDConversation.set([]));
</script>

<slot />
{#if $dataResume?.data?.result?.document}
  <DialogGenerateResumePdf bind:dataResume={$dataResume.data.result.document} />
{/if}
{#if $documentsByIDConversation.length > 0}
  <HistoryConversationBottomSidebar />
{/if}
