const resumeContent = (data) => {
  console.log(data.leadership ? 'true' : 'false', data.leadership);
  const renderSkills = `
${data.skills[0].technical && data.skills[0].technical.length > 0 ? `
    <div>
      <span style="font-weight:bold">Technical: </span><span>${data.skills[0].technical.join(', ')}</span>
    </div>
  `: ''}
  ${data.skills[0].language && data.skills[0].language.length > 0 ? `
    <div>
      <span style="font-weight:bold">Language: </span><span>${data.skills[0].language.join(', ')}</span>
    </div>
  `: ''}
  ${data.skills[0].laboratory && data.skills[0].laboratory.length > 0 ? `
    <div>
      <span style="font-weight:bold">Laboratory: </span><span>${data.skills[0].laboratory.join(', ')}</span>
    </div>
  ` : ''}
  ${data.skills[0].interests && data.skills[0].interests.length > 0 ? `
    <div>
      <span style="font-weight:bold">Interests: </span><span>${data.skills[0].interests.join(', ')}</span>
    </div>
  ` : ''}
`;

  return `
  <html>
  <head>
    <style>
         body {
      font-family: 'Times New Roman', Times, serif;
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      width: 100%;
      font-size: 14.5px
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
      margin-top: 28px;
    }

    .role {
      padding: 0px 5px;
    }

    .education>.line1 {}

    .organization-bold {
      font-size: 16.5;
      font-weight: bold;
    }

    .flex-between {
      display: flex;
      justify-content: space-between;
    }

    .marginTop {
      margin-top: 16px;
    }

    .position,
    .role-in-laa {
      font-weight: bold;

    }
    .module-skill-interests{
      margin-top: 5px;
    }

    ul {
      margin: 1px 0px;
      list-style-position: inside;
      /* Position the bullet inside */
      padding-left: 2em;
      /* Add padding to the left of the list */
      gap: 2px;
    }

    li {
      position: relative;
      /* Establish positioning context for ::before */
      padding-left: 1.5em;
      /* Create space for the custom bullet */
      text-indent: -1.5em;
      /* Adjust the start of the text to align with the bullet */
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
      ${data.personal_info.name ? `
        <div class="fullName">${data.personal_info.name}</div>
      `: ''}
      </div>
      <hr style="margin: 2px 0px" class="dividersName">
      <div>
        <div class="contact-info">
        ${data.personal_info.address ? `
        <span>${data.personal_info.address}</span>
        `: ''}
        ${data.personal_info.zipcode ? `
        <span>${data.personal_info.zipcode}</span>
        `: ''}
        ${data.personal_info.email ? `
        <span>${data.personal_info.email}</span>
        `: ''}
        ${data.personal_info.phone ? `
        <span>${data.personal_info.phone}</span>
        `: ''}
        </div>
      </div>
      <div>
        <div class="role">
          ${data.education.length ? `
          <div class="margin-main-role education">
            <div class="title">Education</div>
            ${data.education.map(edu => `
              <div class="module-edu marginTop">
                <div class="flex-between">
                  <div class="organization organization-bold">
                    ${edu.institution}
                  </div>
                  <div class="address-graduate">
                    ${edu.location}
                  </div>
                </div>
                <div class="flex-between">
                  <div>
                    ${edu.degree}${edu.scores ? `. ${edu.scores}` : ''}
                  </div>
                  <div>
                    ${edu.duration}
                  </div>
                </div>
                ${edu.thesis ? `<div class="flex-between"><div>Thesis: ${edu.thesis}</div></div>` : ''}
                ${edu.relevant_coursework ? `<div class="flex-between"><div>Relevant Coursework: ${edu.relevant_coursework}</div></div>` : ''}
              </div>
            `).join('')}
          </div>
          `: ''}
          ${data.experience.length ? `
           <div class="margin-main-role experience">
            <div class="title">Experience</div>
            ${data.experience.map(exp => `
              <div class="module-experience marginTop">
                <div class="flex-between">
                  <div class="organization organization-bold">
                    ${exp.organization}
                  </div>
                  <div class="address-worked">
                    ${exp.location}
                  </div>
                </div>
                <div class="flex-between">
                  <div class="position">
                    ${exp.position_title}
                  </div>
                  <div class="time-to-position">
                    ${exp.duration}
                  </div>
                </div>
                <div class="list-info">
                  <ul>
                    ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                  </ul>
                   <ul>
                    ${exp.projects ? exp.projects.map(prj => `<li>${prj}</li>`).join('') : ''}
                  </ul>
                </div>
              </div>
            `).join('')}
          </div>
          ` : ''}
         ${data.leadership_and_actives.length ? `
         <div class="margin-main-role leadership-and-actives">
            <div class="title">Leadership and Actives</div>
            ${data.leadership_and_actives.map(role => `
              <div class="module-laa marginTop">
                <div class="flex-between">
                  <div class="organization organization-bold">
                    ${role.organization}
                  </div>
                  <div class="address-worked">
                    ${role.location}
                  </div>
                </div>
                <div class="flex-between">
                  <div class="role-in-laa">
                    ${role.role}
                  </div>
                  <div class="time-to-role-in-laa">
                    ${role.duration}
                  </div>
                </div>
                <div class="list-info">
                  <ul>
                    ${role.description.map(desc => `<li>${desc}</li>`).join('')}
                  </ul>
                </div>
              </div>
            `).join('')}
          </div>
         `: ''}
         ${data.skills.length ? `
          <div class="margin-main-role skill-interest">
            <div class="title">Skills & Interests</div>
            <div class="module-skill-interests">
              ${renderSkills}
            </div>
          </div>
         ` : ''}
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};


export default resumeContent;
