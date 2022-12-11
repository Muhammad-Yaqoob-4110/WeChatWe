// const socket = io('http://localhost:8000');
var socket = io('http://localhost:8000', { transports: ['websocket', 'polling', 'flashsocket'] });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

var audio = new Audio('whatsapp_sms_ring.mp3');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left')
    {
        audio.play();
    }
}
const userName = prompt("Enter Your name to join");
socket.emit('new-user-joined', userName);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})

function myFunction(str) 
{
    const arr = str.split(" ");

    //loop through each element of the array and capitalize the first letter.


    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }

    //Join all the elements of the array back into a string 
    //using a blankspace as a separator 
    const str2 = arr.join(" ");
    // console.log(str2);
    return str2;
}




socket.on('user-joined',name =>{
    append(`${myFunction(name)}: joined the chat`,'right')
});

socket.on('receive',data =>{
    append(`${myFunction(data.name)}: ${data.message}`,'left')
});

socket.on('left',name =>{
    append(`${myFunction(name)} left the chat`,'left')
});
