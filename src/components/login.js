document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    const loadingElement = document.querySelector('.loading');

    messageElement.innerText = '';
    loadingElement.style.display = 'block';

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        loadingElement.style.display = 'none';
        return response.json();
    })
    .then(data => {
        if (data.success) {
            window.location.href = '/dashboard'; // Change to your success path
        } else {
            messageElement.innerText = data.message || 'Login failed. Please try again.';
        }
    })
    .catch(error => {
        loadingElement.style.display = 'none';
        console.error('Error:', error);
        messageElement.innerText = 'An error occurred. Please try again later.';
    });
});
