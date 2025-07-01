const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 5000;

// Ваш токен хранится в переменных окружения
const API_KEY = process.env.GIGACHAT_API_KEY;

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
        const { text } = req.body;
        
        const response = await fetch('https://gigachat.api.sbercloud.ru/v1/chat/completations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${YTE0YjA3ZGItNmI5Ni00MjlhLTljZmQtNjFkZGJjMTQ3MzdhOjZmNWQwMDc3LTQ0ODgtNDA0NC04YTI0LTg1OWQ4MjZkNGFmYw==}`,
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
        res.json({ message: data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: 'Произошла ошибка' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
