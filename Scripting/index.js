
 
 function toggleMenu() {
            const hamburger = document.querySelector('.hamburger');
            const menu = document.querySelector('.section1-2');
            
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        }

        // Close menu when clicking on a link (mobile)
        document.querySelectorAll('.section1-2 a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    const hamburger = document.querySelector('.hamburger');
                    const menu = document.querySelector('.section1-2');
                    hamburger.classList.remove('active');
                    menu.classList.remove('active');
                }
            });
        });

        // Close menu when clicking outside (mobile)
        document.addEventListener('click', (e) => {
            const hamburger = document.querySelector('.hamburger');
            const menu = document.querySelector('.section1-2');
            const section = document.querySelector('.section');
            
            if (!section.contains(e.target) && menu.classList.contains('active')) {
                hamburger.classList.remove('active');
                menu.classList.remove('active');
            }
        });



        function updateNavbar(loggedIn, firstname) {
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const logoutLink = document.getElementById('logout-link');

    if (loggedIn) {
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        logoutLink.style.display = 'inline-block';
        logoutLink.textContent = `Logout (${firstname})`; // Optional: show user name
    } else {
        loginLink.style.display = 'inline-block';
        signupLink.style.display = 'inline-block';
        logoutLink.style.display = 'none';
    }
}



// Logout handler
document.getElementById('logout-link').addEventListener('click', function(e) {
    e.preventDefault();
    fetch('../backend/logout.php')  // Create this script in Step 5
        .then(() => {
            updateNavbar(false);
            window.location.href = 'index.html'; // Redirect after logout
        })
        .catch(err => console.error('Logout failed:', err));
});







document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("login-link");
    const signupLink = document.getElementById("signup-link");
    const logoutLink = document.getElementById("logout-link");

    // Check URL parameters for login/signup success
    const urlParams = new URLSearchParams(window.location.search);
    
    // Handle both login and signup success
    if (urlParams.get('login') === 'success' || urlParams.get('signup') === 'success') {
        localStorage.setItem("isLoggedIn", "true");
        // Clean URL to remove the parameter
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    function handleLogin() {
        if (loginLink) loginLink.style.display = "none";
        if (signupLink) signupLink.style.display = "none";
        if (logoutLink) logoutLink.style.display = "inline";
        localStorage.setItem("isLoggedIn", "true");
    }

    function handleLogout() {
        if (loginLink) loginLink.style.display = "inline";
        if (signupLink) signupLink.style.display = "inline";
        if (logoutLink) logoutLink.style.display = "none";
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("userEmail");
    }

    // Set initial state based on localStorage
    if (localStorage.getItem("isLoggedIn") === "true") {
        handleLogin();
    } else {
        handleLogout();
    }

    // Logout functionality
    if (logoutLink) {
        logoutLink.addEventListener("click", function (e) {
            e.preventDefault();
            handleLogout();
            window.location.href = "backend/logout.php";
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
    
    // Force login state
    localStorage.setItem("isLoggedIn", "true");
    location.reload();
}