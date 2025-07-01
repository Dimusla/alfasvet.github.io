// Получаем элементы DOM
const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Функция отправки сообщения
async function sendMessage(text) {
    try {
        // Здесь будет код для работы с API
        const response = await fetch('https://gigachat.api.sbercloud.ru/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'YTE0YjA3ZGItNmI5Ni00MjlhLTljZmQtNjFkZGJjMTQ3MzdhOjZmNWQwMDc3LTQ0ODgtNDA0NC04YTI0LTg1OWQ4MjZkNGFmYw==',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [{
                    role: 'user',
                    content: text
                }]
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
    messagesContainer.innerHTML += `<div class="user-message">${userMessage}</div>`;
    
    try {
