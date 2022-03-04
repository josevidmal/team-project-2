// FUNCTION ALLOWS USER TO ENROLL TO A TRIP
const enrollToTrip = async (event) => {
    event.preventDefault();

    const trip_id = document.location.href.split('/').pop();

    if (trip_id) {
        const response = await fetch ('/api/users/trips', {
            method: 'POST',
            body: JSON.stringify({ trip_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile/mytrips');
        } else {
            alert('You are already enrolled to this trip.');
        }
    }
};

document.querySelector('#enroll-btn').addEventListener('click', enrollToTrip);