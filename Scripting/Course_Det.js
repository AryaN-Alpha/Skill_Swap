// Get course ID from URL
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('id');

if (courseId) {

    const coursesData = async () => {
        await fetch('backend/Courses_Section.php')
            .then(response => response.json())
            .then(data => {
                const filteredCourses = data.filter(val => val.id == courseId);
                if (filteredCourses.length > 0) {
                    loadCourseData(filteredCourses[0]); // ✅ Send the single object
                } else {
                    console.log("No course found with ID:", courseId);
                }
            })
            .catch(error => {
                console.error("Error fetching courses:", error);
            });
    };

    coursesData(); // ✅ Only call if courseId is valid
}

// Function to populate the page
function loadCourseData(course) {
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('lectureTitle').textContent = course.title;
    document.getElementById('courseInstructor').textContent = course.instructor || "N/A";
    document.getElementById('courseDuration').textContent = course.duration || "N/A";
    document.getElementById('courseDescription').textContent = course.description;

    // Populate details
    const detailsContainer = document.getElementById('courseDetails');
    const detailCard = document.createElement('div');
    detailCard.className = 'detail-card';
    detailCard.innerHTML = `
        <div class="detail-title">${course.description}</div>
        <div class="detail-content">${course.description}</div>
    `;
    detailsContainer.appendChild(detailCard);

   
}
