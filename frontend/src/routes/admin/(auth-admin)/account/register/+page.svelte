<script>
  let name = "",
    email = "",
    password = "",
    phone = "",
    errorMessage = "",
    verify_op = "email";

  const register = async () => {
    const response = await fetch("/api/admin/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone, verify_op }),
    });

    const result = await response.json();
    if (response.ok) {
      localStorage.setItem("otpSession", result.data.session);
      navigate("/verify-otp");
    } else {
      errorMessage = result.message;
    }
  };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-lg w-96">
    <h1 class="text-2xl font-bold mb-6">Register</h1>
    <form on:submit|preventDefault={register}>
      <div class="mb-4">
        <label class="block text-gray-700">Name</label>
        <input
          type="text"
          bind:value={name}
          class="w-full px-3 py-2 border rounded-lg focus:outline-none"
          required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Email</label>
        <input
          type="email"
          bind:value={email}
          class="w-full px-3 py-2 border rounded-lg focus:outline-none"
          required />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">Password</label>
        <input
          type="password"
          bind:value={password}
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
      <div class="mb-4">
        <label class="block text-gray-700">Verify via</label>
        <select
          bind:value={verify_op}
          class="w-full px-3 py-2 border rounded-lg focus:outline-none">
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
      </div>
      {#if errorMessage}
        <p class="text-red-500 mb-4">{errorMessage}</p>
      {/if}
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded-lg">
        Register
      </button>
    </form>
  </div>
</div>
