<script>
	import CardHoverEffect from '$lib/components/ui/CardHoverEffect/CardHoverEffect.svelte';
	import {documentsByIDConversation} from "$lib/stores.js";
</script>

<div class="mx-auto max-w-5xl px-8">
	<CardHoverEffect items={$documentsByIDConversation} />
</div>
