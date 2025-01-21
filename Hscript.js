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
 
document.addEventListener("DOMContentLoaded", () => {
    const chatbot = document.getElementById("chatbot");
    const openChatbotButton = document.getElementById("open-chatbot");
    const closeChatbotButton = document.getElementById("close-chatbot");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");
    const sendMessageButton = document.getElementById("send-message");
    const predefinedCommands = document.querySelectorAll(".command-btn");
  
    // Open and close chatbot
    openChatbotButton.addEventListener("click", () => {
      chatbot.style.display = "flex";
      openChatbotButton.style.display = "none";
  
      // Initial greeting animation (delay for effect)
      setTimeout(() => {
        const greeting = document.createElement("p");
        greeting.className = "bot-message";
        greeting.textContent = "Welcome! Feel free to ask about water conservation.";
        chatbotMessages.appendChild(greeting);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }, 500);
    });
  
    closeChatbotButton.addEventListener("click", () => {
      chatbot.style.display = "none";
      openChatbotButton.style.display = "block";
    });
  
    // Add message to chat
    const addMessage = (message, type) => {
      const messageElement = document.createElement("p");
      messageElement.textContent = message;
      messageElement.classList.add(type === "user" ? "user-message" : "bot-message");
      chatbotMessages.appendChild(messageElement);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    };
  
    // Fetch response (mock GPT API call)
    const fetchResponse = async (userMessage) => {
      try {
        // Simulate an API call
        const response = {
          "How can I conserve water?": "1. Fix leaks immediately. 2. Use water-efficient fixtures. 3. Install rainwater harvesting systems.",
          "What are Delhi government initiatives?": "Delhi Govt promotes: 1. Rainwater Harvesting. 2. Jal Shakti Abhiyan. 3. Mandatory IoT water meters.",
          "How does rainwater harvesting work?": "Rainwater harvesting collects rain, filters it, and stores it for reuse, reducing dependency on groundwater.",
          "What is groundwater recharge?": "Groundwater recharge involves directing rainwater into the ground to refill aquifers using recharge pits and smart pavements.",
          default: "I’m here to help! Try asking about water conservation, government initiatives, or rainwater harvesting."
        };
  
        return response[userMessage] || response.default;
      } catch (error) {
        return "Sorry, I couldn't connect to the server. Please try again later.";
      }
    };
  
    // Handle user input and commands
    const handleUserMessage = async (message) => {
      if (message) {
        addMessage(message, "user");
        const botResponse = await fetchResponse(message);
        setTimeout(() => addMessage(botResponse, "bot"), 500);
      }
    };
  
    // Send message from input
    sendMessageButton.addEventListener("click", () => {
      const userMessage = chatbotInput.value.trim();
      if (userMessage) {
        handleUserMessage(userMessage);
        chatbotInput.value = "";
      }
    });
  
    chatbotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const userMessage = chatbotInput.value.trim();
        if (userMessage) {
          handleUserMessage(userMessage);
          chatbotInput.value = "";
        }
      }
    });
  
    // Handle predefined command buttons
    predefinedCommands.forEach((button) => {
      button.addEventListener("click", () => {
        const command = button.textContent;
        handleUserMessage(command);
      });
    });
  });