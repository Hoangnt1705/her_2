<script>
  import { user } from '$lib/stores.js'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  onMount(() => {
    const login = localStorage.getItem('login')
    if (login) goto('/')
    if ($user && $user?.role) goto('/')
  })
</script>

<slot />
