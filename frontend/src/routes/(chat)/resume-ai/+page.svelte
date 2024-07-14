<script>
  import { isLoadGenerateResume } from '$lib/stores.js'
  import PersonalInfo from '$lib/components/resume_ai/PersonalInfo.svelte'
  import JobInfo from '$lib/components/resume_ai/JobInfo.svelte'
  import Nav from '$lib/components/Nav.svelte'
  import ResumeTemplateSidebar from '$lib/components/resume_ai/ResumeTemplateSidebar.svelte'
  import AlertSuccess from '$lib/components/alert/AlertSuccess.svelte'
  import AlertMissingField from '$lib/components/alert/AlertMissingField.svelte'
  import { tick } from 'svelte'
  import axios from 'axios';
  import {END_POINT} from '$lib/constants.js';
  let jobValue
  let fullName
  let zipCode
  let homeStreetAddress
  let email
  let phone = null
  let country
  let state
  let city
  let biography = localStorage.getItem('bio') || null
  let updateBioAlertVisible = false
  let warningFieldAlertVisible = false
  let titleWarning = 'Warning!'
  let contentWarning
  const showAlert = () => {
    warningFieldAlertVisible = true
    isLoadGenerateResume.update((c) => (c = true))
    setTimeout(() => {
      warningFieldAlertVisible = false
      isLoadGenerateResume.update((c) => (c = false))
    }, 1000)
  }
  const generateResume = () => {
    if (!$isLoadGenerateResume) {
      if (!fullName) {
        contentWarning = 'Please fill your name'
        return showAlert()
      }
      if (!email) {
        contentWarning = 'Please fill your email'
        return showAlert()
      }
      if (!phone) {
        contentWarning = 'Please fill your phone number'
        return showAlert()
      }
      if (!country) {
        contentWarning = 'Please select country'
        return showAlert()
      }
      if (!state) {
        contentWarning = 'Please select state'
        return showAlert()
      }
      if (!city) {
        contentWarning = 'Please select district/city'
        return showAlert()
      }
      if (!homeStreetAddress) {
        contentWarning = 'Please fill your home street address'
        return showAlert()
      }
      if (!biography) {
        contentWarning = 'Please fill your biography'
        return showAlert()
      }
      if (!jobValue) {
        contentWarning = 'Please fill your job information'
        return showAlert()
      }
      const response = axios.get(`${END_POINT}/`)
    }
  }
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
      bind:homeStreetAddress
      bind:country
      bind:state
      bind:city
      bind:email
      bind:biography />
    <JobInfo bind:jobValue {generateResume} />
  </div>
  <ResumeTemplateSidebar />
</main>
