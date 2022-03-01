const signupFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const firstName = document.querySelector('#first_name').value.trim();
    const lastName = document.querySelector('#last_name').value.trim();
    const nickName = document.querySelector('#nickname').value.trim();
    const dateOfBirth = document.querySelector('#dob').value.trim();
    const mobilePhone = document.querySelector('#mobile_phone').value.trim();
    const hogId = document.querySelector('#hog_id').value.trim();

    if (email && password && firstName && lastName && nickName && dateOfBirth && mobilePhone && hogId) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, firstName, lastName, nickName, dateOfBirth, mobilePhone, hogId }),
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