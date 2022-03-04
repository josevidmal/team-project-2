// FUNCTION ALLOWS USER WITH ADMIN ROLE TO CREATE A NEW TRIP
// TODO: REMOVE THIS CONSOLE.LOGS WHEN OK
console.log('\n');
console.log ('Running script from: public/js/newTrip.js');
console.log('\n');

const newTripHandler = async (event) => {
    event.preventDefault();

    const trip_name = document.getElementById('trip_name').value.trim();
    const destination = document.getElementById('trip_destination').value.trim();
    const trip_hours = document.getElementById('est_time').value.trim();
    const trip_days = document.getElementById('est_days').value.trim();
    const trip_kms = document.getElementById('est_kms').value.trim();
    const toll_cost = document.getElementById('tolls').value.trim();
    const fuel_cost = document.getElementById('fuel_cost').value.trim();
    const food_cost = document.getElementById('food_cost').value.trim();
    const hotel_cost = document.getElementById('hotel_cost').value.trim();
    const difficulty_level = document.getElementById('difficulty').value.trim();
    const trip_date = document.getElementById('trip_date').value.trim();
    const trip_image = document.querySelector('#uploadImage').files[0];

    // TODO: REMOVE CONSOLELOG WHEN OK
    console.log('\n');
    console.log('Data from trip_image is: ', trip_image);
    console.log('\n');

    if (trip_name && destination && trip_hours && trip_days && trip_kms && toll_cost && fuel_cost && food_cost && difficulty_level && trip_date && hotel_cost) {
        const response = await fetch('/api/newTrip/', {
            method: 'POST',
            body: JSON.stringify({ trip_name, destination, trip_hours, trip_days, trip_kms, toll_cost, fuel_cost, food_cost, hotel_cost, difficulty_level, trip_date }),
            file: trip_image,
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // TODO: REMOVE THIS COMMENT FOR PROPER FUNCTIONALITY WHEN OK
            // document.location.replace('/');
        } else {
            alert('Could not add new trip.');
        }
    }
};

document.querySelector('#new_trip').addEventListener('submit', newTripHandler);