<script>
  import { fade } from "svelte/transition";
  import PdfViewer from "$lib/components/resume_ai/PdfViewer.svelte";
  import { isModalResumePdf, resumeConversationID } from "$lib/stores.js";
  import axios from 'axios';
  import { END_POINT } from "$lib/constants.js";
  import AlertTryAgainGenerateResume from "$lib/components/resume_ai/AlertTryAgainGenerateResume.svelte";
  import { page } from "$app/stores";
  import {goto} from "$app/navigation";
  export let dataResume;
  let pdfUrl;
  let downloadProgress = 0;
  let isDownloading = false;
  const closeModalResumePdf = () => {
    isModalResumePdf.update((re) => (re = false));
    dataResume = null;
    goto(`/resume-ai/${$page.url.pathname.split("/")[2] || $resumeConversationID }`);
  };

  $: if (dataResume) isModalResumePdf.update((re) => (re = true));

  $: if (dataResume) pdfUrl = dataResume.resume_pdf_url;

  function extractPdfDetails(url) {
    if (isDownloading) return;
    try {
      const parsedUrl = new URL(url);

      // Extract the encoded path and decode it
      const encodedPath = parsedUrl.pathname;
      const decodedPath = decodeURIComponent(encodedPath);

      // Remove 'resumes-ai-pdf/' prefix
      const filePath = decodedPath.replace('/o/resumes-ai-pdf%2F', '/');

      // Extract the pdfName from the filePath
      const pdfName = filePath.split('/').pop();

      // Extract the token using URLSearchParams
      const token = parsedUrl.searchParams.get("token");

      return { pdfName, token };
    } catch (error) {
      console.error("Invalid URL provided:", error);
      return { pdfName: null, token: null };
    }
  }

  async function downloadPDF() {
  const { pdfName, token } = extractPdfDetails(pdfUrl);

  if (pdfName && token) {
    isDownloading = true;
    downloadProgress = 0;

    try {
      const downloadUrl = `${END_POINT}/v1/resume-ai/download/${pdfName}/${token}`;

      const response = await axios.get(downloadUrl, {
        responseType: 'blob',
        onDownloadProgress: (progressEvent) => {
          if (progressEvent.total) {
            downloadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          } else {
            // Fallback to an incremental approach when total size is not available
            downloadProgress = Math.min(100, downloadProgress + 10);
          }
        },
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', pdfName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      downloadProgress = 100;
      isDownloading = false;
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF');
      isDownloading = false;
    }
  } else {
    console.error("Failed to extract PDF details due to an invalid URL.");
  }
}
</script>

{#if $isModalResumePdf && dataResume}
<div
  in:fade
  out:fade
  id="static-backdrop-modal"
  class="pd-overlay w-full h-full fixed top-0 left-0 z-[100] overflow-x-hidden
  overflow-y-auto place-items-center bg-black bg-opacity-60 backdrop-blur-sm
  transition-opacity duration-300">
  <div
    class="ease-out modal-open:opacity-100 transition-all
    modal-open:duration-500 sm:max-w-5xl sm:w-full m-5 sm:mx-auto">
    <div class="flex flex-col bg-white rounded-2xl py-4 px-5">
      <div
        class="flex justify-between items-center pb-4 border-b border-gray-200">
        <h4 class="titlePdfViewer text-sm text-gray-900 font-medium">
          {dataResume.title_resume}
        </h4>
        <button on:click={downloadPDF}
        
          class="flex items-center gap-1 select-none rounded-lg bg-red-600
          py-2 px-4 text-center align-middle font-sans text-xs font-bold
          uppercase text-white shadow-md shadow-gray-900/10 transition-all
          hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85]
          focus:shadow-none active:opacity-[0.85] active:shadow-none
          disabled:cursor-not-allowed disabled:opacity-50
          disabled:shadow-none"
          disabled={isDownloading}
          data-ripple-light="true"
          type="button">
          {#if isDownloading}
          <svg class="animate-spin border-indigo-300"
          xmlns="http://www.w3.org/2000/svg" width="20" height="20"
          viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="14" stroke="#fff"
              stroke-width="2" stroke-dasharray="6 6" />
          </svg>
          {:else}
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z" fill="#fff"/>
          </svg>
          {/if}
          <span class="titleDownload">
            Download file
          </span>
        </button>
      </div>

      <div class="overflow-y-auto py-4 min-h-[100px]">
        <PdfViewer pdf_url={dataResume.resume_pdf_url} />
      </div>
     <AlertTryAgainGenerateResume/>
      <div
        class="flex items-center justify-end pt-4 border-t border-gray-200
        space-x-4">
        <button
          on:click={closeModalResumePdf}
          type="button"
          class="py-2 px-3 inline-flex items-center gap-x-2 text-sm
          font-medium rounded-lg border border-gray-200 bg-white text-gray-800
          shadow-sm hover:bg-gray-50 disabled:opacity-50
          disabled:pointer-events-none">
          Close
        </button>
      </div>
    </div>
  </div>
</div>
{/if}
{#if isDownloading}
<div class="fixed bottom-5 right-5 w-72 p-4 bg-white border border-gray-300 rounded-lg shadow-lg z-[110]">
  <h4 class="text-sm font-medium text-gray-900">Downloading PDF...</h4>
  <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
    <div class="bg-red-600 h-2.5 rounded-full" style="width: {downloadProgress}%;"></div>
  </div>
  <p class="text-xs mt-2">{downloadProgress}%</p>
</div>
{/if}
