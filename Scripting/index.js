

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

