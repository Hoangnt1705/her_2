<script>
  let email = "",
    phone = "",
    errorMessage = "";

  const forgotPassword = async () => {
    const response = await fetch("/api/admin/auth/forgot-pw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Password reset instructions sent");
    } else {
      errorMessage = result.message;
    }
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-96">
    <h1 class="text-2xl font-bold mb-6">Forgot Password</h1>
    <form on:submit|preventDefault={forgotPassword}>
      <div class="mb-4">
        <label class="block text-gray-700">Email</label>
        <input
          type="email"
          bind:value={email}
          class="w-full px-3 py-2 border rounded-lg focus:outline-none"
          required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Phone</label>
        <input
          type="tel"
          bind:value={phone}
          class="w-full px-3 py-2 border rounded-lg focus:outline-none"
          required />
      </div>
      {#if errorMessage}
        <p class="text-red-500 mb-4">{errorMessage}</p>
      {/if}
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded-lg">
        Reset Password
      </button>
    </form>
  </div>
</div>
