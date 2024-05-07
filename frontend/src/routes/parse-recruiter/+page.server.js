export function load() {
    const placeholderTexts = [
        `Position: IT Specialist
        
        Location: [Location]
        
        Company: [Company Name]
        
        About Us:
        [Company Name] is a leading [industry or sector] company dedicated to [brief description of the company's mission or goals]. We pride ourselves on fostering a dynamic and innovative work environment where employees are empowered to make a difference.
        
        Job Description:
        We are seeking a highly skilled and motivated IT Specialist to join our team. The ideal candidate will have a strong background in IT support, with experience in troubleshooting hardware and software issues, managing networks, and providing technical assistance to employees. As an IT Specialist, you will play a crucial role in ensuring the smooth operation of our technology infrastructure and providing excellent support to our team members.
        
        Responsibilities:
        Your responsibilities will include providing technical support to employees, troubleshooting hardware and software issues, installing and configuring computer systems and networks, ensuring the security and privacy of information, and collaborating with other departments to implement technology solutions. Additionally, you will stay up-to-date with advancements in technology and IT best practices to ensure that our systems are efficient, secure, and reliable.
        
        Requirements:
        To be successful in this role, you should have a bachelor's degree in Computer Science, Information Technology, or a related field, along with proven experience as an IT Specialist or similar role. You should have strong knowledge of IT systems and networks, including Windows and Linux environments, and experience with network security, firewalls, and VPNs. Excellent problem-solving and communication skills are essential, and certifications such as CompTIA A+, Network+, or Cisco CCNA are a plus.
        
        Benefits:
        [Company Name] offers competitive salary and benefits packages, including health, dental, and vision insurance, retirement savings plans with employer match, paid time off and holidays, and professional development opportunities.
        
        How to Apply:
        If you are passionate about technology and thrive in a fast-paced environment, we encourage you to apply for the IT Specialist position at [Company Name]. Please submit your resume and cover letter to [contact email or link], and include "IT Specialist Application" in the subject line.
        
        [Company Name] is an equal opportunity employer and values diversity in the workplace. We encourage applications from all qualified individuals regardless of race, color, religion, sex, sexual orientation, gender identity, national origin, disability, or veteran status.`,
        `Job description
        Perform web and legacy system development, update and support, delivery high level solutions or subsystems like custom API's, database modeling and design.
        Initiate and lead development of web tools and applications, design and build back-office system from scratch.
        Participle on the conception and setup of automation system to facilitate the usage and project deployment on site and on cloud.
        Work closely with colleagues on enhancing conception, development and platform functionality, suggest improvements on security and performance and drive continuous improvement of UI, software architecture, and new technologies.
        Work with the infrastructure team to explore innovative solutions.
        Analyzes customer requirements and defines solutions and architecture plus assistance to the team on problems and technical roadblocks.
        Candidate requirements`,
        `🚀 Now Hiring: Marketing Manager

        Are you a passionate marketing professional with a knack for innovative strategies? Do you thrive in a dynamic, fast-paced environment? Our company is seeking a Marketing Manager to join our team and drive our marketing initiatives to the next level.
        
        About Us:
        We are a leading tech startup revolutionizing the way people interact with [industry]. Our mission is to [mission statement]. With a diverse and talented team, we're committed to delivering exceptional products and experiences to our customers.
        
        Responsibilities:
        
        Develop and execute comprehensive marketing plans to drive brand awareness and customer acquisition.
        Lead the creation of compelling content across various channels, including social media, email, and blog.
        Analyze market trends and consumer insights to optimize marketing strategies and campaigns.
        Collaborate with cross-functional teams to ensure alignment and consistency in messaging and branding.
        Track and report on key performance metrics to measure the effectiveness of marketing efforts.
        Requirements:
        
        Bachelor's degree in Marketing, Business, or related field.
        Proven experience in marketing roles, with a focus on digital marketing and campaign management.
        Strong analytical skills with the ability to interpret data and derive actionable insights.
        Excellent communication and interpersonal skills.
        Ability to thrive in a fast-paced, deadline-driven environment.
        Benefits:
        
        Competitive salary and benefits package.
        Flexible work hours and remote work options.
        Opportunity for professional growth and development.
        Fun and inclusive company culture with team-building activities and events.
        If you're ready to take on a new challenge and make an impact in a growing company, we want to hear from you! Apply now with your resume and cover letter outlining why you'd be a great fit for this role.
        
        Application Deadline: [Date]
        
        Location: [City, State or Remote]
        `,
    ]
    const staticParseRecruiter = [
        { title: 'RECRUITER NAME', content: 'Company A', state: false },
        { title: 'JOB TITLE', content: 'Senior-Lead Magento Deverloper', state: false },
        { title: 'JOB TYPE', content: 'Full-Time', state: false },
        { title: 'SALARY', content: 'Up to $55000', state: false },
        { title: 'BENEFITS', content: 'Personal Development Budget', state: false }
    ]
    return {
        placeholderTexts,
        staticParseRecruiter
    }
}