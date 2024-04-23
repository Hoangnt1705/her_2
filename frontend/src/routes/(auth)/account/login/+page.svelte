<script>
  import '$lib/css/loginpage.css'
  import { beforeUpdate, afterUpdate, onMount } from 'svelte'
  import { END_POINT } from '$lib/constants.js'
  import { PUBLIC_OAUTH_GOOGLE_KEY } from '$env/static/public'
  import { Application } from '@splinetool/runtime'
  import axios from 'axios'
  import { fade, fly } from 'svelte/transition'
  import { redirect } from '@sveltejs/kit'
  import { signInHandle } from '$lib/context/MainContext.js'
  import { visible, titleToast, contentToast } from '$lib/store.js'
  import Toast from '$lib/components/Toast.svelte'

  export let data;
  let canvas;

  const success = () => {
    visible.update((v) => v  = !v);
    titleToast.set('Successfully Sign in!');
    contentToast.set('Hope you will have a good experience using the service!');
    redirect(-1);
  };
  const failed403 = () => {
    message.error({
      content: "Role của bạn chưa được xác nhận, từ chối đăng nhập",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const failed400 = () => {
    message.error({
      content: "Email, số điện thoại hoặc mật khẩu không đúng",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };

  async function handleCredentialResponse(responseToken) {
    try {
      console.log('Encoded JWT ID token: ' + responseToken.credential)
      const response = await axios.post(`${END_POINT}/auth/login`, {
        idToken: responseToken.credential,
      })
      success();
      const { data } = response.data
      signInHandle(data.accessToken, data.refreshToken, data.user)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function initializeGoogleSignIn() {
    if (
      typeof google === 'undefined' ||
      typeof google.accounts === 'undefined' ||
      typeof google.accounts.id === 'undefined'
    ) {
      // Google sign-in script hasn't loaded yet, delay initialization
      setTimeout(initializeGoogleSignIn, 100)
      return
    }

    google.accounts.id.initialize({
      client_id: PUBLIC_OAUTH_GOOGLE_KEY,
      callback: handleCredentialResponse,
    })

    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large', locale: 'en' }, // customization attributes
    )

    google.accounts.id.prompt() // also display the One Tap dialog
  }

  onMount(() => {
    canvas = document.getElementById('canvas3d')
    const app = new Application(canvas)
    app.load('https://prod.spline.design/0KlpWURw0tIyxS4r/scene.splinecode')
    initializeGoogleSignIn()
  });
  
</script>

<div class="container-login">
  <a href="#" class="brand ">Her</a>
  <div class="collection-login">
    <div class="cards">
      <div class="container-water-drop">
        <div class="drop">
          <div class="title ">
            <h1>Sign in</h1>
          </div>
          <div id="buttonDiv" />
        </div>
      </div>

      <Toast visible={$visible} />

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
  <canvas id="canvas3d" />
</div>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/bootstrap@5.3.2/dist/css/bootstrap.min.css" />
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
