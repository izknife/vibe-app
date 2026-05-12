const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Подключаемся к базе (используем твой URI из настроек Render)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ База Vibe подключена'))
    .catch(err => console.log('❌ Ошибка базы:', err));

// Схема сообщения (текст и дата)
const Post = mongoose.model('Post', {
    text: String,
    date: { type: Date, default: Date.now }
});

// Роут: Получить все посты
app.get('/api/posts', async (req, res) => {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
});

// Роут: Создать новый пост
app.post('/api/posts', async (req, res) => {
    if (req.body.text) {
        const newPost = new Post({ text: req.body.text });
        await newPost.save();
        res.json(newPost);
    } else {
        res.status(400).send('Текст пустой');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Сервер Vibe на порту ${PORT}`));