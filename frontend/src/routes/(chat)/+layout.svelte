<script>
    import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<section class="session-main-page">
  <Sidebar></Sidebar>
  <slot/>
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
