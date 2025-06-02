let resolvedCoursesData = []; // ✅ Store resolved data here

const coursesData = fetch('backend/Courses_Section.php')
  .then(response => response.json())
  .then(data => {
    resolvedCoursesData = data;        // ✅ Save data globally
    renderCourses(resolvedCoursesData); // ✅ Initial render
    console.log(resolvedCoursesData);
  })
  .catch(error => {
    console.error("Error fetching courses:", error);
  });

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
        <form method="GET" action="Course_Det.html">
          <input type="hidden" name="id" value="${course.id}">
          <input type="submit" class="enroll-btn" value="Enroll Now">
        </form>
      </div>
    `;

    coursesContainer.appendChild(courseCard);
  });
}

// Initialize the page with courses
document.addEventListener('DOMContentLoaded', () => {
  
  
  renderCourses(resolvedCoursesData);

  // Filter button functionality
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.textContent;

      if (category === 'All Categories') {
        renderCourses(resolvedCoursesData);
      } else {
        const filteredCourses = resolvedCoursesData.filter(course =>
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
      renderCourses(resolvedCoursesData);
      return;
    }

    const searchResults = resolvedCoursesData.filter(course =>
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