"use strict";
document.getElementById('login')?.addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('http://localhost:4000/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (data.success) {
            localStorage.setItem('token', data.token);
            window.location.href = '/home.html';
        }
        else {
            alert(data.message);
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred while logging in. Please try again.');
    }
});
