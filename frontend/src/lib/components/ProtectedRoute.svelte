<script>
  import { user } from '$lib/stores.js'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  onMount(() => {
    const login = localStorage.getItem('login')
    if (login) window.location.href = '/';
    if ($user && $user?.role)  window.location.href = '/';
  });
  
</script>

<slot />
