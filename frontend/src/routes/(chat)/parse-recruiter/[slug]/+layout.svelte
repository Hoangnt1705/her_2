<script>
    import ProtectedRoute from "$lib/components/ProtectedRoute.svelte";
    import {user} from '$lib/stores.js';
    import { error } from '@sveltejs/kit';
    import { goto } from '$app/navigation'

</script>
{#if $user && $user?.role}
    <slot/>
{/if}


