<script>
    let otp = '', errorMessage = '';
  
    const verifyOtp = async () => {
      const session = localStorage.getItem('otpSession');
      const response = await fetch('/api/admin/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, session }),
      });
  
      const result = await response.json();
      if (response.ok) {
        navigate('/dashboard');
      } else {
        errorMessage = result.message;
      }
    };
  </script>
  
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
      <h1 class="text-2xl font-bold mb-6">Verify OTP</h1>
      <form on:submit|preventDefault={verifyOtp}>
        <div class="mb-4">
          <label class="block text-gray-700">OTP</label>
          <input type="text" bind:value={otp} class="w-full px-3 py-2 border rounded-lg focus:outline-none" required />
        </div>
        {#if errorMessage}
          <p class="text-red-500 mb-4">{errorMessage}</p>
        {/if}
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg">Verify OTP</button>
      </form>
    </div>
  </div>

  