
        // Sample course data array - this could be replaced with data fetched from a database
        const coursesData = [
            {
                id: 1,
                title: "Complete Web Development Bootcamp",
                description: "Learn HTML, CSS, JavaScript, React, Node.js and more. Build real-world projects and become a full stack web developer.",
                image: "dummy.webp",
                category: "Web Development",
                price: 49.99,
                originalPrice: 199.99,
                rating: 4.8,
                reviews: 1248
            },
            {
                id: 2,
                title: "Data Science & Machine Learning",
                description: "Master Python, data analysis, visualization, machine learning, and deep learning. Complete hands-on projects.",
                image: "dummy.webp",
                category: "Data Science",
                price: 59.99,
                originalPrice: 199.99,
                rating: 4.7,
                reviews: 952
            },
            {
                id: 3,
                title: "UI/UX Design Masterclass",
                description: "Learn professional UI/UX design processes. Create beautiful interfaces and improve user experience.",
                image: "dummy.webp",
                category: "Design",
                price: 44.99,
                originalPrice: 169.99,
                rating: 4.9,
                reviews: 723
            },
            {
                id: 4,
                title: "Digital Marketing Strategy",
                description: "Learn proven marketing strategies: SEO, social media, email marketing, PPC, and content marketing.",
                image: "dummy.webp",
                category: "Marketing",
                price: 39.99,
                originalPrice: 149.99,
                rating: 4.6,
                reviews: 486
            },
            {
                id: 5,
                title: "Business Analytics & Intelligence",
                description: "Master data analytics for business. Learn Excel, SQL, Tableau, Power BI, and statistical analysis.",
                image: "dummy.webp",
                category: "Business",
                price: 54.99,
                originalPrice: 179.99,
                rating: 4.8,
                reviews: 612
            },
            {
                id: 6,
                title: "Mobile App Development with Flutter",
                description: "Create beautiful cross-platform mobile applications for iOS and Android using Flutter and Dart.",
                image: "dummy.webp",
                category: "Web Development",
                price: 49.99,
                originalPrice: 189.99,
                rating: 4.7,
                reviews: 538
            },
            {
                id: 7,
                title: "Adobe Photoshop Masterclass",
                description: "Learn professional photo editing, graphic design, and digital art. From beginner to advanced techniques.",
                image: "dummy.webp",
                category: "Design",
                price: 34.99,
                originalPrice: 129.99,
                rating: 4.8,
                reviews: 892
            },
            {
                id: 8,
                title: "Project Management Professional",
                description: "Master project management methodologies and prepare for PMP certification with real-world case studies.",
                image: "dummy.webp",
                category: "Business",
                price: 64.99,
                originalPrice: 229.99,
                rating: 4.9,
                reviews: 374
            }
        ];

        // Function to create course cards dynamically
        function renderCourses(courses) {
            const coursesContainer = document.getElementById('courses-container');
            coursesContainer.innerHTML = ''; // Clear existing content
            
            courses.forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.className = 'course-card';
                
                courseCard.innerHTML = `
                    <img src="${course.image}" alt="${course.title}" class="course-image">
                    <div class="course-info">
                        <div class="course-category">${course.category}</div>
                        <h3 class="course-title">${course.title}</h3>
                        <p class="course-description">${course.description}</p>
                        <div class="course-meta">
                            <div class="course-rating">
                                ★★★★★
                                <span>${course.rating} (${course.reviews})</span>
                            </div>
                            <div class="course-price">
                                <span class="original-price">$${course.originalPrice}</span>
                                $${course.price}
                            </div>
                        </div>
                        <a href="#" class="enroll-btn">Enroll Now</a>
                    </div>
                `;
                
                coursesContainer.appendChild(courseCard);
            });
        }

        // Initialize the page with courses
        document.addEventListener('DOMContentLoaded', () => {
            renderCourses(coursesData);
            
            // Filter button functionality
            const filterButtons = document.querySelectorAll('.filter-btn');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Update active state
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const category = button.textContent;
                    
                    if (category === 'All Categories') {
                        renderCourses(coursesData);
                    } else {
                        const filteredCourses = coursesData.filter(course => 
                            course.category === category
                        );
                        renderCourses(filteredCourses);
                    }
                });
            });
            
            // Search functionality
            const searchButton = document.querySelector('.search-bar button');
            const searchInput = document.querySelector('.search-bar input');
            
            searchButton.addEventListener('click', () => {
                const searchTerm = searchInput.value.toLowerCase().trim();
                
                if (searchTerm === '') {
                    renderCourses(coursesData);
                    return;
                }
                
                const searchResults = coursesData.filter(course => 
                    course.title.toLowerCase().includes(searchTerm) || 
                    course.description.toLowerCase().includes(searchTerm) ||
                    course.category.toLowerCase().includes(searchTerm)
                );
                
                renderCourses(searchResults);
            });
            
            // Enable search on Enter key
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    searchButton.click();
                }
            });
        });
    