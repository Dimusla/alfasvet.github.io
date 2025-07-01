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
                'Authorization': `Bearer ${getApiToken()}`,
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

// Функция получения токена (пример реализации)
function getApiToken() {
    // Здесь должна быть логика получения токена
    // Например, из локального хранилища или через прокси
    return localStorage.getItem('apiToken') || '';
}

// Обработчик отправки
sendBtn.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    
    if (!userMessage) return;
    
    // Добавляем сообщение пользователя
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('
