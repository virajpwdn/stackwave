<h1>🌊 StackWave - Live Developer Q&A Hub</h1>
<div align="center"> <p><strong>StackWave</strong> is a full-stack Q&A platform inspired by Stack Overflow, built using the <strong>MERN stack</strong>.</p> <p> <a href="https://stackwave.vercel.app"><strong>Live Demo</strong></a> • <a href="#features">Features</a> • <a href="#tech-stack">Tech Stack</a> • <a href="#getting-started">Getting Started</a> • <a href="#deployment">Deployment</a> </p> </div>

💡 Problem Statement
In my initial days of coding, I found myself constantly switching tabs between Stack Overflow, ChatGPT, VS Code, and multiple sources to understand code. I wondered, "Why isn't there one platform where I can get all my doubts solved in one place?" At the time, I found none.

Initially, I did nothing. But one day, I noticed other fellow developers doing the exact same thing — jumping between tools and websites just to debug or understand concepts. That's when it struck me: we need a unified space.

So I built StackWave — a platform where developers can:

* Ask and answer questions like Stack Overflow
* Ask live questions and collaborate in real time
* Chat with other developers instantly
* Get help from AI, which can refactor code and provide suggestions when no active members are available

🚀 Features

* 🧵 Real-Time Code Collabrations using Web Socket
* 🔐 User Authentication (Sign Up / Login / JWT-based)
* ❓ Ask & Answer Developer Questions
* 💬 Nested Comment System
* 👍👎 Voting System for Questions & Answers
* 🧵 Real-Time Chat using Socket.IO
* ⚙️ Modular RESTful Backend with Mongoose Validation
* 🌐 Responsive UI with TailwindCSS
* ❌ Custom Error Pages

🖥️ Tech Stack
**Frontend:**

* Vite + React
* Redux Toolkit
* TailwindCSS
* Axios
* React Router DOM

**Backend:**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT for Auth
* Socket.IO (Chat)
* Centralized Error Handling & Consistent Response


📸 Preview

<div align="center"> <img src="https://drive.google.com/file/d/1twTKS9LTYE4MOwX8v-Ce3yDf3KLDI5ub/view?usp=sharing" alt="StackWave Preview" /> </div>

📊 Architecture

```
stackwave/
├── client/                # Frontend React application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── assets/        # Images, fonts, etc.
│   │   ├── components/    # Reusable React components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Application pages/routes
│   │   ├── redux/         # Redux state management
│   │   ├── services/      # API service layers
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main application component
│   │   └── main.jsx       # Entry point
│   ├── .env               # Environment variables
│   └── package.json       # Dependencies and scripts
└── server/                # Backend Node.js/Express
    ├── config/            # Configuration files
    ├── controllers/       # Request handlers
    ├── middleware/        # Custom middleware
    ├── models/            # Mongoose database models
    ├── routes/            # API routes
    ├── utils/             # Utility functions
    ├── .env               # Environment variables
    ├── server.js           # Entry point
    └── package.json       # Dependencies and scripts
```

🌐 Deployment
✅ Live URL

* Frontend: [https://stackwave.vercel.app](https://stackwave-frontend-ejbk.onrender.com)
* Backend: Hosted on Render

💡 Note: Due to AWS costs, we've currently hosted StackWave's frontend on Vercel for free. A copy is still available on EC2 for testing but may not stay active long-term.

🟡 Optional EC2 Deployment
If you'd like to deploy StackWave on an EC2 instance:

1. SSH into your EC2 instance.
2. Clone this repo.
3. Setup .env files.
4. Install Node.js, Nginx, and PM2.
5. Run:

```bash
pm2 start server/index.js
cd client && npm run build
sudo cp -r dist/* /var/www/html
```

⚙️ Getting Started
**Prerequisites**

* Node.js (v20+)
* MongoDB Atlas account or local MongoDB installation
* Git

**Installation**

1. Clone the repository

```bash
git clone https://github.com/your-username/stackwave.git
cd stackwave
```

2. Install dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
   Create .env files in both client and server directories:

**/server/.env**

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

**/client/.env**

```
VITE_BACKEND_URL=http://localhost:5000
```

4. Run the application

```bash
# Run server (from server directory)
npm run dev

# Run client (from client directory)
npm run dev
```

The application will be available at:

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:3000](http://localhost:3000)


🤝 Contributing
Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For major changes, please open an issue first to discuss what you would like to change.


🙏 Credits

* Inspired by Stack Overflow
* Built using open-source tools and APIs

⚠️ Disclaimer
This project is built for educational and portfolio purposes only. No copyrighted material from Stack Overflow is used.
