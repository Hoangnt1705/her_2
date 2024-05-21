    <script>
    import { page } from '$app/stores';
  </script>
  
  <svelte:head>
    <title>{$page.status} - {$page.status === 404 ? 'Not Found' : 'Error'}</title>
  </svelte:head>

  
  <body class="flex flex-col h-screen justify-center items-center bg-gray-100">
    <div class="flex flex-col items-center">
        <h1 class="text-[120px] font-extrabold text-gray-700">404</h1>
        <p class="text-2xl font-medium text-gray-600 mb-6">{$page.status === 404 ? 'Page Not Found' : 'An Error Occurred'}</p>
        <a href="/" data-sveltekit-reload
            class="px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-all duration-200 ease-in-out">
            Go to Homepage
        </a>
    </div>
</body>