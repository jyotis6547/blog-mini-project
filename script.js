document.addEventListener('DOMContentLoaded', function () {
    const blogForm = document.getElementById('blogForm');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const blogList = document.getElementById('blogList');

    displayBlogPosts();

    blogForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBlogPost();
    });

    function displayBlogPosts() {
        const posts = getBlogPostsFromLocalStorage();

        blogList.innerHTML = '';

        posts.forEach(function (post, index) {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button onclick="editBlogPost(${index})">Edit</button>
                <button onclick="deleteBlogPost(${index})">Delete</button>
            `;
            blogList.appendChild(postElement);
        });
    }

    function addBlogPost() {
        const title = titleInput.value;
        const content = contentInput.value;

        if (title && content) {
            const newPost = {
                title: title,
                content: content,
            };

            const posts = getBlogPostsFromLocalStorage();
            posts.push(newPost);

            localStorage.setItem('blogPosts', JSON.stringify(posts));

            displayBlogPosts();

            titleInput.value = '';
            contentInput.value = '';
        }
    }

    window.editBlogPost = function (index) {
        const posts = getBlogPostsFromLocalStorage();
        const postToEdit = posts[index];

        titleInput.value = postToEdit.title;
        contentInput.value = postToEdit.content;

        posts.splice(index, 1);

        localStorage.setItem('blogPosts', JSON.stringify(posts));

        displayBlogPosts();
    };

    window.deleteBlogPost = function (index) {
        const posts = getBlogPostsFromLocalStorage();

        posts.splice(index, 1);

        localStorage.setItem('blogPosts', JSON.stringify(posts));

        displayBlogPosts();
    };

    function getBlogPostsFromLocalStorage() {
        return JSON.parse(localStorage.getItem('blogPosts')) || [];
    }
});
