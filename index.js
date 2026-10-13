require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const Chat = require("./Models/chat.js");

const app = express();

// App configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "Public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Show all chats
app.get("/chats", async (req, res) => {
    const chats = await Chat.find().sort({ created_at: -1 });
    res.render("index", { chats });
});

// New chat form
app.get("/chat/new", (req, res) => {
    res.render("new");
});

// Create a chat
app.post("/chat", async (req, res) => {
    const { from, to, msg } = req.body;

    await Chat.create({
        from,
        to,
        msg,
        created_at: new Date()
    });

    res.redirect("/chats");
});

// Edit form
app.get("/chat/:id/edit", async (req, res) => {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
        return res.status(404).send("Chat not found");
    }

    res.render("edit", { chat });
});

// Update a chat
app.put("/chat/:id", async (req, res) => {
    const chat = await Chat.findByIdAndUpdate(
        req.params.id,
        { msg: req.body.msg },
        { new: true, runValidators: true }
    );

    if (!chat) {
        return res.status(404).send("Chat not found");
    }

    res.redirect("/chats");
});

// Delete a chat
app.delete("/chat/:id", async (req, res) => {
    const chat = await Chat.findByIdAndDelete(req.params.id);

    if (!chat) {
        return res.status(404).send("Chat not found");
    }

    res.redirect("/chats");
});

// Home page
app.get("/", (req, res) => {
    res.redirect("/chats");
});

// Handle application errors
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong. Please try again.");
});

// Connect to MongoDB before starting the server
async function startServer() {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        console.error("MONGODB_URI is missing from .env");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");

        const port = process.env.PORT || 8080;

        app.listen(port, () => {
            console.log(`MANGO3 running on port ${port}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

startServer();