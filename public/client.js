const socket = io()
let name;
let textarea=document.querySelector('#textarea')
let messageArea=document.querySelector('.message__area')

do {
    name = prompt('Please Enter Name')
} while (!name) {

}

textarea.addEventListener('keyup',(e)=>{
if(e.key==='Enter'){
    sendMessage(e.target.value)
}
})

function sendMessage(message) {
    let msg={
        user:name,
        message:message.trim()
    }

    appnedMessage(msg,'outgoing')
 textarea.value=''
    scrollToBottom()



    socket.emit('message',msg)

}



function appnedMessage(msg,type){
let mainDiv=document.createElement('div')
let className=type
mainDiv.classList.add(className,'message')

let markup=`
<h4>${msg.user}</h4>
<p> ${msg.message}</p>
`
mainDiv.innerHTML=markup
messageArea.appendChild(mainDiv)
}

//receive messgae

socket.on('message',(msg)=>{
appnedMessage(msg,'incoming')
scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTo=messageArea.scrollHeight
}