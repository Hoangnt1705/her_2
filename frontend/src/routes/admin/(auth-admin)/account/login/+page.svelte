<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  let email = "";
  let password = "";
  let errorMessage = "";

  const login = async () => {
    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem("accessToken", result.data.accessToken);
      navigate("/dashboard");
    } else {
      errorMessage = result.message;
    }
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-96">
    <h1 class="text-2xl font-bold mb-6">Login</h1>
    <form on:submit|preventDefault={login}>
      <div class="mb-4">
        <label class="block text-gray-700">Email</label>
        <input
          type="email"
          bind:value={email}
          class="w-full px-3 py-2 border rounded-lg focus:outline-none"
          required />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700">Password</label>
        <input
          type="password"
          bind:value={password}
          class="w-full px-3 py-2 border rounded-lg focus:outline-none"
          required />
      </div>
      {#if errorMessage}
        <p class="text-red-500 mb-4">{errorMessage}</p>
      {/if}
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded-lg">
        Login
      </button>
    </form>
  </div>
</div>
