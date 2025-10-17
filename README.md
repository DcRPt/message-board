# Mini Message Board

A simple message board web application built with Node.js, Express, and EJS with persistent storage using Vercel KV.

## Live Demo

https://message-board-lyart-pi.vercel.app/

## About

This project is a message board where users can post and view messages. Messages are stored persistently using Vercel KV (Redis), ensuring they remain available across server restarts and deployments.

## Features

- Post new messages with your name
- View all messages on the homepage
- Click on any message to see full details
- Delete individual messages
- Clear all messages at once
- Persistent storage with Vercel KV
- Fully responsive modern design
- Smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js (version 18.0.0 or higher)
- npm (comes with Node.js)
- A Vercel account (for deployment and KV storage)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DcRPt/message-board.git
cd message-board
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

**Note:** For local development without Vercel KV, the app will still run but messages won't persist. To test with persistence locally, see the Deployment section below.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Import your repository in Vercel

3. Set up Vercel KV storage:
   - Go to your project dashboard in Vercel
   - Navigate to the **Storage** tab
   - Click **Create Database**
   - Select **KV (Redis)**
   - Choose a name and region
   - Click **Create**

4. Vercel will automatically deploy your application with the KV storage connected

## Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web application framework
- [EJS](https://ejs.co/) - Templating engine
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv) - Redis-based key-value storage
- CSS3 - Modern styling with animations

## How It Works

- **Homepage** (`/`) - Displays all messages in a card grid layout
- **New Message** (`/new`) - Form to create a new message
- **Message Details** (`/message/:id`) - View full message with timestamp
- **Delete Message** (`POST /message/:id/delete`) - Remove a specific message
- **Clear All** (`POST /clear`) - Remove all messages

Messages are stored in Vercel KV (Redis), providing fast and reliable persistence across deployments.

## Technical Implementation

Key concepts demonstrated in this project:

- Setting up Express.js applications
- Working with EJS templating
- Handling GET and POST routes
- Processing form data with `express.urlencoded()`
- Using route parameters (`:id`)
- Implementing responsive CSS design
- Integrating Vercel KV for data persistence
- Working with asynchronous JavaScript (async/await)
