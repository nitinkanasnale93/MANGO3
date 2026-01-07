const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

const Chat = require("./Models/chat.js");

const app = express();

// ===== Middleware =====
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "Public")));
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

// ===== MongoDB Connection WITH AUTH =====
async function main() {
  await mongoose.connect(
    "mongodb://Nitin:Nitin%409353@127.0.0.1:27017/whatsapp?authSource=admin"
  );
}

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log(err);
  });

// ===== Routes =====

// INDEX ROUTE
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index", { chats });
});

// NEW FORM
app.get("/chat/new", (req, res) => {
  res.render("new");
});

// CREATE NEW CHAT
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

// EDIT FORM
app.get("/chat/:id/edit", async (req, res) => {

  let { id } = req.params;

  let chat = await Chat.findById(id);

  res.render("edit", { chat });
});

// UPDATE CHAT
app.put("/chat/:id", async (req, res) => {

  let { id } = req.params;

  let { msg } = req.body;      // ✔ name matched

  await Chat.findByIdAndUpdate(
      id,
      { msg },
      { runValidators: true, new: true }   // ✔ options fixed
  );

  res.redirect("/chats");
});

// DELETE CHAT
app.delete("/chat/:id", async (req, res) => {

  let { id } = req.params;

  await Chat.findByIdAndDelete(id);   // ✔ fixed spelling

  res.redirect("/chats");
});

// HOME
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// ===== Server =====
app.listen(8080, () => {
  console.log("Server is running on 8080");
});
