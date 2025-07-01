async function sendMessage(text) {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error('Ошибка:', error);
        return 'Произошла ошибка';
    }
}

