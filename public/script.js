document.addEventListener('DOMContentLoaded', () => {
    const postBtn = document.getElementById('send-btn');
    const postInput = document.getElementById('post-input');
    const feed = document.getElementById('feed');

    // 1. Функция загрузки постов с сервера
    async function loadPosts() {
        const res = await fetch('/api/posts');
        const posts = await res.json();
        feed.innerHTML = ''; // Очищаем старое
        posts.forEach(post => {
            const div = document.createElement('div');
            div.className = 'post glass-container';
            div.innerHTML = `<p>${post.text}</p><small>${new Date(post.date).toLocaleTimeString()}</small>`;
            feed.appendChild(div);
        });
    }

    // 2. Обработка нажатия кнопки
    postBtn.onclick = async () => {
        const text = postInput.value;
        if (!text) return alert('Напиши хоть что-нибудь!');

        await fetch('/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        postInput.value = ''; // Чистим поле
        loadPosts(); // Обновляем ленту
    };

    loadPosts(); // Грузим посты при открытии сайта
});