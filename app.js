document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('/posts');
    const posts = await response.json();
    
    const postsContainer = document.getElementById('posts');
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = <h3>${post.title}</h3><p>${post.content}</p>;
        postsContainer.appendChild(postElement);
    });
});

document.getElementById('postForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
    });

    const newPost = await response.json();
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = <h3>${newPost.title}</h3><p>${newPost.content}</p>;

    document.getElementById('posts').appendChild(postElement);

    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
});