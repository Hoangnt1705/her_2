<script>
  import ProtectedRoute from "$lib/components/ProtectedRoute.svelte";
</script>

<ProtectedRoute>
  <slot  data-sveltekit-reload/>
</ProtectedRoute>
