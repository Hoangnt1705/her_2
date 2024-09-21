<script>
  import {
    isLoadGenerateResume,
    activeChatId,
    activeRTSidebar,
    dataResume,
    alertTryAgainGenerateResume,
    historyChat,
    lengthChat,
    openSidebarResumeConversation,
    sidebar,
    resizeMainPageResumeAI,
    resumeConversationID,
    documentsByIDConversation,
  } from "$lib/stores.js";
  import { PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME } from "$env/static/public";
  import PersonalInfo from "$lib/components/resume_ai/PersonalInfo.svelte";
  import JobInfo from "$lib/components/resume_ai/JobInfo.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import ResumeTemplateSidebar from "$lib/components/resume_ai/ResumeTemplateSidebar.svelte";
  import AlertSuccess from "$lib/components/alert/AlertSuccess.svelte";
  import AlertMissingField from "$lib/components/alert/AlertMissingField.svelte";
  import { tick, onMount, afterUpdate, beforeUpdate, onDestroy } from "svelte";
  import axios from "axios";
  import { END_POINT } from "$lib/constants.js";
  import { slide, fly } from "svelte/transition";
  import "$lib/css/main.css";
  import DialogGenerateResumePdf from "$lib/components/resume_ai/DialogGenerateResumePdf.svelte";
  import { page } from "$app/stores";
  let jobValue;
  let fullName;
  let zipCode;
  let address;
  let email;
  let phone = null;
  let birthday = null;
  let biography = localStorage.getItem("bio") || null;
  let updateBioAlertVisible = false;
  let warningFieldAlertVisible = false;
  let titleWarning = "Warning!";
  let languageResume = "english";
  let contentWarning;
  let resumeTemplateValue = localStorage.getItem("resumeId") || null;
  let currentURL;
  $: currentURL = $page.url.pathname.split("/")[2];
  const showAlert = () => {
    warningFieldAlertVisible = true;
    isLoadGenerateResume.update((c) => (c = true));
    setTimeout(() => {
      warningFieldAlertVisible = false;
      isLoadGenerateResume.update((c) => (c = false));
    }, 1000);
  };
  const generateResume = async () => {
    if (!$isLoadGenerateResume) {
      if (!fullName) {
        contentWarning = "Please fill your name";
        return showAlert();
      }
      if (!email) {
        contentWarning = "Please fill your email";
        return showAlert();
      }
      if (!phone) {
        contentWarning = "Please fill your phone number";
        return showAlert();
      }
      if (!birthday) {
        contentWarning = "Please fill your birthday";
        return showAlert();
      }
      if (!address) {
        contentWarning = "Please fill your address";
        return showAlert();
      }
      if (!biography) {
        contentWarning = "Please fill your biography";
        return showAlert();
      }
      if (!jobValue) {
        contentWarning = "Please fill your job information";
        return showAlert();
      }
      if (resumeTemplateValue === null) {
        if (!$activeRTSidebar) activeRTSidebar.set(true);
        contentWarning = "Please select resume template";
        return showAlert();
      }
      isLoadGenerateResume.update((c) => (c = true));
      try {
        const response = await axios.post(
          `${END_POINT}/v1/resume-ai/upload`,
          {
            fullName,
            email,
            phoneNumber: phone,
            birthday: birthday,
            address,
            biography,
            jobInformation: jobValue,
            zipCode,
            languageResume,
            cid: $resumeConversationID || null,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem(
                PUBLIC_APP_LOCALSTORAGE_TOKEN_NAME
              )}`,
            },
          }
        );
        const data = response.data;
        let documentId = data.data.result.document._id;
        let conversationId;
        dataResume.set(data);
      

        // Insert history.pushState after successfully setting the data
        if (data && data.success && data.data && data.data.result) {
          if (data.data.result.conversation) {
            historyChat.update((currentHistory) => {
              currentHistory.unshift(data.data.result.conversation);
              return currentHistory;
            });
            await tick();
            conversationId = data.data.result.conversation._id;
            resumeConversationID.set(data.data.result.conversation._id);
            activeChatId.set(data.data.result.conversation._id);
            // update the length of total history
            lengthChat.update((c) => (c = c + 1));
          }
          history.pushState(
              { someData: "value" },
              data.data.result.document.title_resume, // Title for the page (often ignored by browsers)
              `/resume-ai/${conversationId ? conversationId : currentURL }/instance/${documentId}` // New URL
            );
          documentsByIDConversation.update((documents) => {
            documents.unshift(data.data.result.document);
            return documents;
          });
          await tick();
          openSidebarResumeConversation.update(sidebar => sidebar = true);
          console.log("data.data.result.document", $documentsByIDConversation);
        }

        // if history length is greater than 15, the last element of the history will be removed
        if ($historyChat && $historyChat.length > 15) {
          historyChat.update((arr) => {
            arr.pop();
            return arr;
          });
        }

        console.log($dataResume, "dataResume>>>><");
        alertTryAgainGenerateResume.update((a) => (a = true));
      } catch (error) {
        console.log(error);
        contentWarning = error;
        return showAlert();
      } finally {
        isLoadGenerateResume.update((c) => (c = false));
      }
    }
  };
  onMount(() => {
    currentURL = $page.url.pathname.split('/')[2];
    resumeConversationID.set(currentURL);
  });
  onDestroy(() => resumeConversationID.set(null));
  onDestroy(() => activeChatId.set(null));
  onDestroy(() => dataResume.set(null));
  onDestroy(() => documentsByIDConversation.set([]));
  onDestroy(() => openSidebarResumeConversation.update((o) => (o = false)));

  let div;
  $: resizeMainPageResumeAI.update((resize) => (resize = div?.offsetWidth));
  $: setTimeout(() => {
    resizeMainPageResumeAI.update(
      (resize) =>
        (resize = $sidebar
          ? div?.offsetWidth
          : !$sidebar
          ? div?.offsetWidth
          : "")
    );
  }, 1000);
  $: console.log("div.offsetWidth", email);
</script>

<main class="main-page content-center" bind:this={div}>
  <AlertMissingField
    title={titleWarning}
    content={contentWarning}
    visible={warningFieldAlertVisible} />
  <AlertSuccess
    title="Success"
    content="The biography has been updated successfully!"
    visible={updateBioAlertVisible} />
  {#if !$openSidebarResumeConversation}
    <div in:fly={{ y: -300 }} out:fly={{ y: -500, duration: 50 }}>
      <Nav />
    </div>
    <div in:fly={{ y: -300 }} out:fly={{ y: -500, duration: 50 }}>
      <ResumeTemplateSidebar bind:resumeTemplateValue />
    </div>
    <div
      in:fly={{ y: -300 }}
      out:fly={{ y: -500, duration: 50 }}
      class="wrap-resume-ai grid grid-cols-2 gap-10 text-sm text-center
      bg-stripes-indigo rounded-lg flex justify-center">
      <PersonalInfo
        bind:alertVisible={updateBioAlertVisible}
        bind:fullName
        bind:phone
        bind:zipCode
        bind:address
        bind:birthday
        bind:email
        bind:biography />
      <JobInfo bind:jobValue {generateResume} bind:languageResume />
    </div>
  {/if}
  <slot />
</main>
