# THE USE OF WHO IN RECRUITMENT

#### 🎥 Video Demo: 

https://youtu.be/OIv8SYUqQqs

#### 📄 Description:

🔍 Searching for jobs can ⏳ take up a lot of time ⏱️ and feel frustrating 😔. Reading through job postings 📰, understanding their requirements 📋, and tailoring a CV ✍️ for each opportunity can consume hours, if not days 🗓️. On average, evaluating a single job posting can take up to 10️⃣ minutes 🕒, and when sifting through dozens 📑 or hundreds 🔢, this time adds up quickly 📈. The process becomes even more cumbersome when applicants 🧑‍💻 have to create a custom CV 📝 that aligns with specific job requirements 🛠️, stretching the process further 🧵.

💡 To address this challenge, I developed a project 🎯 designed to streamline 🛤️ and optimize job searches using AI 🤖. This project, conceived 💭 during the ideation phase of my CS50x final project 🎓, doubles as a personal showcase 📂 for potential employers. The system provides two 🧑‍🤝‍🧑 core functionalities:

1️⃣ **Job Posting Summarization:** Users can input details from job postings 📥, and the system will extract 🧲 and summarize 🖍️ critical information 🔑, such as salary 💵, bonuses 🎁, required skills 💡, and qualifications 📜.

2️⃣ **AI Resume Generator:** Based on personal information 📇 and job posting details 🛠️ provided by the user, the system generates a tailored CV ✨ that highlights relevant skills 🏅 and experience 🎯 for the specific job.

---

## 🛠️ System Architecture

🏗️ The project uses a monolithic architecture 🏢 with three main components 🛠️: two backend services 🖥️ and one frontend application 🌐.

### 🔙 Backend 1: Flask (Python 🐍)

Flask serves as the core logic handler 🧠 for AI processing 🖥️. It communicates 📡 with OpenAI’s ChatGPT API 🗨️ to process job posting details 📝 and generate summaries 📜 or CV content ✏️. Flask also interacts 🔄 with the Node.js backend via SocketIO 🌐 to ensure seamless data exchange ⚡.

### 🔙 Backend 2: Node.js (JavaScript 💻)

The Node.js backend acts as a bridge 🌉 between the frontend 🖼️ and the Flask service 🧪. It processes client-side data 📂, such as usernames 🙍‍♂️, job posting content 📝, and user profiles 🧾, forwarding it to the Flask service 🛤️ for AI processing 🔄. This backend ensures efficient data validation ✅ and routing 🚦.

### 🌐 Frontend: Svelte (JavaScript 💻)

Svelte powers the frontend application 🎨 due to its simplicity 🪄, flexibility 🤹, and performance ⚡. The user interface 🎛️ is designed to be intuitive 🧩, allowing users to easily input job posting data 📥 and retrieve summarized postings 📄 or generated resumes ✨.

🔐 Authentication uses third-party login options 🔑 via Passport.js, supporting Google 🌐, Facebook 📘, and LinkedIn 🧑‍💼, eliminating the need for traditional login forms 📃 and prioritizing convenience 🛋️ and security 🛡️.

---

## 🧰 Technology Stack

### Programming Languages

🐍 Python (Flask backend)
💻 JavaScript (Node.js backend and Svelte frontend)

### Frameworks

- Flask 🐍
- Express.js 💼
- Svelte 🖼️

### Database 🗄️

- MongoDB for storing user profiles 🧾 and interaction data 📂.

### Caching ⚡

- Redis for improving performance 🏎️ and handling temporary data 📊.

### Cloud Services ☁️

- Firebase for hosting 🏠 and other cloud functionalities 💨.

### Authentication 🔑

- Passport.js for integrating Google 🌐, Facebook 📘, and LinkedIn 🧑‍💼 login options.

### CSS Framework 💅

- Tailwind CSS for building responsive 📱 and visually appealing 🎨 user interfaces.

---

## 🎨 Design Choices

### 🤖 AI Integration

Flask was chosen for AI-related logic 🤔 because of its lightweight nature 🪶 and compatibility 🔗 with Python libraries 📚 and APIs 🛠️. Its ability to handle SocketIO connections 🌐 made it ideal for real-time communication 🔄 with the Node.js service 🛤️.

### 🔐 Authentication via OAuth

Using OAuth authentication 🎯 (Google 🌐, Facebook 📘, LinkedIn 🧑‍💼) provides a seamless and secure login experience 🔒, simplifying onboarding 📋 and increasing user trust 🤝 compared to traditional methods 🖊️.

### 🏢 Monolithic Architecture

A monolithic structure 🏗️ was chosen over microservices 🧱 to reduce complexity 🧩 during development 🏗️ and ensure straightforward deployment 📦. Given the project’s scope 🎯, this architecture meets performance requirements ✅.

---

## 📂 File Structure and Functionality

### Backend - Flask 🐍

- **main.py:** Routes 🛤️ and logic for interacting with the ChatGPT API 🗨️.
- **requirements.txt:** Lists Python dependencies 📜.
- **SocketIO integration:** Enables real-time communication 🔄 between Flask and Node.js.

### Backend - Node.js 💻

- **index.js:** Entry point 🏁 for handling routes 🛤️ and SocketIO communication 🌐.
- **package.json:** Defines project dependencies 📚.
- **User data handlers:** Processes and forwards data 📂.

### Frontend - Svelte 🖼️

- **App.svelte:** Main application file 📜.
- **Components folder:** Reusable components 🛠️.
- **Tailwind CSS integration:** Ensures responsive design 📱.

---

## 🛠️ Setup Instructions

### Backend - Flask 🐍

1️⃣ Navigate to the Flask backend directory 📂:
   ```bash
   cd backend-flask
   ```
2️⃣ Create a virtual environment 🌐:
   ```bash
   virtualenv .venv
   ```
3️⃣ Activate the virtual environment 🔋:
   ```bash
   .venv/bin/activate
   ```
4️⃣ Install dependencies 📦:
   ```bash
   pip install -r requirements.txt
   ```
5️⃣ Rename `.env-example` to `.env` and add environment variables 📋.

### Backend - Node.js 💻

1️⃣ Navigate to the Node.js backend directory 📂:
   ```bash
   cd backend-nodejs
   ```
2️⃣ Install dependencies 📦:
   ```bash
   npm install
   ```
3️⃣ Start the server ⚡:
   ```bash
   npm run dev
   ```
4️⃣ Rename `.env-example` to `.env` and add environment variables 📋.

### Frontend - Svelte 🖼️

1️⃣ Navigate to the frontend directory 📂:
   ```bash
   cd frontend
   ```
2️⃣ Install dependencies 📦:
   ```bash
   npm install
   ```
3️⃣ Start the server 🚀:
   ```bash
   npm run dev -- --open
   ```
4️⃣ Rename `.env-example` to `.env` and add environment variables 📋.

---

## 🚀 Future Enhancements

The current functionality 🎯 covers job posting summarization 📄 and resume generation ✨. Future plans include:

1️⃣ **Admin Dashboard:** Tools 🛠️ for managing user data 📂 and monitoring system performance 📊.
2️⃣ **Job Posting Search API:** Integration with job boards 🌐.
3️⃣ **Advanced Resume Customization:** Multiple CV templates 📄.
4️⃣ **Localization:** Multi-language support 🗺️.

---

📈 This project simplifies job hunting 🔍 and showcases AI’s potential 🤖. I’m excited 🎉 to expand its capabilities 💪 to serve users better in their career pursuits 🚀.
