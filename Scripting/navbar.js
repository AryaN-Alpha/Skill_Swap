function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.section1-2');
    
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
}

function updateNavbar(loggedIn, firstname = '') {
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');
    const userName = document.getElementById('user-name');

    if (loggedIn) {
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        logoutLink.style.display = 'inline-block';
        
        if (firstname) {
            logoutLink.textContent = `Logout (${firstname})`;
            // Also show in the user-name span if you want it separate
            if (userName) {
                userName.textContent = `Welcome, ${firstname}`;
                userName.style.display = 'inline-block';
            }
        } else {
            logoutLink.textContent = 'Logout';
        }
    } else {
        loginLink.style.display = 'inline-block';
        signupLink.style.display = 'inline-block';
        logoutLink.style.display = 'none';
        
        if (userName) {
            userName.style.display = 'none';
            userName.textContent = '';
        }
    }
}

// Function to check login status and get user name from server
async function checkLoginStatus() {
    try {
        const response = await fetch('./backend/checkLoginStatus.php');
        const data = await response.json();
        
        if (data.status === 'success') {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userFirstname", data.firstname);
            return data.firstname;
        } else {
            localStorage.setItem("isLoggedIn", "false");
            localStorage.removeItem("userFirstname");
            return null;
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        // Fallback to localStorage
        return localStorage.getItem("userFirstname") || null;
    }
}

// Logout handler
document.getElementById('logout-link').addEventListener('click', function(e) {
    e.preventDefault();
    fetch('../backend/logout.php')
        .then(() => {
            updateNavbar(false);
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("userFirstname");
            window.location.href = 'index.html';
        })
        .catch(err => console.error('Logout failed:', err));
});

document.addEventListener("DOMContentLoaded", async function () {
    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");
    const logoutLink = document.getElementById("logout-link");

    // Check URL parameters for login/signup success
    const urlParams = new URLSearchParams(window.location.search);
    
    // Handle both login and signup success
    if (urlParams.get('login') === 'success' || urlParams.get('signup') === 'success') {
        localStorage.setItem("isLoggedIn", "true");
        // Get user name from server
        const firstname = await checkLoginStatus();
        handleLogin(firstname);
        // Clean URL to remove the parameter
        window.history.replaceState({}, document.title, window.location.pathname);
    } else {
        // Check login status on page load
        if (localStorage.getItem("isLoggedIn") === "true") {
            const firstname = await checkLoginStatus();
            handleLogin(firstname);
        } else {
            handleLogout();
        }
    }

    function handleLogin(firstname = '') {
        if (loginLink) loginLink.style.display = "none";
        if (signupLink) signupLink.style.display = "none";
        if (logoutLink) {
            logoutLink.style.display = "inline";
            if (firstname) {
                logoutLink.textContent = `Logout `;
            } else {
                logoutLink.textContent = 'Logout';
            }
        }
        
        // Also update the user-name span
        const userName = document.getElementById('user-name');
        if (firstname && userName) {
            userName.textContent = `Welcome, ${firstname}`;
            userName.style.display = 'inline-block';
        }
        
        localStorage.setItem("isLoggedIn", "true");
        if (firstname) localStorage.setItem("userFirstname", firstname);
    }

    function handleLogout() {
        if (loginLink) loginLink.style.display = "inline";
        if (signupLink) signupLink.style.display = "inline";
        if (logoutLink) logoutLink.style.display = "none";
        
        const userName = document.getElementById('user-name');
        if (userName) {
            userName.style.display = 'none';
            userName.textContent = '';
        }
        
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userFirstname");
    }

    // Logout functionality (keeping your existing one, but removing duplicate)
    if (logoutLink) {
        logoutLink.addEventListener("click", function (e) {
            e.preventDefault();
            handleLogout();
            
            fetch('../backend/logout.php')
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch(err => {
                    console.error('Logout failed:', err);
                    window.location.href = 'index.html';
                });
        });
    }
});

// Test function (remove this in production)
function testLoginState() {
    console.log("Current state:", localStorage.getItem("isLoggedIn"));
    const loginLink = document.getElementById("login-link");
    const logoutLink = document.getElementById("logout-link");
    console.log("Login display:", loginLink ? loginLink.style.display : "not found");
    console.log("Logout display:", logoutLink ? logoutLink.style.display : "not found");
    
    // Force login state and check server
    checkLoginStatus().then(firstname => {
        if (firstname) {
            localStorage.setItem("isLoggedIn", "true");
            updateNavbar(true, firstname);
        }
    });
}