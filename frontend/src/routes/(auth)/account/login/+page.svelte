<script>
  import { browser } from '$app/environment'
  import '$lib/css/loginpage.css'
  import 'bootstrap/dist/css/bootstrap.min.css'
  import { beforeUpdate, afterUpdate, onMount, tick, onDestroy } from 'svelte'
  import { END_POINT } from '$lib/constants.js'
  import { PUBLIC_OAUTH_GOOGLE_KEY } from '$env/static/public'
  import { Application } from '@splinetool/runtime'
  import axios from 'axios'
  import { signInHandle } from '$lib/context/MainContext.js'
  import { Skeleton } from 'svelte-loading-skeleton'
  import {
    visible,
    titleToast,
    contentToast,
    iconNotification,
  } from '$lib/stores.js'
  import { iconsNotification } from '$lib/constants.js'
  import Toast from '$lib/components/Toast.svelte'
  import { goto, invalidate } from '$app/navigation'

  let canvas;
  const success = () => {
    iconNotification.set(iconsNotification.success)
    visible.update((v) => (v = !v))
    titleToast.set('Successfully Sign in!')
    contentToast.set('Hope you will have a good experience using the service✨')
    setTimeout(() => {
      visible.update((v) => (v = !v))
      window.location.href = '/';
    }, 2000)
  }
  const failed403 = () => {
    iconNotification.set(iconsNotification.error)
    visible.update((v) => (v = !v))
    titleToast.set('Sign in failed')
    contentToast.set('Your role has not been confirmed, refuse to sign in!')
    setTimeout(() => {
      visible.update((v) => (v = !v))
    }, 2000)
  }
  const failed502 = () => {
    iconNotification.set(iconsNotification.error)
    visible.update((v) => (v = !v))
    titleToast.set('Sign in failed!')
    contentToast.set('Error server, refuse to sign in!')
    setTimeout(() => {
      visible.update((v) => (v = !v))
    }, 2000)
  }

  async function handleCredentialResponse(responseToken) {
    try {
      console.log('Encoded JWT ID token: ' + responseToken.credential)
      const response = await axios.post(`${END_POINT}/auth/login`, {
        idToken: responseToken.credential,
      })
      success()
      const { data } = response.data
      signInHandle(data.accessToken, data.refreshToken, data.user)
      console.log(data)
    } catch (error) {
      console.log(error)
      failed502()
    }
  }

  async function initializeGoogleSignIn() {
    if (
      typeof google === 'undefined' ||
      typeof google.accounts === 'undefined' ||
      typeof google.accounts.id === 'undefined'
    ) {
      // Google sign-in script hasn't loaded yet, delay initialization
      setTimeout(initializeGoogleSignIn, 500)
      return
    }

    google.accounts.id.initialize({
      client_id: PUBLIC_OAUTH_GOOGLE_KEY,
      callback: handleCredentialResponse,
    })
    await tick()
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large', locale: 'en' }, // customization attributes
    )
    // google.accounts.id.prompt() // also display the One Tap dialog
  }

  const destroyCanvas = () => {
    canvas = ''
  }

  onMount(async () => {
    try {
      canvas = document.getElementById('canvas3d')
      await tick()
      const app = new Application(canvas)
      await app.load(
        'https://prod.spline.design/0KlpWURw0tIyxS4r/scene.splinecode',
      )

      initializeGoogleSignIn()
    } catch (error) {
      console.log(error)
      failed502()
    }
  });
  onDestroy(() => {
    destroyCanvas();
  });
</script>

<Toast
  visible={$visible}
  iconNotification={$iconNotification}
  title={$titleToast}
  content={$contentToast} />

<section class="container-login">
  <a href="#" class="brand ">Her</a>
  <div class="collection-login">
    <div class="cards">
      <div class="container-water-drop">
        <div class="drop">
          <div class="title ">
            <h1>Sign in</h1>
          </div>
          {#if !browser}
            <!-- skeleton or loader -->
            <Skeleton height="38px" />
          {:else}
            <!-- full ui with data -->
            <div id="buttonDiv" />
          {/if}
        </div>
      </div>

      <div class="drop-chills">
        <div class="drop-chill" />
        <div class="drop-chill" style="display: none" />
        <div class="drop-chill" />
      </div>
    </div>
  </div>
  <div class="copy-right-login ">
    <div>Copyright © 2024 Her</div>
  </div>
  {#if !browser}
    <!-- skeleton or loader -->
    <Skeleton height="100vh" />
  {:else}
    <!-- full ui with data -->
    <canvas id="canvas3d" />
  {/if}
</section>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/bs-brain@2.0.3/components/logins/login-4/assets/css/login-4.css" />
  <script src="https://accounts.google.com/gsi/client?hl=en" async>

  </script>
  <script
    async
    src="https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js">

  </script>
  <script src="https://cdn.tailwindcss.com">

  </script>
</svelte:head>
