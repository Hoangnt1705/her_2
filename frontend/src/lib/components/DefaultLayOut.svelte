<script>
  import { onMount, tick } from 'svelte'
  import { checkAuthenticated } from '$lib/context/MainContext.js'
  import { refreshToken, accessToken } from '$lib/stores.js'
  import {
    PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME,
    PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME,
  } from '$env/static/public'

  onMount(async () => {
    const login = localStorage.getItem('login')
    if (login) {
      let token = null,
        refresh = null
      if (!$refreshToken) {
        refresh = localStorage.getItem(PUBLIC_APP_LOCALSTORAGE_REFRESH_NAME)
      }
      if (!$accessToken) {
        token = localStorage.getItem(PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME)
      }
      await checkAuthenticated(token, refresh)
    }
  })
</script>

<slot />
