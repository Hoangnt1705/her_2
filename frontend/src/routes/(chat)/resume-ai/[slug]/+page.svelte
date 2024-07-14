<script>
    import axios from 'axios';
    import '$lib/css/main.css';
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
    body {
      font-family: 'Times New Roman', Times, serif;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      width: 100%;
      font-size: 15px
    }

    .container {
      padding: 70px 60px;
    }

    .fullName {
      text-align: center;
      padding: 0;
      font-weight: bold;
    }

    .contact-info {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

    }

    .contact-info span {
      position: relative;
      padding-right: 15px;
      white-space: nowrap;
    }

    .contact-info span:not(:last-child)::after {
      content: "•";
      position: absolute;
      right: 5px;
    }

    .education>.title {
      font-weight: bold;
      text-align: center;
    }

    .experience>.title {
      font-weight: bold;
      text-align: center;
    }

    .skill-interest>.title {
      font-weight: bold;
      text-align: center;
    }

    .margin-main-role {
      margin-top: 32px;
    }

    .role {
      padding: 0px 5px;
    }

    .education>.line1 {}

    .organization-bold {
      font-size: 17;
      font-weight: bold;
    }

    .flex-between {
      display: flex;
      justify-content: space-between;
    }

    .marginTop {
      margin-top: 15px;
    }

    .position,
    .role-in-laa {
      font-weight: bold;

    }

    ul {
      list-style-position: inside;
      /* Position the bullet inside */
      padding-left: 2em;
      /* Add padding to the left of the list */
    }
    
    li {
      position: relative; /* Establish positioning context for ::before */
      padding-left: 1.5em; /* Create space for the custom bullet */
      text-indent: -1.5em; /* Adjust the start of the text to align with the bullet */
    }

    .leadership-and-actives>.title {
      font-weight: bold;
      text-align: center;
    }
  </style>
</head>

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

</html>`
      };
      
      downloadFile(`${END_POINT}/v1/parse-recruiter/downloadPdfHere`, headers, body).then(() => {
        console.log('PDF generated and downloaded');
      }).catch((err) => {console.log(err)});
    };
  </script>
  
  <button on:click={generatePdf}>Generate PDF</button>