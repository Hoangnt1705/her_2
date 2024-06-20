import os
from openai import OpenAI
from tenacity import retry, wait_random_exponential, stop_after_attempt
from termcolor import colored
from context.index import resume_functions
from client import send_error, send_success
from helper import chat_completion_request, pretty_print_conversation
import json


def apply_constraints(resume):
    for exp in resume['experience']:
        exp['description'] = make_active_and_fact_based(exp['description'])
    return resume


def make_active_and_fact_based(description):
    return description.replace("Was responsible for", "Developed")


class Conversation:
    def __init__(self):
        self.conversation_history = []

    def add_message(self, role, content):
        message = {"role": role, "content": content}
        self.conversation_history.append(message)

    def display_conversation(self, detailed=False):
        role_to_color = {
            "system": "red",
            "user": "green",
            "assistant": "blue",
            "function": "magenta",
        }
        for message in self.conversation_history:
            print(colored(
                f"{message['role']}: {message['content']}\n\n", role_to_color[message["role"]]))


def chat_completion_with_function_execution(messages, functions=[None]):
    response = chat_completion_request(messages, functions)
    print('response', response)

    full_message = response.choices[0]
    if full_message.finish_reason == "tool_calls":
        print(f"Function generation requested, calling function")
        return call_resume_function(messages, full_message)
    else:
        print(f"Function not required, responding to user")
        return response


def call_resume_function(messages, full_message):
    resume = None
    if full_message.message.tool_calls[0].function.name == "create_resume":
        try:
            resume = json.loads(
                full_message.message.tool_calls[0].function.arguments)
            # resume = create_resume(parsed_output["personal_info"], parsed_output["education"], parsed_output["experience"], parsed_output["leadership"], parsed_output["skills"])
            print("Creating resume", resume)
            resume_message = {
                "role": "function", "name": full_message.message.tool_calls[0].function.name, "content": resume}
            messages.append(resume_message)
            # Debugging the resume message
            return json.dumps(resume_message, indent=2)
        except Exception as e:
            print(parsed_output)
            print(f"Function execution failed")
            print(f"Error message: {e}")
            return e  # Return the exception if there's an error

    else:
        raise Exception("Function does not exist and cannot be called")

# Example usage


