<script>
    import { user } from '$lib/store.js';
    import { onMount } from 'svelte';
    import {goto} from '$app/navigation';
    let login;
    onMount(() => {
        login  = localStorage.getItem('login');
        if(login) goto('/');
        if( $user && $user?.role ) goto('/');
    })
</script>

<slot />

