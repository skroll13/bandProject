//install express
const express = require(`express`);
const app = express();

//install socket.io
const socket = require('socket.io');

//identify the port
let port = 3000;

const router = require("./routes/albums");

//configure public folder
app.use(express.static(`public`)) //hold all of our static resources

//install ejs templates
app.set(`view engine`, `ejs`)

app.use(express.json()); //converts header payload string to js object
app.use(express.urlencoded({extended: true})) // req.body

//set up routes folder and connect routes here
app.use(require(`./routes/index`))
app.use(require(`./routes/albums`))
app.use(require(`./routes/form`))
app.use(require(`./routes/chat`))

//start a server
let server = app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
}) 

let io = socket(server);

//listening for client messages
io.on('connection', socket =>{
    socket.on('postMessage', msgClient=>{ //listening 
        console.log('we saw the message')
        io.emit('updateMessage', msgClient) //broadcasting
    })
    console.log('a client has connected');

    socket.on('disconnect', reason=>{
        console.log('a user has left the room');
        io.emit('updateMessage', 'a user has left the room')
    })
})

module.exports = router