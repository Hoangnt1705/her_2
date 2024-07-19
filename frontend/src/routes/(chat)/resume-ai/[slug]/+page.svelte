<script>
  import axios from "axios";
  import { END_POINT } from "$lib/constants.js";
  import { accessToken } from "$lib/stores.js";
  import "$lib/css/main.css";

  let selectedFile = null;

  async function handleFileChange(event) {
    selectedFile = event.target.files[0];
  }

  async function uploadPDF() {
    if (!selectedFile) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", selectedFile); // Use 'pdfFile' instead of 'image'

    try {
      const response = await axios.post(
        `${END_POINT}/v1/resume-ai/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Add authorization header if needed
            // Authorization: `Bearer ${$accessToken}`
          },
        }
      );

      if (response.status === 200) {
        console.log("PDF uploaded successfully!");
        // Optionally, you can display a success message or update the UI
      } else {
        console.error("Error uploading PDF:", response.status);
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  }
</script>

<!-- <script>
  import axios from "axios";
  import "$lib/css/main.css";
  import { END_POINT } from "$lib/constants.js";

  const downloadFile = async (url, headers, body) => {
    const response = await axios.request({
      method: "post",
      url,
      data: body,
      headers,
      responseType: "arraybuffer",
    });
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", "file.pdf"); // or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const generatePdf = () => {
    const headers = { "Content-Type": "application/json" };
    const body = {
      htmlContent: `
         <html>

<head>
  <style ✂prettier:content✂="CiAgICBib2R5IHsKICAgICAgZm9udC1mYW1pbHk6ICdUaW1lcyBOZXcgUm9tYW4nLCBUaW1lcywgc2VyaWY7CiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7CiAgICAgIHBhZGRpbmc6IDA7CiAgICAgIG1hcmdpbjogMDsKICAgICAgd2lkdGg6IDEwMCU7CiAgICAgIGZvbnQtc2l6ZTogMTVweAogICAgfQoKICAgIC5jb250YWluZXIgewogICAgICBwYWRkaW5nOiA3MHB4IDYwcHg7CiAgICB9CgogICAgLmZ1bGxOYW1lIHsKICAgICAgdGV4dC1hbGlnbjogY2VudGVyOwogICAgICBwYWRkaW5nOiAwOwogICAgICBmb250LXdlaWdodDogYm9sZDsKICAgIH0KCiAgICAuY29udGFjdC1pbmZvIHsKICAgICAgZGlzcGxheTogZmxleDsKICAgICAgZmxleC13cmFwOiB3cmFwOwogICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsKCiAgICB9CgogICAgLmNvbnRhY3QtaW5mbyBzcGFuIHsKICAgICAgcG9zaXRpb246IHJlbGF0aXZlOwogICAgICBwYWRkaW5nLXJpZ2h0OiAxNXB4OwogICAgICB3aGl0ZS1zcGFjZTogbm93cmFwOwogICAgfQoKICAgIC5jb250YWN0LWluZm8gc3Bhbjpub3QoOmxhc3QtY2hpbGQpOjphZnRlciB7CiAgICAgIGNvbnRlbnQ6ICLigKIiOwogICAgICBwb3NpdGlvbjogYWJzb2x1dGU7CiAgICAgIHJpZ2h0OiA1cHg7CiAgICB9CgogICAgLmVkdWNhdGlvbj4udGl0bGUgewogICAgICBmb250LXdlaWdodDogYm9sZDsKICAgICAgdGV4dC1hbGlnbjogY2VudGVyOwogICAgfQoKICAgIC5leHBlcmllbmNlPi50aXRsZSB7CiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOwogICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICB9CgogICAgLnNraWxsLWludGVyZXN0Pi50aXRsZSB7CiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOwogICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CiAgICB9CgogICAgLm1hcmdpbi1tYWluLXJvbGUgewogICAgICBtYXJnaW4tdG9wOiAzMnB4OwogICAgfQoKICAgIC5yb2xlIHsKICAgICAgcGFkZGluZzogMHB4IDVweDsKICAgIH0KCiAgICAuZWR1Y2F0aW9uPi5saW5lMSB7fQoKICAgIC5vcmdhbml6YXRpb24tYm9sZCB7CiAgICAgIGZvbnQtc2l6ZTogMTc7CiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOwogICAgfQoKICAgIC5mbGV4LWJldHdlZW4gewogICAgICBkaXNwbGF5OiBmbGV4OwogICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47CiAgICB9CgogICAgLm1hcmdpblRvcCB7CiAgICAgIG1hcmdpbi10b3A6IDE1cHg7CiAgICB9CgogICAgLnBvc2l0aW9uLAogICAgLnJvbGUtaW4tbGFhIHsKICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7CgogICAgfQoKICAgIHVsIHsKICAgICAgbGlzdC1zdHlsZS1wb3NpdGlvbjogaW5zaWRlOwogICAgICAvKiBQb3NpdGlvbiB0aGUgYnVsbGV0IGluc2lkZSAqLwogICAgICBwYWRkaW5nLWxlZnQ6IDJlbTsKICAgICAgLyogQWRkIHBhZGRpbmcgdG8gdGhlIGxlZnQgb2YgdGhlIGxpc3QgKi8KICAgIH0KICAgIAogICAgbGkgewogICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IC8qIEVzdGFibGlzaCBwb3NpdGlvbmluZyBjb250ZXh0IGZvciA6OmJlZm9yZSAqLwogICAgICBwYWRkaW5nLWxlZnQ6IDEuNWVtOyAvKiBDcmVhdGUgc3BhY2UgZm9yIHRoZSBjdXN0b20gYnVsbGV0ICovCiAgICAgIHRleHQtaW5kZW50OiAtMS41ZW07IC8qIEFkanVzdCB0aGUgc3RhcnQgb2YgdGhlIHRleHQgdG8gYWxpZ24gd2l0aCB0aGUgYnVsbGV0ICovCiAgICB9CgogICAgLmxlYWRlcnNoaXAtYW5kLWFjdGl2ZXM+LnRpdGxlIHsKICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7CiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgIH0KICA=" ✂prettier:content✂=""></style></head>

<body>
  <div class="container">
    <div>
      <div class="fullName">Your name</div>
    </div>
    <hr class="dividersName">
    <div>
      <div class="contact-info">
        <span>Home Street Address</span>
        <span>City, State Zip</span>
        <span>name@college.harvard.edu</span>
        <span>phone number</span>
      </div>
    </div>
    <div>
      <div class="role">
        <div class="margin-main-role education">
          <div class="title">Education</div>
          <div class="module-edu">
            <div class=" flex-between">
              <div class="organization organization-bold">
                HARVARD UNIVERSITY
              </div>
              <div class="address-graduate">
                Cambridge, MA
              </div>
            </div>
            <div class=" flex-between">
              <div>
                Degree, Concentration. GPA [Note: Optional]
              </div>
              <div>
                Graduation Date
              </div>
            </div>
            <div class=" flex-between">
              <div>
                Thesis [Note: Optional]
              </div>
            </div>
            <div class=" flex-between">
              <div>
                Relevant Coursework: [Note: Optional. Awards and honors can also be listed here.]
              </div>
            </div>
          </div>
          <div class="module-edu marginTop">
            <div class=" flex-between">
              <div class="organization organization-bold">
                STUDY ABROAD
              </div>
              <div class="address-graduate">
                City, Country
              </div>
            </div>
            <div class=" flex-between">
              <div>
                Study abroad coursework in _____
              </div>
              <div>
                Month Year – Month Year
              </div>
            </div>
          </div>
          <div class="module-edu marginTop">
            <div class=" flex-between">
              <div class="organization organization-bold">
                NAME OF HIGH SCHOOL
              </div>
              <div class="address-graduate">
                City, State
              </div>
            </div>
            <div class=" flex-between">
              <div>
                [Note: May include GPA, SAT scores, or academic honors an employer may want to know]
              </div>
              <div>
                Graduation Date
              </div>
            </div>
          </div>
        </div>
        <div class="margin-main-role experience">
          <div class="title">Experience</div>
          <div class="module-experience">
            <div class="flex-between">
              <div class="organization organization-bold">
                ORGANIZATION
              </div>
              <div class="address-worked">
                City, State
              </div>
            </div>
            <div class="flex-between">
              <div class="position">
                Position Title
              </div>
              <div class="time-to-position">
                Month Year – Month Year
              </div>
            </div>
            <div class="list-info">
              <ul>
                <li>
                  With your next-most recent position, describe your experience, skills, and resulting outcomes in bullet
                  or paragraph form
                </li>
                <li>
                  Begin each line with an action verb and include details that will help the reader understand your
                  accomplishments, skills, knowledge, abilities, or achievements.
                </li>
                <li>
                  Quantify where possible.
                </li>
                <li>
                  Do not use personal pronouns; each line should be a phrase rather than full sentence.
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div class="leadership-and-actives">
          <div class="title">Leadership and Actives</div>
          <div class="module-laa">
            <div class="flex-between">
              <div class="organization organization-bold">
                ORGANIZATION
              </div>
              <div class="address-worked">
                City, State
              </div>
            </div>
            <div class="flex-between">
              <div class="role-in-laa">
                Role
              </div>
              <div class="time-to-role-in-laa">
                Month Year – Month Year
              </div>
            </div>
            <div class="list-info">
              <ul>
                <li>
                  This section can be formatted similarly to the Experience section, or you can omit descriptions for
                  activities.
                </li>
                <li>
                  If this section is more relevant to the opportunity you are applying for, consider moving this above your
                  Experience section
                </li>
              </ul>
            </div>
          </div>

          <div class="margin-main-role skill-interest">
            <div class="title">Skills & Interests</div>
            <div>
             <div>
              <span style="font-weight:bold">Technical: </span><span>List computer software and programming languages</span>
             </div>
             <div>
              <span style="font-weight:bold">Language: </span><span>List foreign languages and your level of fluency</span>
             </div>
             <div>
              <span style="font-weight:bold">Laboratory: </span><span> List scientific / research lab techniques or tools [If Applicable]</span>
             </div>
             <div>
              <span style="font-weight:bold">Interests: </span><span>List activities you enjoy that may spark interview conversation</span>
             </div>
            </div>

          </div>
        </div>
      </div>
    </div>
</body>

</html>`,
    };

    downloadFile(
      `${END_POINT}/v1/parse-recruiter/downloadPdfHere`,
      headers,
      body
    )
      .then(() => {
        console.log("PDF generated and downloaded");
      })
      .catch((err) => {
        console.log(err);
      });
  };
</script><button on:click={generatePdf}>Generate PDF</button>
<div class="relative">


 
</div> -->
<input type="file" accept="application/pdf" on:change={handleFileChange} />
<button on:click={uploadPDF}>Upload PDF</button>
