const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const first_name = document.querySelector('#first_name').value.trim();
    const last_name = document.querySelector('#last_name').value.trim();
    const nick_name = document.querySelector('#nickname').value.trim();
    const date_of_birth = document.querySelector('#dob').value.trim();
    const mobile_phone = document.querySelector('#mobile_phone').value.trim();
    const HUG_id = document.querySelector('#hog_id').value.trim();

    if (email && password && first_name && last_name && nick_name && date_of_birth && mobile_phone && HUG_id) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, first_name, last_name, nick_name, date_of_birth, mobile_phone, HUG_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Could not sign up.');
        }
    }
};

document.querySelector('#user-signup').addEventListener('submit', signupFormHandler);