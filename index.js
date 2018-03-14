const port = process.env.PORT || 10002;
const server = require("http").Server();

var io = require("socket.io")(server);
io.origins('*:*');

var questions = [];
var answers = [];

io.on("connection", function(socket){
   console.log("user has connected"); 
    
    socket.on("letters", function(data){
        console.log("the question: "+data);
        questions.push(data);
        
      io.emit("questions", questions);
    });
    
    socket.on("response", function(data){
        console.log("the answer: ", data);
        answers.push(data);
        
        io.emit("answers", answers);
    })
    
    socket.on("disconnect", function(){
        console.log("user has disconnected");
    });
});

server.listen(port, (err)=>{
    if(err){
        console.log("err: "+err);
        return false;
    }
    
    console.log("socket port is running!");
})