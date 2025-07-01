// Получаем элементы DOM
const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Функция отправки сообщения
async function sendMessage(text) {
    try {
        const response = await fetch('https://gigachat.api.sbercloud.ru/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ВАШ_ТОКЕН',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: 'user',
                        content: text
                    }
                ]
            })
        });
        
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Ошибка:', error);
        return 'Произошла ошибка';
    }
}

// Обработчик отправки
sendBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    
    if (!userMessage) return;
    
    // Добавляем сообщение пользователя
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('user-message');
    userMessageElement.textContent = userMessage;
    messagesContainer.appendChild(userMessageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    try {
        const botResponse = await sendMessage(userMessage);
        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('bot-message');
        botMessageElement.textContent = botResponse;
        messagesContainer.appendChild(botMessageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (error) {
        const errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.textContent = 'Произошла ошибка при получении ответа';
        messagesContainer.appendChild(errorElement);
    }
    
    userInput.value = '';
});
