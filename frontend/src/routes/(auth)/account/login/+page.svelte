<script>
  import "$lib/css/loginpage.css"; // Assuming this contains any additional custom styles
  import "bootstrap/dist/css/bootstrap.min.css"; // You can remove this if fully switching to Tailwind
  import { beforeUpdate, afterUpdate, onMount, tick, onDestroy } from "svelte";
  import { END_POINT } from "$lib/constants.js";
  import { PUBLIC_OAUTH_GOOGLE_KEY } from "$env/static/public";
  import axios from "axios";
  import { signInHandle } from "$lib/context/MainContext.js";
  import { svg } from "$lib/constants.js";
  import {
    visible,
    titleToast,
    contentToast,
    iconNotification,
  } from "$lib/stores.js";
  import { iconsNotification } from "$lib/constants.js";
  import ToastLogin from "$lib/components/ToastLogin.svelte";
  import { goto, invalidate } from "$app/navigation";
  import Index from "$lib/components/ui/ThreeDCardEffect/Index.svelte";
  import SelectLoginAuthorization from "$lib/components/login/SelectLoginAuthorization.svelte";

  const success = () => {
    iconNotification.set(iconsNotification.success);
    visible.update((v) => (v = !v));
    titleToast.set("Sign in successfully!");
    contentToast.set(
      "Hope you will have a good experience using the service✨"
    );
    setTimeout(() => {
      visible.update((v) => (v = !v));
      window.location.href = "/";
    }, 2000);
  };
  const failed403 = () => {
    iconNotification.set(iconsNotification.error);
    visible.update((v) => (v = !v));
    titleToast.set("Sign in failed");
    contentToast.set("Your role has not been confirmed, refuse to sign in!");
    setTimeout(() => {
      visible.update((v) => (v = !v));
    }, 2000);
  };
  const failed502 = () => {
    iconNotification.set(iconsNotification.error);
    visible.update((v) => (v = !v));
    titleToast.set("Sign in failed!");
    contentToast.set("Error server, refuse to sign in!");
    setTimeout(() => {
      visible.update((v) => (v = !v));
    }, 2000);
  };

  // async function handleCredentialResponse(responseToken) {
  //   try {
  //     console.log("Encoded JWT ID token: " + responseToken.credential);
  //     const response = await axios.post(`${END_POINT}/auth/login`, {
  //       idToken: responseToken.credential,
  //     });
  //     const { data } = response.data;
  //     success();
  //     signInHandle(data.accessToken, data.refreshToken, data.user);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //     failed502();
  //   }
  // }

  // async function initializeGoogleSignIn() {
  //   if (
  //     typeof google === "undefined" ||
  //     typeof google.accounts === "undefined" ||
  //     typeof google.accounts.id === "undefined"
  //   ) {
  //     // Google sign-in script hasn't loaded yet, delay initialization
  //     setTimeout(initializeGoogleSignIn, 500);
  //     return;
  //   }

  //   google.accounts.id.initialize({
  //     client_id: PUBLIC_OAUTH_GOOGLE_KEY,
  //     callback: handleCredentialResponse,
  //   });
  //   await tick();
  //   google.accounts.id.renderButton(
  //     document.getElementById("buttonDiv"),
  //     {
  //       type: "standard",
  //       size: "large",
  //       theme: "outline",
  //       text: "sign_in_with",
  //       shape: "rectangular",
  //       logo_alignment: "left",
  //     } // customization attributes
  //   );
  // }
  onMount(async () => {
    const login = localStorage.getItem("login");
    if (!login) {
      try {
        const response = await axios.get(
          `${END_POINT}/auth/login/success`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200 && response.data.success) {
          const { user, accessToken, refreshToken } = response.data.data;
          signInHandle(accessToken, refreshToken, user);
          success();
          console.log("User logged in:", user);
        } else {
          console.error("Failed to retrieve user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response) {
          console.error(`Response error: ${error.response.data}`);
        } else {
          console.error(`Network error: ${error.message}`);
        }
      }
    }
    else return;
  });
</script>

<ToastLogin
  visible={$visible}
  iconNotification={$iconNotification}
  title={$titleToast}
  content={$contentToast} />
<SelectLoginAuthorization />

<div class="grid grid-cols-3 gap-4 min-h-screen leading-6 bg-gray-100">
  <!-- <div id="buttonDiv" class="mb-6"></div> -->

  <div class="logo col-span-3 pl-11 pt-3">
    <h1 class="mb-1 flex font-bold items-center text-3xl" style="color: #000">
      <svg
        style="margin-bottom: -6px; margin-right: -5px"
        class="logo-brand"
        version="1.1"
        viewBox="0 0 1024 1024"
        width="50"
        height="50"
        xmlns="http://www.w3.org/2000/svg">
        <path
          transform="translate(202,225)"
          d="m0 0h18l23 2 25 5 20 6 25 10 23 11 16 10 20 14 16 13 20 18 12 12 9
          11 10 13 9 14 7 14 3 14 8 16 5 7 1 4v34l-5-1-12-3h-13l-9 2-11 6-3
          3-4-1-24-24-7-8-25-25-1-4 7-14 2-7
          1-16-2-12-5-12-7-10-8-8-14-8-11-3h-22l-13 4-10 5-8 7-9 13-5 12-1
          5v21l3 12 7 12 8 9 10 7 8 4 13 3h18l15-4 4 1 62 62 3 4v19l4 11 6 9 5 5
          8 6 11 4 16 2-6 7-35 35-6 7-3 2-7-1-8-2-17-1-13 2-12 5-11 8-8 10-8
          16-2 5-4 3h-56l-1-5 5-20 7-16 8-14 8-10 9-10 11-10 15-10 15-8
          23-8-13-3-19-4-21-7-13-6-15-8-14-10-15-13-12-13-11-15-12-21-10-25-5-17-4-21-2-21v-109l2-5
          2-2z" />
        <path
          transform="translate(802,225)"
          d="m0 0h19l6 2 3 4v113l-2 21-5 24-8 24-10 21-10 16-10 13-12 13-11
          10-11 8-13 8-16 8-16 6-18 5-24 5 25 9 17 9 12 9 10 9 9 9 10 14 8 14 7
          19 3 12v7h-58l-3-2-7-17-8-11-7-7-14-8-10-3-8-1h-10l-15 3-7
          1-42-42-7-8v-1l19-3 12-6 9-8 7-12 2-8 1-19 11-12 43-43 1-2h2l2-4 7-6
          18 4h17l16-4 10-6 10-9 8-11 5-14
          1-7v-14l-3-13-8-14-9-10-13-8-9-3-5-1h-24l-14 5-12 8-8 9-8 16-3 16 1 13
          4 13 5 10-1 4-19 19-7 8-31 31-5-2-9-6-11-3h-14l-12 3-5 1v-37l9-13 4-8
          4-15 3-9 9-15 8-11 9-11 9-10 7-8 9-9 8-7 14-12 11-8 24-16 18-10 23-10
          22-8 23-6 23-4z" />
        <path
          transform="translate(551,652)"
          d="m0 0h34l2 2 4 15 5 10 9 10 8 7 14 7 11 2h15l14-3 11-6 7-6h2l2-4 7-9
          6-11 3-2h60l1 3-2 17-5 18-6 14-8 13-8 10-10 10-14 10-16 7-13 4-13
          2h-23l-20-4-16-6-16-9-11-9-13-13-9-13-8-15-4-14-1-7v-29z" />
        <path
          transform="translate(436,652)"
          d="m0 0h36v29l-3 15-6 15-6 10-10 13-12 12-13 9-17 9-15 5-17
          3h-24l-15-3-17-6-14-8-11-9-7-7-10-13-10-19-6-19-3-20 1-4h59l5 4 8 14 9
          10 11 7 12 5 7 1h17l12-3 12-6 10-9 6-7 6-12 4-15z" />
        <path
          transform="translate(500,430)"
          d="m0 0h23l1 3v309l-1 1h-23l-2-3v-306z" />
        <path
          transform="translate(616,187)"
          d="m0 0h31l17 3 2 1-2 4-8 10-8 17-6 16-6 10-9 10-9 7-12 6-11 3-7
          1h-9l1-5 8-16 9-14 11-13 7-6 1-2-28 8-20 7-10 4h-2l3-11 6-11 11-12
          10-7 13-6z" />
        <path
          transform="translate(374,187)"
          d="m0 0h32l15 3 14 6 11 8 9 9 8 14 3 11-9-3-40-13-11-3 7 8 8 8 10 14 9
          17 2 5v4l-15-1-16-5-12-7-12-12-9-16-7-19-7-13-8-10 2-2z" />
        <path
          transform="translate(506,768)"
          d="m0 0h11l10 3 9 7 6 8 3 8v16l-4 10-7 8-10 6-7
          2h-14l-12-5-9-9-4-8-2-9 1-11 4-10 8-9 6-4z" />
        <path
          transform="translate(639,614)"
          d="m0 0h13l9 3 8 6 6 7 4 12v9l-3 9-6 9-10 7-9
          3h-11l-10-3-9-7-6-10-2-6v-13l4-10 6-8 9-6z" />
        <path
          transform="translate(369,614)"
          d="m0 0h14l10 4 10 9 5 9 1 4v12l-4 11-9 10-10 5-4
          1h-12l-11-4-9-8-5-9-2-7v-8l3-10 5-8 8-7z" />
        <path
          transform="translate(707,333)"
          d="m0 0h10l10 3 8 6 6 7 3 7 1 11-2 9-5 8-5 5-5 4-8
          3h-16l-9-4-8-7-5-8-2-9 1-12 5-10 4-5 10-6z" />
        <path
          transform="translate(305,333)"
          d="m0 0h10l10 3 8 6 6 8 3 7v15l-4 10-4 5-9 6-8
          3h-15l-9-4-8-7-5-8-2-7v-10l4-11 7-9 9-5z" />
        <path
          transform="translate(504,343)"
          d="m0 0h14l10 4 8 7 5 10 1 4v10l-4 10-6 8-10 6-13
          2-9-2-10-6-6-7-4-11v-8l2-9 5-8 7-6z" />
        <path
          transform="translate(442,242)"
          d="m0 0 8 1 16 8 11 8 9 9 9 14 5 14 2 10v10l-5 3-11
          4h-4l-4-20-5-12-9-13-10-9-17-11 1-6z" />
        <path
          transform="translate(575,242)"
          d="m0 0h4l5 12 1 4-17 11-10 9-7 9-7 15-3 14-1 7-6-1-12-4-2-2v-11l4-16
          8-16 11-12 8-7 14-8z" />
        <path
          transform="translate(550,563)"
          d="m0 0 4 2 26 26 7 8 9 9 1 4-6 12h-40l-1-1z" />
        <path
          transform="translate(470,564)"
          d="m0 0h2v60h-41l-6-11 2-5 9-10z" />
        <path
          transform="translate(567,474)"
          d="m0 0h9l10 4 5 6 2 4v13l-5 8-5 4-7 3h-9l-10-5-5-8-1-4v-8l3-8 8-7z" />
        <path
          transform="translate(446,474)"
          d="m0 0h8l8 3 7 7 2 6v11l-5 8-6 5-7 2h-8l-8-4-6-7-2-6v-7l3-9 5-5 5-3z" />
      </svg>
      HER
    </h1>
  </div>
  <div class="p-4 rounded-lg col-span-3" style="margin-top:-100px">
    <Index className=" w-full max-w-xs " />
  </div>

  <div
    class="p-4 rounded-lg col-span-3 text-xs text-gray-500 content-end
    items-center text-center">
    © 2024 Her. All rights reserved.
  </div>
  <!-- Skeleton or loader (you can style this as needed) -->
  <!-- Full UI with data -->
  <!-- <canvas id="canvas3d" /> -->
</div>

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
