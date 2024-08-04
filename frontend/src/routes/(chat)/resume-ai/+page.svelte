<script>
  import {
    isLoadGenerateResume,
    activeChatId,
    activeRTSidebar,
  } from "$lib/stores.js";
  import PersonalInfo from "$lib/components/resume_ai/PersonalInfo.svelte";
  import JobInfo from "$lib/components/resume_ai/JobInfo.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import ResumeTemplateSidebar from "$lib/components/resume_ai/ResumeTemplateSidebar.svelte";
  import AlertSuccess from "$lib/components/alert/AlertSuccess.svelte";
  import AlertMissingField from "$lib/components/alert/AlertMissingField.svelte";
  import { tick, onMount } from "svelte";
  import axios from "axios";
  import { END_POINT } from "$lib/constants.js";
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
        const response = await axios.post(`${END_POINT}/v1/resume-ai/upload`, {
          fullName,
          email,
          phoneNumber: phone,
          birthday: birthday,
          address,
          biography,
          jobInformation: jobValue,
          zipCode,
          languageResume
        });
        console.log(response);
      } catch (error) {
        console.log(error);
        contentWarning = error;
        return showAlert();
      } finally {
        isLoadGenerateResume.update((c) => (c = false));
      }
    }
  };
  onMount(() => activeChatId.set(null));
</script>

<main class="main-page content-center">
  <AlertMissingField
    title={titleWarning}
    content={contentWarning}
    visible={warningFieldAlertVisible} />
  <AlertSuccess
    title="Success"
    content="The biography has been updated successfully!"
    visible={updateBioAlertVisible} />
  <Nav />
  <div
    class="wrap-resume-ai grid grid-cols-2 gap-10 text-sm text-center leading-6
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
  <ResumeTemplateSidebar bind:resumeTemplateValue />
</main>
