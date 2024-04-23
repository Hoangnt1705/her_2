<script>
    import {onMount} from 'svelte';
  let googleClientId = "607734374417-aof34b29jd0itnv6v79d7q45rrol5rh0.apps.googleusercontent.com";

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }

  function initializeGoogleSignIn() {
    if (
      typeof google === "undefined" ||
      typeof google.accounts === "undefined" ||
      typeof google.accounts.id === "undefined"
    ) {
      // Google sign-in script hasn't loaded yet, delay initialization
      setTimeout(initializeGoogleSignIn, 100);
      return;
    }

    google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }, // customization attributes
    );

    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  // Call the initialization function when the component mounts
  onMount(() => {
    initializeGoogleSignIn();
  });
</script>

<div id="buttonDiv"></div>

<svelte:head>
</svelte:head>
