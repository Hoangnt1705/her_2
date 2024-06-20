<script>
    import '$lib/css/main.css'
    import Nav from '$lib/components/Nav.svelte'

</script>


<main class="main-page content-center">
  <Nav />
  <div
    class="grid grid-cols-1 text-xl leading-6 justify-center
    .max-h-1 wrap-view-parse-recruiter">
    <div class="view new-func-view">
      <div class="max-w-sm space-y-3">
        <!-- Floating Input -->
        <div class="relative">
          <input type="email" id="hs-floating-input-email" class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2" placeholder="you@email.com">
          <label for="hs-floating-input-email" class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:scale-90
            peer-focus:translate-x-0.5
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
            peer-[:not(:placeholder-shown)]:scale-90
            peer-[:not(:placeholder-shown)]:translate-x-0.5
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Email</label>
        </div>
        <!-- End Floating Input -->
      
        <!-- Floating Input -->
        <div class="relative">
          <input type="password" id="hs-floating-input-passowrd" class="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2" placeholder="********">
          <label for="hs-floating-input-passowrd" class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:scale-90
            peer-focus:translate-x-0.5
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
            peer-[:not(:placeholder-shown)]:scale-90
            peer-[:not(:placeholder-shown)]:translate-x-0.5
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Password</label>
        </div>
        <!-- End Floating Input -->
      
        <!-- Floating Input -->
        <div class="relative">
          <input type="email" id="hs-floating-gray-input-email" class="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2" placeholder="you@email.com">
          <label for="hs-floating-gray-input-email" class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:scale-90
            peer-focus:translate-x-0.5
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
            peer-[:not(:placeholder-shown)]:scale-90
            peer-[:not(:placeholder-shown)]:translate-x-0.5
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Email</label>
        </div>
        <!-- End Floating Input -->
      
        <!-- Floating Input -->
        <div class="relative">
          <input type="password" id="hs-floating-gray-input-passowrd" class="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:focus:ring-neutral-600
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2" placeholder="********">
          <label for="hs-floating-gray-input-passowrd" class="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:scale-90
            peer-focus:translate-x-0.5
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
            peer-[:not(:placeholder-shown)]:scale-90
            peer-[:not(:placeholder-shown)]:translate-x-0.5
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">Password</label>
        </div>
        <!-- End Floating Input -->
      
      </div>
    </div>
  </div>
</main>




<!-- <script>
    import axios from 'axios';
    import { END_POINT } from '$lib/constants.js'

    const downloadFile = async (url, headers, body) => {
      const response = await axios.request({
        method: 'post',
        url,
        data: body,
        headers,
        responseType: 'arraybuffer'
      });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'file.pdf'); // or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    const generatePdf = () => {
      const headers = { 'Content-Type': 'application/json' };
      const body = {
        htmlContent: `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; }
                h1 { color: red; }
              </style>
            </head>
            <body>
              <h1>Welcome to puppeteer-html-pdf</h1>
              <p>This is a sample PDF generated using Puppeteer.</p>
            </body>
          </html>
        `
      };
      
      downloadFile(`${END_POINT}/v1/parse-recruiter/downloadPdfHere`, headers, body).then(() => {
        console.log('PDF generated and downloaded');
      }).catch((err) => {console.log(err)});
    };
  </script>
  
  <button on:click={generatePdf}>Generate PDF</button> -->