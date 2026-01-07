const moongose = require('mongoose');
const chat = require('./Models/chat.js');


main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => 
    console.log(err)
);

async function main() {
    await moongose.connect('mongodb://Nitin:Nitin%409353@127.0.0.1:27017/whatsapp?authSource=admin');
}

let allchats =[
    {
    from: 'Nitin',
    to: 'Vishalu',
    msg: 'Hello Vishalu!',
    created_at: new Date(),
},
{
    from: 'Kannika',
    to: 'Bestie',
    msg: 'Hey Kathe!',
    created_at: new Date(),
},
{
    from: 'Vishwa',
    to: 'Shiva',
    msg: 'What\'s up bro?',
    created_at: new Date(),

},
{
    from: 'Revathi',
    to: 'Buddies',
    msg: 'Let\'s catch up soon!',
    created_at: new Date(),
}

];

chat.insertMany(allchats);

