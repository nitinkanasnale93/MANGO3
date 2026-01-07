const express = require('express');
const app = express();
const moongose = require('mongoose');
const path = require('path');
const Chat = require('./Models/chat.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.urlencoded({ extended: true }));

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => 
    console.log(err)
); 

async function main() {
    await moongose.connect('mongodb://Nitin:Nitin%409353@127.0.0.1:27017/whatsapp?authSource=admin');
}

//index route
app.get("/chats", async (req, res) => {
    let chats = await chat.find();
    console.log(chats);
    res.render("index.ejs", { chats });
});

app.get("/chat/new", (req, res) => {
    res.render("new.ejs");

});

app.post("/chat/new",  (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new chat({ 
        from: from,
        to: to,
        msg: msg,
        created_at: new Date() 
    });
    newChat.save().then((res) => {
        console.log("Chat saved")
    }).catch((err) => {
        console.log(err);
    });

    res.redirect("/chats");
});

let chat1 = new Chat({
    from: 'Nitin',
    to: 'Vishalu',
    msg: 'Hello Vishalu!',
    created_at: new Date(),
});

//Edit route
app.get("/chat/:id/edit", async (req, res) => {
    let { id } = req.params;

    let chat = await Chat.findById(id);

    res.render("edit", { chat });
});




chat1.save().then((res) => {
    console.log(res);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});