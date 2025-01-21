// Assuming these are already declared in your script
const exploreButton = document.getElementById('exploreButton');
const loginPopup = document.getElementById('loginPopup');
const guestLoginButton = document.getElementById('guestLoginButton');
const guestLocationPopup = document.getElementById('guestLocationPopup');
const signupPopup = document.getElementById('signupPopup');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const guestLocationForm = document.getElementById('guestLocationForm');

// Show login popup
exploreButton.addEventListener('click', () => {
    loginPopup.style.display = 'flex';
});

// Close login popup when clicked outside
window.addEventListener('click', (event) => {
    if (event.target === loginPopup) {
        loginPopup.style.display = 'none';
    }
    if (event.target === signupPopup) {
        signupPopup.style.display = 'none';
    }
    if (event.target === guestLocationPopup) {
        guestLocationPopup.style.display = 'none';
    }
});

// Show guest location popup
guestLoginButton.addEventListener('click', () => {
    loginPopup.style.display = 'none';
    guestLocationPopup.style.display = 'flex';
});

// Show sign-up popup
createAccountLink.addEventListener('click', () => {
    loginPopup.style.display = 'none';
    signupPopup.style.display = 'flex';
});

// Handle login form submission
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const loginEmail = document.getElementById('loginEmail').value;
    const loginPassword = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
    const messageContainer = document.getElementById('messageContainer'); // Assume a div for messages

    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        messageContainer.textContent = 'Login successful! Redirecting to home...';
        messageContainer.style.color = 'green';
        setTimeout(() => {
            window.location.href = 'home.html'; // Redirect to home page
        }, 2000); // Wait 2 seconds before redirecting
    } else {
        messageContainer.textContent = 'Invalid email or password. Please sign up if you do not have an account.';
        messageContainer.style.color = 'red';
    }
});


loginPopup.style.display = 'none';
document.body.appendChild(loginPopup);

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const signupUsername = document.getElementById('signupUsername').value;
    const signupEmail = document.getElementById('signupEmail').value;
    const signupPassword = document.getElementById('signupPassword').value;
    const referenceCode = document.getElementById('signupReferenceCode').value;
    const messageContainer = document.getElementById('messageContainer'); // Message container

    if (referenceCode === 'sih2024') {
        const users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.email === signupEmail)) {
            messageContainer.textContent = 'Email already registered. Redirecting to login...';
            messageContainer.style.color = 'red';
            setTimeout(() => {
                signupPopup.style.display = 'none';
                loginPopup.style.display = 'flex'; // Show login popup
            }, 2000); // Wait 2 seconds
        } else {
             const newUser = { username: signupUsername, email: signupEmail, password: signupPassword };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(newUser));


                messageContainer.textContent = 'Sign up successful!';
                messageContainer.style.color = 'green';

                setTimeout(() => {
                    signupPopup.style.display = 'none';
                    loginPopup.style.display = 'flex'; // Show login popup
                }, 2000); // Wait 2 seconds
            }
        } else {
            messageContainer.textContent = 'Invalid Reference Code.';
            messageContainer.style.color = 'red';
        }
    });

    // Handle "Back to login" click event
    const backToLoginLink = document.getElementById('backToLoginLink');
    backToLoginLink.addEventListener('click', () => {
        signupPopup.style.display = 'none';
        loginPopup.style.display = 'flex'; // Show login popup
    });

// Handle guest location form submission
guestLocationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedLocation = document.getElementById("guestLocation").value;
    localStorage.setItem("selectedLocation", selectedLocation); // Store location in localStorage
    guestLocationPopup.style.display = "none";

    // Redirect to userdata.html
    window.location.href = "userdata.html";
});
// Handle "Back to login" click event
const backToLoginLink1 = document.querySelector('#guestLocationPopup a');
backToLoginLink1.addEventListener('click', () => {
    guestLocationPopup.style.display = 'none';
    loginPopup.style.display = 'flex'; // Show login popup
});

