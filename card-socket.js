const server = require("http").Server(); 
const port = process.env.PORT || 10000;

var io = require("socket.io")(server, { origins: '*:*'});

io.on("connection", function(socket){
    console.log("user has connected");
    
    socket.on("addCard", function(data){
        console.log("card was dealt" + data);
        io.emit("readerCards", data);
    })
    
    
    
    socket.on("disconnect", function(){
        console.log("User has disconnected");
    })
    
});

server.listen(port, (err)=>{
    if(err){
        console.log("error: " + err);
        return false;
    }
    console.log("Socket port is running");
});