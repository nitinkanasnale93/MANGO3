# MANGO3 — Chat Management Web Application

A simple chat management web application built using **Node.js, Express.js, MongoDB, and EJS**. MANGO3 allows users to create, view, edit, and delete chat messages through a web interface.

## Live Demo

**[View MANGO3 Live](https://mango-3.vercel.app)**

## GitHub Repository

**[View Source Code](https://github.com/nitinkanasnale93/MANGO3)**

## Features

- **View Chats:** Display saved chat messages.
- **Create Chats:** Add a new chat with sender, receiver, and message details.
- **Edit Chats:** Update existing chat messages.
- **Delete Chats:** Remove chats from the database.
- **Database Integration:** Store chat records in MongoDB.
- **Server-Side Rendering:** Render dynamic pages using EJS templates.
- **Responsive Interface:** Access the application through a web browser.

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend web framework |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |
| EJS | Server-side templating |
| HTML & CSS | User interface |
| Method-Override | Support PUT and DELETE form requests |
| dotenv | Environment variable management |
| Vercel | Deployment |

## Project Structure

```text
MANGO3/
├── Models/
│   └── chat.js
├── Public/
│   └── style.css
├── views/
│   ├── index.ejs
│   ├── new.ejs
│   └── edit.ejs
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## Getting Started

Follow these steps to run MANGO3 locally.

### 1. Clone the Repository

```bash
git clone https://github.com/nitinkanasnale93/MANGO3.git
```

### 2. Navigate to the Project Folder

```bash
cd MANGO3
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root directory and add your MongoDB Atlas connection string.

```env
MONGODB_URI=your_mongodb_connection_string
```

Replace the placeholder with your own connection string. Ensure that your MongoDB database user has the required permissions and your network access settings allow the connection.

**Security:** Never commit your `.env` file, database password, or other secrets to GitHub.

### 5. Start the Application

```bash
npm start
```

Once connected, the application starts on the configured port. By default, it uses port `8080`.

Open the application in your browser:

```text
http://localhost:8080
```

## Application Routes

| Method | Route | Description |
|---|---|---|
| GET | `/` | Redirect to the chats page |
| GET | `/chats` | View all chats |
| GET | `/chat/new` | Open the new-chat form |
| POST | `/chat` | Create a chat |
| GET | `/chat/:id/edit` | Open the edit form |
| PUT | `/chat/:id` | Update a chat message |
| DELETE | `/chat/:id` | Delete a chat |

## Database Model

Each chat record contains the following fields:

- `from` — Sender name
- `to` — Receiver name
- `msg` — Chat message
- `created_at` — Date and time of creation

MongoDB stores the chat records, while Mongoose defines the schema and manages database operations.

## What I Learned

Building MANGO3 helped me practise:

- Developing backend applications with Node.js and Express.js.
- Implementing CRUD operations.
- Connecting an Express application to MongoDB Atlas using Mongoose.
- Rendering dynamic HTML pages with EJS.
- Handling form submissions and HTTP methods.
- Managing environment variables and deploying a Node.js application.

## Future Improvements

- Add user authentication and authorization.
- Introduce chat search and filtering.
- Add real-time messaging using Socket.IO.
- Improve input validation and error handling.
- Add pagination for larger chat collections.

## Author

**Nitin Kanasnale**

- GitHub: [@nitinkanasnale93](https://github.com/nitinkanasnale93)

---

*Built as a learning project to practise backend development, database integration, and full-stack web application fundamentals.*
