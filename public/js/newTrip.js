const newTripHandler = async (event) => {
    event.preventDefault();

    // const email = document.querySelector('#email-signup').value.trim();
    const trip_name = document.getElementById('#trip_name');
    const destination = document.getElementById('#trip_destination');
    const trip_hours = document.getElementById('#est_time');
    const trip_days = document.getElementById('#est_days');
    const trip_kms = document.getElementById('#est_kms');
    const toll_cost = document.getElementById('#tolls');
    const fuel_cost = documen.getElementById('#fuel_cost');
    const food_cost = document.getElementById('#food_cost');
    const hotel_cost = document.getElementById('#hotel_cost');
    const difficulty_level = document.getElementById('#difficulty');
    const trip_date = document.getElementById('#trip_date');


    // if (email && password && first_name && last_name && nick_name && date_of_birth && mobile_phone && HUG_id) {
    //     const response = await fetch('/api/users/signup', {
    //         method: 'POST',
    //         body: JSON.stringify({ email, password, first_name, last_name, nick_name, date_of_birth, mobile_phone, HUG_id }),
    //         headers: { 'Content-Type': 'application/json' },
    //     });

    //     if (response.ok) {
    //         document.location.replace('/profile');
    //     } else {
    //         alert('Could not sign up.');
    //     }
    // }
};

document.querySelector('#submitBtn').addEventListener('submit', newTripHandler);