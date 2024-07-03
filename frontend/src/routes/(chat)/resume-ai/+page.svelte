<script>
  import PersonalInfo from '$lib/components/resume_ai/PersonalInfo.svelte';
  import JobInfo from '$lib/components/resume_ai/JobInfo.svelte';
  import Nav from '$lib/components/Nav.svelte'
  import ResumeTemplateSidebar from '$lib/components/resume_ai/ResumeTemplateSidebar.svelte';
</script>


<main class="main-page content-center">
  <Nav />
    <div class="wrap-resume-ai grid grid-cols-2 gap-10 text-sm text-center leading-6 bg-stripes-indigo rounded-lg flex justify-center">
      <PersonalInfo />
      <JobInfo />
    </div>
  <ResumeTemplateSidebar/>
</main>



