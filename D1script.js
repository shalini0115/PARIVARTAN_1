// JavaScript for Sidebar
const menuIcon = document.getElementById('menu-icon');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');

// Open Sidebar
menuIcon.addEventListener('click', () => {
    sidebar.classList.add('active');
});

// Close Sidebar
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
});

// JavaScript for Profile Sidebar
const profileIcon = document.getElementById('profile-icon');
const profileCloseBtn = document.getElementById('profile-close-btn');
const profileSidebar = document.getElementById('profile-sidebar');

// Open Profile Sidebar
profileIcon.addEventListener('click', () => {
    profileSidebar.classList.add('active');
});

// Close Profile Sidebar
profileCloseBtn.addEventListener('click', () => {
    profileSidebar.classList.remove('active');
});

// Optional: Close sidebar when clicking outside
document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
        sidebar.classList.remove('active');
    }
    if (!profileSidebar.contains(event.target) && !profileIcon.contains(event.target)) {
        profileSidebar.classList.remove('active');
    }
});



function updateTime() {
    const now = new Date();
    
    // Get current date (e.g., "28 December 2024")
    const date = now.getDate();  // Day of the month
    const month = now.getMonth();  // Month (0-11)
    const year = now.getFullYear();  // Full year
    
    // Format the month name (e.g., "December")
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthName = months[month];
    
    // Get current time in HH:MM:SS format
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Combine the date
    const currentDate = `${date} ${monthName} ${year}`;
    
    // Combine the time
    const currentTime = `${hours}:${minutes}:${seconds}`;
    
    // Update the HTML with the date and time
    document.querySelector('.date').textContent = currentDate;
    document.querySelector('.time').textContent = currentTime;
}

// Update time every second
setInterval(updateTime, 1000);

// Fetch current data dynamically using Fetch API
async function fetchData() {
    const location = document.getElementById("location").value;
    const response = await fetch(`/api/data?location=${location}`);
    const data = await response.json();

    document.getElementById("flowRate").textContent = data.flowRate;
    document.getElementById("tdsValue").textContent = data.tdsValue;
    document.getElementById("pressure").textContent = data.pressure;
    document.getElementById("temperature").textContent = data.temperature;
}

// Fetch historical data dynamically based on filters
async function populateTable(location, duration) {
    const response = await fetch(`/api/historical?location=${location}&duration=${duration}`);
    const data = await response.json();

    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(row => {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${row.date}</td>
            <td>${row.flowRate}</td>
            <td>${row.tdsValue}</td>
            <td>${row.waterColumn}</td>
        `;
        tableBody.appendChild(tableRow);
    });
}

// Event listeners for dropdown changes
document.getElementById('location-select').addEventListener('change', (e) => {
    const location = e.target.value;
    const duration = document.getElementById('duration-select').value;
    populateTable(location, duration);
});

document.getElementById('duration-select').addEventListener('change', (e) => {
    const duration = e.target.value;
    const location = document.getElementById('location-select').value;
    populateTable(location, duration);
});

// Initialize the table on page load with default values
populateTable('all', 'last-week');

// WebSocket for real-time updates
const socket = io();
socket.on('update', (data) => {
    document.getElementById("flowRate").textContent = data.flowRate;
    document.getElementById("tdsValue").textContent = data.tdsValue;
    document.getElementById("pressure").textContent = data.pressure;
    document.getElementById("temperature").textContent = data.temperature;
});