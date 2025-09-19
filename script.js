const rides = [
  { from: "Mumbai", to: "Pune", date: "2025-09-20", driver: "Amit", seats: 3 },
  { from: "Delhi", to: "Agra", date: "2025-09-21", driver: "Priya", seats: 2 },
  { from: "Bangalore", to: "Chennai", date: "2025-09-20", driver: "Salma", seats: 4 }
];

document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const from = document.getElementById('from').value.toLowerCase();
  const to = document.getElementById('to').value.toLowerCase();
  const date = document.getElementById('date').value;
  const results = rides.filter(ride =>
    ride.from.toLowerCase().includes(from) &&
    ride.to.toLowerCase().includes(to) &&
    ride.date === date
  );
  displayRides(results);
});

function displayRides(ridesArr) {
  const rideList = document.getElementById('ride-list');
  rideList.innerHTML = '';
  if (ridesArr.length === 0) {
    rideList.innerHTML = '<p>No rides found for your search.</p>';
    return;
  }
  ridesArr.forEach((ride, i) => {
    const div = document.createElement('div');
    div.className = 'ride-card';
    div.innerHTML = `
      <div><strong>${ride.from}</strong> → <strong>${ride.to}</strong></div>
      <div>Date: <b>${ride.date}</b></div>
      <div>Driver: ${ride.driver}</div>
      <div>Seats Available: ${ride.seats}</div>
      <button class="book-btn" data-index="${i}">Book Now</button>
    `;
    rideList.appendChild(div);
  });
  // Add event listeners to all Book Now buttons
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      openBookingModal(btn.getAttribute('data-index'));
    });
  });
}

// Booking modal logic
const modal = document.getElementById('booking-modal');
const closeModalBtn = document.getElementById('close-modal');
closeModalBtn.onclick = function() {
  modal.style.display = "none";
  document.getElementById('booking-form').style.display = "block";
  document.getElementById('booking-confirmation').style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById('booking-form').style.display = "block";
    document.getElementById('booking-confirmation').style.display = "none";
  }
}

function openBookingModal(rideIndex) {
  modal.style.display = "block";
  document.getElementById('book-ride-index').value = rideIndex;
  document.getElementById('booking-form').reset();
  document.getElementById('booking-form').style.display = "block";
  document.getElementById('booking-confirmation').style.display = "none";
}

document.getElementById('booking-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const index = parseInt(document.getElementById('book-ride-index').value);
  const name = document.getElementById('user-name').value;
  const mobile = document.getElementById('user-mobile').value;
  const seats = parseInt(document.getElementById('user-seats').value);
  if (seats < 1 || seats > rides[index].seats) {
    alert("Invalid seat number. Seats available: " + rides[index].seats);
    return;
  }
  // Save booking to localStorage
  const booking = {
    ride: rides[index],
    name,
    mobile,
    seats,
    time: new Date().toLocaleString()
  };
  let bookings = JSON.parse(localStorage.getItem('cabBookings') || '[]');
  bookings.push(booking);
  localStorage.setItem('cabBookings', JSON.stringify(bookings));
  // Update ride seats
  rides[index].seats -= seats;
  // Confirmation
  document.getElementById('booking-form').style.display = "none";
  document.getElementById('booking-confirmation').style.display = "block";
  document.getElementById('booking-confirmation').innerHTML =
    `<b>Booking Confirmed!</b><br>Your ride from <strong>${booking.ride.from}</strong> to <strong>${booking.ride.to}</strong> on <b>${booking.ride.date}</b>.<br>
    Name: ${name}, Mobile: ${mobile}<br>Seats Booked: ${seats}<br>Thank you!`;
  displayRides([rides[index]]);
});

// Show all rides on page load
displayRides(rides);
