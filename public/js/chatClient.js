const socket = io(); //access to web socket api

// emit a message to the server
let chatUserName = document.getElementById('chat-username'); 
let chatMessage = document.getElementById('chat-message');
let chatForm = document.querySelector('form');
let chatDisplay = document.querySelector('.chat-display')

socket.on('updateMessage', data =>{
    console.log('update message has been called')
    console.log(data);

    //create a p tag
    let newMessage = document.createElement('p')
    //style p tag
    if(chatUserName.value == data.username){
        newMessage.className = "bg-success chat-text"
    }
    else{
        newMessage.className = "bg-info text-warning chat-text"
    }
     //set inner html for the p tag
     newMessage.innerHTML = `<strong>${data.username}</strong>: ${data.message}`
     //append the latest message to the top of the display
      chatDisplay.insertBefore(newMessage, chatDisplay.firstChild)
     //to clear the message bar once submit the message
    chatMessage.value= ""

})

//emit a message to the server
chatForm.addEventListener('submit', e=>{
    console.log('form submitted')
    e.preventDefault();

    //send message to server
    socket.emit('postMessage', {
        username: chatUserName.value,
        message: chatMessage.value

    })
})