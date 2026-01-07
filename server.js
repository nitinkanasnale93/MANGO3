const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const Chat = require("./Models/chat.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "Public")));

async function main() {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/whatsapp"
  );
}




main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log(err);
  });

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();   // ✔ this is correct place
  res.render("index", { chats });
});



app.get("/chat/new", (req, res) => {
  res.render("new");
});

app.post("/chat", async (req, res) => {
  let { from, to, msg } = req.body;

  let newChat = new Chat({
    from,
    to,
    msg,
    created_at: new Date(),
  });

  await newChat.save();

  res.redirect("/chats");
});

app.get("/chat/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit", { chat });
});

app.put("/chat/:id", async (req, res) => {
  let { id } = req.params;
  let { msg } = req.body;

  await Chat.findByIdAndUpdate(id, { msg });

  res.redirect("/chats");
});

app.delete("/chat/:id", async (req, res) => {
  let { id } = req.params;

  await Chat.findByIdAndDelete(id);

  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
