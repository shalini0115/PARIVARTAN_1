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

// Populate Profile Sidebar with User Info
function updateProfileSidebar() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const profileSidebar = document.getElementById('profile-sidebar');
        profileSidebar.innerHTML = `
            <div class="close-btn" id="profile-close-btn">&times;</div>
            <h2>Profile</h2>
            <p><strong>Name:</strong> ${currentUser.username}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <button id="logout-btn" style="margin-top:30px;">Logout</button>
        `;

        // Add Logout Functionality
        const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            alert('Logged out successfully!');
            window.location.reload(); // Reload the page
        });

        // Re-add close button functionality
        const profileCloseBtn = document.getElementById('profile-close-btn');
        profileCloseBtn.addEventListener('click', () => {
            profileSidebar.classList.remove('active');
        });
    }
}

// Call updateProfileSidebar on page load
document.addEventListener('DOMContentLoaded', () => {
    updateProfileSidebar();
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

// Initialize time on page load
updateTime();
// Sample data (simulate data fetched from a database or API)
const sensorData = {
    location1: { flowRate: 1.5, tdsValue: 500, pressure: 2.1, temperature: 25 },
    location2: { flowRate: 1.8, tdsValue: 480, pressure: 2.3, temperature: 28 },
    location3: { flowRate: 2.0, tdsValue: 520, pressure: 2.0, temperature: 22 }
};

// Function to fetch and display data
function fetchData() {
    const location = document.getElementById("location").value;
    const data = sensorData[location];

    document.getElementById("flowRate").textContent = data.flowRate;
    document.getElementById("tdsValue").textContent = data.tdsValue;
    document.getElementById("pressure").textContent = data.pressure;
    document.getElementById("temperature").textContent = data.temperature;
}

// Sample data for demonstration purposes
const sampleData = [
    { location: 'location1', date: '2024-12-01', flowRate: 20, turbidity: 2, waterColumn: 5 },
    { location: 'location1', date: '2024-11-25', flowRate: 25, turbidity: 3, waterColumn: 6 },
    { location: 'location2', date: '2024-11-20', flowRate: 30, turbidity: 4, waterColumn: 7 },
    { location: 'location3', date: '2024-11-15', flowRate: 15, turbidity: 2, waterColumn: 5 },
    { location: 'location1', date: '2024-11-10', flowRate: 18, turbidity: 3, waterColumn: 4 },
    { location: 'location2', date: '2024-10-25', flowRate: 22, turbidity: 2, waterColumn: 5 },
];

// Populate table based on selected filters
function populateTable(location, duration) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    const filteredData = sampleData.filter(data => {
        const dataDate = new Date(data.date);
        const now = new Date();
        let durationCondition = true;

        // Check location filter
        const locationCondition = location === 'all' || data.location === location;

        // Check duration filter
        if (duration === 'last-week') {
            const lastWeek = new Date(now.setDate(now.getDate() - 7));
            durationCondition = dataDate >= lastWeek;
        } else if (duration === 'last-month') {
            const lastMonth = new Date(now.setMonth(now.getMonth() - 1));
            durationCondition = dataDate >= lastMonth;
        } else if (duration === 'last-3-months') {
            const lastThreeMonths = new Date(now.setMonth(now.getMonth() - 3));
            durationCondition = dataDate >= lastThreeMonths;
        } else if (duration === 'last-6-months') {
            const lastSixMonths = new Date(now.setMonth(now.getMonth() - 6));
            durationCondition = dataDate >= lastSixMonths;
        }

        return locationCondition && durationCondition;
    });

    // Populate rows
    filteredData.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.date}</td>
            <td>${data.flowRate}</td>
            <td>${data.turbidity}</td>
            <td>${data.waterColumn}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Event listeners for dropdowns
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

// Initialize table on page load
populateTable('all', 'last-week');