def create_ai():
    resume_system_message = """
    You are a professional career advisor specializing in resume creation. Your goal is to guide users in crafting a concise, informative, and effective resume that highlights their strongest assets and differentiates them from other candidates. The resume must be tailored to the specific recruitment information provided. Here is a comprehensive set of guidelines and tips to follow:
    
    1. **Resume Structure**:
        - Ensure the resume includes sections such as Contact Information, Objective or Summary, Education, Experience, Leadership, Skills, and Additional Information (such as certifications or volunteer work).
        - Tailor the resume to the type of position the user is seeking, reflecting skills valued by potential employers.
        - Use consistent formatting throughout the resume, including spacing, underlining, italics, bold, and capitalization for emphasis.

    2. **Content Guidelines**:
        - **Language**:
            - Be specific rather than general.
            - Use active language rather than passive.
            - Write to express, not impress.
            - Be articulate rather than flowery.
            - Ensure all statements are fact-based, quantifying and qualifying achievements where possible.
            - Write for readers who scan quickly.
        - **Avoid**:
            - Personal pronouns (such as "I").
            - Abbreviations.
            - Narrative style.
            - Slang or colloquialisms.
            - Including a picture.
            - Listing age or gender.
            - Listing references.
            - Starting each line with a date.

    3. **Getting Started**:
        - Draft a resume using templates from the MCS website.
        - Attend a Resume Workshop for foundational learning.
        - View the MCS Recorded Resume Webinar on the website.
        - Seek advice during drop-in sessions (Monday-Friday, 1:00-4:00pm) for quick career-related questions and resume reviews.
        - Participate in industry-specific resume review clinics listed on the events calendar.

    4. **Top 6 Resume Mistakes to Avoid**:
        - Spelling and grammar errors.
        - Missing email and phone information.
        - Using passive language instead of action words.
        - Poor organization, lack of conciseness, or difficulty to skim.
        - Failing to demonstrate results.
        - Overly long resumes.

    5. **Best Practices**:
        - Be consistent in format and content.
        - Make the resume easy to read and follow, balancing white space.
        - List headings in order of importance.
        - Within headings, list information in reverse chronological order.
        - Avoid gaps in information, such as missing summer experiences.
        - Ensure formatting translates properly if converted to a PDF.

    6. **International Considerations**:
        - Note that resume guidelines can vary by country. Consult international resources on the MCS website for specific guidelines.

    7. **Action Verbs by Category**:
        - **Leadership**: Accomplished Achieved, Contracted Coordinated, Handled Headed, Organized Oversaw, Regulated Reorganized, Administered ,Delegated, Impacted, Planned, Reviewed, Analyzed, Developed, Improved, Predicted, Scheduled, Assigned, Directed, Increased 
            ,Prioritized, Spearheaded, Attained, Earned, Led, Produced, Strengthened, Chaired, Evaluated, Mastered, Proved, Supervised ,Consolidated, Executed, Orchestrated, Recommended, Surpassed, etc.
        - **Communication**: Addressed, Arbitrated, Arranged, Authored, Collaborated, Convinced, Corresponded, Delivered, Documented, Drafted, Edited, Energized, Enlisted, Formulated, Influenced, Interpreted, Lectured, Liaised, Mediated, Moderated, Negotiated, Persuaded, Presented, Promoted, Publicized, Recruited, Reconciled, Reported, Rewrote, Spoke, Suggested, Synthesized, Translated, Verbalized, Wrote, etc.
        - **Research**: Clarified, Collected, Concluded, Conducted, Constructed, Critiqued, Derived, Determined, Diagnosed, Discovered, Evaluated, Examined, Extracted, Formed, Identified, Inspected, Interpreted, Investigated, Modeled, Organized, Resolved, Reviewed, Summarized, Surveyed, Systematized, Tested, etc.
        - **Technical**: Assembled, Built, Calculated, Computed, Designed, Devised, Engineered, Fabricated, Installed, Maintained, Operated, Optimized, Overhauled, Programmed, Remodeled, Repaired, Solved, Standardized, Streamlined, Upgraded, etc.
        - **Teaching**: Adapted, Advised, Clarified, Coached, Communicated, Coordinated, Demystified, Developed, Enabled, Encouraged, Evaluated, Explained, Facilitated, Guided, Informed, Instructed, Persuaded, Set Goals, Stimulated, Studied, Taught, Trained, etc.
        - **Quantitative**: Administered, Allocated, Analyzed, Appraised, Audited, Balanced, Budgeted, Calculated, Computed, Developed, Forecasted, Managed, Marketed, Maximized, Minimized, Planned, Projected, Researched, etc.
        - **Creative**: Acted, Composed, Conceived, Conceptualized, Created, Customized, Designed, Developed, Directed, Established, Fashioned, Founded, Illustrated, Initiated, Integrated, Introduced, Invented, Originated, Performed, Planned, Published, Redesigned, Revised, Revitalized, Shaped, Visualized, etc.
        - **Helping**: Assessed, Assisted, Clarified, Coached, Counseled, Demonstrated, Diagnosed, Educated, Enhanced, Expedited, Facilitated, Familiarized, Guided, Motivated, Participated, Proposed, Provided, Referred, Rehabilitated, Represented, Served, Supported, etc.
        - **Organizational**: Accelerated, Added, Approved, Arranged, Broadened, Cataloged, Centralized, Changed, Classified, Collected, Compiled, Completed, Controlled, Defined, Dispatched, Executed, Expanded, Generated, Gained, Gathered, Implemented, Inspected, Launched, Monitored, Operated, Organized, Prepared, Processed, Purchased, Recorded, Reduced, Reinforced, Retrieved, Screened, Selected, Simplified, Sold, Specified, Steered, Structured, Systematized, Tabulated, Updated, Unified, Utilized, Validated, Verified, etc.

    8. **To Create a CV Based on Recruitment Information**:
        -Review the specific job posting or recruitment information provided.
        -Highlight the skills, experience, and qualifications that align with the job requirements.
        -Emphasize relevant accomplishments and use keywords from the job description.
        -Tailor the objective or summary statement to reflect the specific role and company.
    
    End of Prompt
    """
    resume_conversation = Conversation()
    resume_conversation.add_message("system", resume_system_message)

    # Add a user message
    # resume_conversation.add_message("user", "I need help creating a resume.")
    # chat_response = chat_completion_with_function_execution(
    #     resume_conversation.conversation_history, functions=resume_functions
    # )
    # assistant_message = chat_response.choices[0].message.content
    # print('assistant_message', assistant_message)
    # resume_conversation.add_message("assistant", assistant_message)
    # print("assistant_message>", assistant_message)

    # Add another user message to generate a sample resume
    personal_information = """
Alex Johnson is a highly skilled Node.js developer with over 5 years of experience in building scalable web applications and services. Holding a Bachelor of Science in Computer Science from the University of California, Berkeley, Alex has a strong foundation in full-stack development and specializes in JavaScript, Express.js, and MongoDB. Currently, Alex is a Senior Node.js Developer at Tech Solutions Inc. in San Francisco, CA, where he has led a team of five developers in designing and implementing a microservices architecture for the company’s e-commerce platform, resulting in a 30% improvement in data retrieval efficiency. Prior to this role, Alex worked as a Node.js Developer at Web Innovations, where he built and deployed scalable web applications and APIs, enhancing performance and security through best practices and rigorous code reviews.

Proficient in programming languages such as JavaScript and TypeScript, Alex also has expertise in front-end frameworks like React.js and database systems including MySQL and PostgreSQL. His technical skill set is further complemented by experience with Docker, Kubernetes, AWS, Git, and Jenkins, as well as a deep understanding of RESTful API design, microservices architecture, Agile methodologies, and test-driven development (TDD). Alex’s certifications include Certified Node.js Developer from the Node.js Foundation and AWS Certified Solutions Architect from Amazon Web Services.

Among Alex’s notable projects are the development of a comprehensive e-commerce platform using Node.js, Express.js, and MongoDB, featuring user authentication, product management, and payment processing, deployed on AWS utilizing EC2 and S3 for scalability. He also built a real-time chat application leveraging Node.js and WebSocket technology, with features like user rooms, message history, and online/offline status, and utilized Redis for efficient message storage and retrieval.

In addition to his professional achievements, Alex is dedicated to giving back to the community as a mentor at Code for Good, a non-profit organization that teaches coding to underprivileged youth. Fluent in both English and Spanish, Alex brings a global perspective to his work. His portfolio and further details about his projects and experience can be found on his website at alexjohnson.dev and GitHub at github.com/alexjohnson.    """
    recruitment_information = """
   Job Description
- Develop new, and maintain and operate features on the Backend Game Server

- Store and analyze user data

- Optimized server performance and scalability to support the number of concurrent players

- Coordinate with Client Dev to handle problems arising during working and operating the game

- Develop backend servers for platform integration interfaces (API gateways, distributed message queues, etc.)

- Development of real-time processing systems for big data games

- Participate in the company's R&D projects

Applicant Requirements
- Knowledge of Linux, tasks related to Linux server operation and monitoring

- Proficiency in one of several languages such as PHP, Java, or NodeJS

- Experience in Restful API, Microservices, Serverless

- Experience in Client-Server, WebSocket, WebService applications

- Experience working with MySql, NoSql, Redis

- Experience working or operating systems on AWS, Azure, or Google Cloud Platform

- Good analytical and problem-solving skills

- Experience in DevOps, CI/CD is an advantage

Right
Net salary: 15,000,000 - 25,000,000 VND/month

- Bonuses for public holidays, salary bonuses in the 13th month; Tet bonus (3-5 months salary)

- Salary review 2 times/year

- Allowance for lunch, rent, travel

- Review of tour rewards every 6 months

- Company culture: reading, exercising daily

- Work in a youthful, friendly and development-oriented environment

- Social insurance, health insurance and unemployment insurance regimes according to labor law

- Equipped with modern equipment, laptop, large screen

- Annual travel, monthly festival participation

- Complimentary snacks/drinks

- Join the company's Football Club every week

- Benefits for members: From > 01 year, a general health check-up every 1 year; From > 03 years of being granted capital to buy a house or a car......

- Working time: 2nd – 6th + 01st 7th Creative day; Closed 03 Saturday and 4 Sunday (8:30 - 18h, lunch break 1:30 p)

Workplace
- Hanoi: The Nine Building, No. 9 Pham Van Dong, Mai Dich, Cau Giay
Working Time
Monday - Friday (from 08:30 to 18:00)
    """
    resume_conversation.add_message(
        "user", f"Here is my information: {personal_information} \n Here is recruitment information: {recruitment_information}")

    print('resume_conversation.conversation_history', json.dumps(
        resume_conversation.conversation_history, indent=2))  # Debugging the conversation history
    updated_response = chat_completion_with_function_execution(
        resume_conversation.conversation_history, functions=resume_functions
    )
    print(updated_response)
    return 'ok'
