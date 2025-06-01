const johnSelectorBtn = document.querySelector('#john-selector');
const janeSelectorBtn = document.querySelector('#jane-selector');
const chatHeader = document.querySelector('.chat.header');
const chatMessagesContainer = document.querySelector('.chat.message');
const chatInput = document.querySelector('.chat-input');
const chatForm = document.querySelector('.chat-form');
const clearChatBtn = document.querySelector('.button.clear.chat');

let currentUser = 'john';

// Function to create a chat message element as HTML string
const chatMessageElement = (message) => {
  return `
    <div class="message ${message.sender === 'john' ? 'blue' : 'grey'}">
      <div class="message sender">${message.sender}</div>
      <div class="message text">${message.text}</div>
      <div class="message-timestamp">${message.timestamp}</div>
    </div>
  `;
};

// Function to update chat header based on current user
const updateChatHeader = () => {
  chatHeader.textContent = `${currentUser.charAt(0).toUpperCase() + currentUser.slice(1)} chatting....`;
  chatInput.placeholder = `Type here, ${currentUser.charAt(0).toUpperCase() + currentUser.slice(1)}...`;
  if (currentUser === 'john') {
    chatHeader.classList.add('bright-text');
  } else {
    chatHeader.classList.remove('bright-text');
  }
};

// Function to clear chat messages
const clearChatMessages = () => {
  chatMessagesContainer.innerHTML = '';
};

// Event listeners for person selector buttons
johnSelectorBtn.addEventListener('click', () => {
  currentUser = 'john';
  updateChatHeader();
  johnSelectorBtn.classList.add('active-person');
  janeSelectorBtn.classList.remove('active-person');
  clearChatMessages();
});

janeSelectorBtn.addEventListener('click', () => {
  currentUser = 'jane';
  updateChatHeader();
  janeSelectorBtn.classList.add('active-person');
  johnSelectorBtn.classList.remove('active-person');
  clearChatMessages();
});

// Event listener for chat form submission
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const messageText = chatInput.value.trim();
  if (messageText === '') return;

  const now = new Date();
  const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const message = {
    sender: currentUser,
    text: messageText,
    timestamp: timestamp,
  };

  // Append new message to chat container
  chatMessagesContainer.innerHTML += chatMessageElement(message);
  chatInput.value = '';
  chatInput.focus();
});

// Event listener for clear chat button
clearChatBtn.addEventListener('click', () => {
  clearChatMessages();
});

// Initialize chat header on page load
updateChatHeader();
