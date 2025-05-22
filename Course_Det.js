 // Sample lecture data (simulating database content)
        const lectureData = {
            id: "env101",
            title: "Introduction to Environmental Science",
            author: "Prof. Sarah Johnson",
            duration: "45 minutes",
            intro: "Environmental science is an interdisciplinary field that integrates physical, biological, and information sciences to study the environment and solve environmental problems. This course introduces fundamental concepts in environmental science and examines how human activities impact natural systems.",
            keyConcepts: [
                {
                    id: 1,
                    title: "Ecosystems and Biodiversity",
                    content: "Ecosystems are communities of living organisms interacting with each other and their physical environment. Biodiversity refers to the variety of life forms within these ecosystems and is crucial for maintaining ecosystem stability and resilience."
                },
                {
                    id: 2,
                    title: "Climate Change",
                    content: "Climate change refers to long-term shifts in temperatures and weather patterns. Human activities, particularly the burning of fossil fuels, have been the primary driver of observed climate change since the mid-20th century."
                },
                {
                    id: 3,
                    title: "Sustainability",
                    content: "Sustainability is the principle of meeting present needs without compromising the ability of future generations to meet their own needs. It encompasses environmental, economic, and social dimensions."
                }
            ],
            caseStudies: [
                {
                    id: 1,
                    title: "The Amazon Rainforest",
                    content: "The Amazon Rainforest represents over half of the planet's remaining rainforests and is recognized for its biodiversity. It faces threats from deforestation, climate change, and resource extraction, illustrating the complex interplay between environmental preservation and economic development."
                },
                {
                    id: 2,
                    title: "Renewable Energy Transition",
                    content: "Many countries are transitioning from fossil fuels to renewable energy sources like solar and wind power. This case study examines the environmental, economic, and social implications of this global shift in energy production and consumption."
                }
            ],
            discussionPoints: [
                {
                    id: 1,
                    question: "How can individual actions contribute to environmental protection?",
                    hint: "Consider daily consumption patterns, waste management, and advocacy."
                },
                {
                    id: 2,
                    question: "What are the primary challenges to implementing effective environmental policies globally?",
                    hint: "Think about economic interests, political differences, and varying levels of development."
                },
                {
                    id: 3,
                    question: "How does environmental justice intersect with other social issues?",
                    hint: "Explore connections to economic inequality, public health, and community empowerment."
                }
            ],
            quizQuestions: [
                {
                    id: 1,
                    question: "Which of the following is NOT a renewable resource?",
                    options: ["Solar energy", "Wind power", "Natural gas", "Geothermal energy"],
                    correctAnswer: 2
                },
                {
                    id: 2,
                    question: "What is the greenhouse effect?",
                    options: [
                        "The warming of Earth's surface due to trapped heat by atmospheric gases",
                        "The cooling of Earth due to reflection of sunlight by ice caps",
                        "The process of growing plants in controlled environments",
                        "The effect of deforestation on local climates"
                    ],
                    correctAnswer: 0
                }
            ],
            references: [
                {
                    id: 1,
                    title: "Principles of Environmental Science: Inquiry and Applications",
                    authors: "Cunningham, W.P. & Cunningham, M.A.",
                    year: 2023
                },
                {
                    id: 2,
                    title: "Environmental Science for a Changing World",
                    authors: "Karr, S., Interlandi, J., & Houtman, A.",
                    year: 2024
                },
                {
                    id: 3,
                    title: "Climate Change: Evidence, Impacts, and Choices",
                    authors: "National Research Council",
                    year: 2022,
                    url: "#"
                }
            ]
        };
        
        // Function to populate the page with lecture data
        function populateLecturePage(data) {
            // Set header information
            document.getElementById('lectureTitle').textContent = data.title;
            document.getElementById('lectureAuthor').textContent = data.author;
            document.getElementById('lectureDuration').textContent = data.duration;
            document.getElementById('lectureIntro').textContent = data.intro;
            
            // Populate key concepts
            const keyConceptsContainer = document.getElementById('keyConceptsContainer');
            data.keyConcepts.forEach(concept => {
                const conceptElement = document.createElement('div');
                conceptElement.innerHTML = `
                    <h3>${concept.title}</h3>
                    <p>${concept.content}</p>
                `;
                keyConceptsContainer.appendChild(conceptElement);
            });
            
            // Populate case studies
            const caseStudiesContainer = document.getElementById('caseStudiesContainer');
            data.caseStudies.forEach(study => {
                const studyElement = document.createElement('div');
                studyElement.innerHTML = `
                    <h3>${study.title}</h3>
                    <p>${study.content}</p>
                `;
                caseStudiesContainer.appendChild(studyElement);
            });
            
            // Populate discussion points
            const discussionPointsContainer = document.getElementById('discussionPointsContainer');
            data.discussionPoints.forEach(point => {
                const pointElement = document.createElement('div');
                pointElement.innerHTML = `
                    <h3>${point.question}</h3>
                    <p><em>Hint: ${point.hint}</em></p>
                `;
                discussionPointsContainer.appendChild(pointElement);
            });
            
            // Populate quiz questions
            const quizQuestionsContainer = document.getElementById('quizQuestionsContainer');
            data.quizQuestions.forEach(quiz => {
                const quizElement = document.createElement('div');
                quizElement.className = 'quiz-question';
                
                let optionsHTML = '';
                quiz.options.forEach((option, index) => {
                    optionsHTML += `
                        <div>
                            <input type="radio" id="q${quiz.id}_option${index}" name="quiz${quiz.id}">
                            <label for="q${quiz.id}_option${index}">${option}</label>
                        </div>
                    `;
                });
                
                quizElement.innerHTML = `
                    <p><strong>${quiz.question}</strong></p>
                    <div class="quiz-options">
                        ${optionsHTML}
                    </div>
                `;
                quizQuestionsContainer.appendChild(quizElement);
            });
            
            // Populate references
            const referencesContainer = document.getElementById('referencesContainer');
            data.references.forEach(ref => {
                const refElement = document.createElement('p');
                refElement.innerHTML = `${ref.authors} (${ref.year}). <strong>${ref.title}</strong>.`;
                referencesContainer.appendChild(refElement);
            });
        }
        
        // Function to scroll to a specific section
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            section.scrollIntoView({behavior: 'smooth'});
        }
        
        // Initialize the page with the sample data
        window.onload = function() {
            populateLecturePage(lectureData);
        };