function showBookings() {
  const bookings = JSON.parse(localStorage.getItem('cabBookings') || '[]');
  const adminDiv = document.getElementById('admin-bookings');
  if (!bookings.length) {
    adminDiv.innerHTML = "<p>No bookings yet.</p>";
    return;
  }
  adminDiv.innerHTML = '';
  bookings.forEach((b, i) => {
    const div = document.createElement('div');
    div.className = 'ride-card';
    div.innerHTML = `
      <div><strong>${b.ride.from}</strong> → <strong>${b.ride.to}</strong></div>
      <div>Date: <b>${b.ride.date}</b></div>
      <div>Driver: ${b.ride.driver}</div>
      <div>Seats Booked: ${b.seats}</div>
      <div>Name: ${b.name}</div>
      <div>Mobile: ${b.mobile}</div>
      <div>Time: ${b.time}</div>
    `;
    adminDiv.appendChild(div);
  });
}

showBookings();
