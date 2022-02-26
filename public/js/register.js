const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector(/* add class or id */).value.trim();
    const password = document.querySelector(/* add class or id */).value.trim();

    if (email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Could not sign up.');
        }
    }
};


document.querySelector(/* add class or id */).value.trim();