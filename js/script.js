

function closechat() {
    document.body.classList.toggle("show-chatbot")
}

function openchat() {
    document.body.classList.remove("show-chatbot")
}

var chatsList3 = []
var message = {
    isBot:false,
    message:"",
    sentTime:""
}
var chat = {
    id:1,
    username:"",
    messages:[]

}
var htmlListConvs = document.getElementById("conversations")


localStorage.setItem("conversation",JSON.stringify(chatsList3))
JSON.parse(localStorage.getItem("conversation"))

// Function to save conversation state to local storage
function saveConversationState() {
    let chatbox = document.querySelector(".chatbox");
    let conversationState = chatbox.innerHTML;
    localStorage.setItem("conversationState", conversationState);
}

// Function to load conversation state from local storage
function loadConversationState() {
    let conversationState = localStorage.getItem("conversationState");
    if (conversationState) {
        let chatbox = document.querySelector(".chatbox");
        chatbox.innerHTML = conversationState;
        loadPage(page)
    }
}



function callFunction() {
    // Get the user's message from the textarea
    let textarea = document.getElementById("inputText");
    let userMessage = textarea.value;

    // Create a new list item for the outgoing message
    let newOutgoingChat = document.createElement("li");
    newOutgoingChat.classList.add("chat", "outgoing");
    newOutgoingChat.innerHTML = `
        <p>${userMessage}</p>
    `;

    // Append the new outgoing chat to the chatbox
    let chatbox = document.querySelector(".chatbox");
    chatbox.appendChild(newOutgoingChat);

    // Clear the textarea after sending the message
    textarea.value = "";

    // Create a new list item for the incoming "Thinking..." message
    let newIncomingChat = document.createElement("li");
    newIncomingChat.classList.add("chat", "incoming");
    newIncomingChat.innerHTML = `
        <img src="/ChatBotProject/img/chatbot.png" alt="chatbot">
        <p>Thinking...</p>
    `;

    // Append the new incoming chat to the chatbox after a slight delay to simulate thinking
    setTimeout(() => {
        chatbox.appendChild(newIncomingChat);
        saveConversationState(); // Save the conversation state after each user message
    }, 1000); // Adjust the delay time as needed
}


function openChatWindow() {
    // Create a new list item for the outgoing message
    let newOutgoingChat = document.createElement("li");
    newOutgoingChat.classList.add("chat", "outgoing");
    newOutgoingChat.innerHTML = `
        <p></p>
    `;

    // Append the new outgoing chat to the chatbox
    let chatbox = document.querySelector(".chatbox");
    chatbox.appendChild(newOutgoingChat);

    // Set the chat window header
    let chatWindowHeader = document.querySelector(".chat-window h2");
    chatWindowHeader.innerText = "Chat Bot";

    // Set the input textarea value
    let textarea = document.getElementById("inputText");
    textarea.value = "";

    // Scroll to the bottom of the chatbox
    chatbox.scrollTop = chatbox.scrollHeight;

    // Load any saved conversation state
    loadConversationState();

    // Show the chatbot window
    document.body.classList.add("show-chatbot");
}

function searchFAQ() {
    var input, filter, faq, buttons, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    faq = document.getElementsByClassName("faq")[0];
    buttons = faq.getElementsByTagName("button");
    for (i = 0; i < buttons.length; i++) {
        txtValue = buttons[i].getAttribute("data-content");
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            buttons[i].style.display = "";
        } else {
            buttons[i].style.display = "none";
        }
    }
}

function loadPage(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("content").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", page, true);
    xhttp.send();
}