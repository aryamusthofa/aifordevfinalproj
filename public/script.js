const chatBox = document.getElementById('chat-box');
const userInputWrapper = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Format the text output by replacing backticks with code blocks and making robust formatting
function formatBoldText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
               .replace(/\n/g, '<br>');
}

// Conversation state representing the chat history
let conversationHistory = [];

function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('message-content');
    contentDiv.innerHTML = formatBoldText(text);
    
    messageDiv.appendChild(contentDiv);
    chatBox.appendChild(messageDiv);
    
    // Smooth scroll to bottom
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: 'smooth'
    });
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typing-indicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.classList.add('typing-dot');
        typingDiv.appendChild(dot);
    }
    
    chatBox.appendChild(typingDiv);
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: 'smooth'
    });
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function sendMessage() {
    const text = userInputWrapper.value.trim();
    if (!text) return;

    // Append to UI
    appendMessage('user', text);
    userInputWrapper.value = '';
    sendButton.disabled = true;
    
    // Add to history
    conversationHistory.push({
        role: "user",
        parts: [{ text: text }]
    });

    showTypingIndicator();

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ conversation: conversationHistory })
        });
        
        removeTypingIndicator();
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.result) {
            appendMessage('bot', data.result);
            // Append bot response to history
            conversationHistory.push({
                role: "model",
                parts: [{ text: data.result }]
            });
        } else {
            appendMessage('bot', 'Maaf, saya tidak dapat memproses permintaan tersebut saat ini.');
        }

    } catch (error) {
        removeTypingIndicator();
        console.error('Error fetching chat response:', error);
        appendMessage('bot', 'Aduh, terjadi kesalahan pada koneksi server. Silakan coba lagi nanti.');
    }
}

// Event Listeners
sendButton.addEventListener('click', sendMessage);

userInputWrapper.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

userInputWrapper.addEventListener('input', () => {
    sendButton.disabled = userInputWrapper.value.trim().length === 0;
});
