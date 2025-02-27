const submit = document.getElementById('submit') as HTMLBodyElement;

document.getElementById('login')?.addEventListener('submit', async function(event){
    event.preventDefault();

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    try {
        const response = await fetch('http://localhost:3000/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json,'
            },
            body: JSON.stringify({username, password})
        });
        
    } catch (error) {
        
    }

})