import express from "express";
import { createServer } from "node:http";
import {Server} from "socket.io";
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/',(req,res)=>{
    res.sendFile(join(__dirname,'index.html'));
});

io.on('connection',(socket)=>{
    console.log("a user connected");
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    })
    socket.on('chat message',(msg)=>{
        console.log('message: ' + msg);
        io.emit('chat message',msg);
    });
});

server.listen(8000,()=>{
    console.log("App is listening on PORT 3000");
})