
// بيانات الدروس الكاملة
const lessonsData = {
    'رياضيات': [
        { 
            title: 'المقدمة في الرياضيات', 
            videoId: 'A1',
            videoSrc: 'assets/videos/math/A1.mp4',
            duration: '10:25',
            description: 'تعلم أساسيات الرياضيات والمفاهيم الأولية التي تحتاجها لبداية قوية',
            resources: ['assets/resources/math/A1_notes.pdf', 'assets/resources/math/A1_exercises.pdf']
        },
        { 
            title: 'الجبر الأساسي', 
            videoId: 'A2',
            videoSrc: 'assets/videos/math/A2.mp4',
            duration: '12:40',
            description: 'المعادلات الجبرية وحل المسائل باستخدام المتغيرات',
            resources: ['assets/resources/math/A2_notes.pdf']
        },
        { 
            title: 'الهندسة المستوية', 
            videoId: 'A3',
            videoSrc: 'assets/videos/math/A3.mp4',
            duration: '15:30',
            description: 'دراسة الأشكال الهندسية الأساسية وخصائصها',
            resources: []
        }
    ],
    'فيزياء': [
        { 
            title: 'الميكانيكا الأساسية', 
            videoId: 'B1',
            videoSrc: 'assets/videos/physics/B1.mp4',
            duration: '14:15',
            description: 'قوانين الحركة والسرعة والتسارع',
            resources: ['assets/resources/physics/B1_lab.pdf']
        },
        { 
            title: 'الديناميكا الحرارية', 
            videoId: 'B2',
            videoSrc: 'assets/videos/physics/B2.mp4',
            duration: '18:20',
            description: 'دراسة الحرارة وانتقال الطاقة',
            resources: []
        }
    ],
    'كيمياء': [
        { 
            title: 'الجدول الدوري', 
            videoId: 'C1',
            videoSrc: 'assets/videos/chemistry/C1.mp4',
            duration: '11:45',
            description: 'فهم العناصر الكيميائية وتصنيفها',
            resources: ['assets/resources/chemistry/periodic_table.pdf']
        }
    ],
    'أحياء': [
        { 
            title: 'تركيب الخلية', 
            videoId: 'D1',
            videoSrc: 'assets/videos/biology/D1.mp4',
            duration: '13:50',
            description: 'مكونات الخلية الحيوانية والنباتية',
            resources: []
        }
    ]
};

// بيانات الاختبارات الكاملة مع تفسيرات
const quizzesData = {
    'رياضيات': [
        {
            question: 'ما هي نتيجة جمع العددين 15 و 27؟',
            options: ['32', '42', '52', '62'],
            answer: 1,
            explanation: '15 + 27 = 42',
            difficulty: 'سهل'
        },
        {
            question: 'ما هو محيط دائرة نصف قطرها 7 سم؟ (ط ≈ 3.14)',
            options: ['14 سم', '21.98 سم', '43.96 سم', '153.86 سم'],
            answer: 2,
            explanation: 'محيط الدائرة = 2 × ط × نق = 2 × 3.14 × 7 = 43.96 سم',
            difficulty: 'متوسط'
        },
        {
            question: 'ما هو حل المعادلة: 3س + 5 = 20؟',
            options: ['س = 3', 'س = 5', 'س = 7', 'س = 9'],
            answer: 1,
            explanation: '3س = 20 - 5 → 3س = 15 → س = 5',
            difficulty: 'متوسط'
        },
        {
            question: 'ما هو العدد الأولي من الأعداد التالية؟',
            options: ['15', '21', '23', '27'],
            answer: 2,
            explanation: 'العدد الأولي هو الذي لا يقبل القسمة إلا على نفسه وعلى الواحد، 23 عدد أولي',
            difficulty: 'سهل'
        },
        {
            question: 'إذا كان مجموع ثلاث أعداد صحيحة متتالية هو 33، فما هو العدد الأوسط؟',
            options: ['10', '11', '12', '13'],
            answer: 1,
            explanation: 'نفرض الأعداد هي (ن-1، ن، ن+1) → 3ن = 33 → ن = 11',
            difficulty: 'صعب'
        }
    ],
    'فيزياء': [
        {
            question: 'ما هي وحدة قياس القوة في النظام الدولي؟',
            options: ['جول', 'نيوتن', 'واط', 'باسكال'],
            answer: 1,
            explanation: 'النيوتن هو وحدة قياس القوة في النظام الدولي',
            difficulty: 'سهل'
        },
        {
            question: 'ما هي سرعة الضوء في الفراغ تقريبًا؟',
            options: ['300 كم/ث', '3,000 كم/ث', '30,000 كم/ث', '300,000 كم/ث'],
            answer: 3,
            explanation: 'سرعة الضوء في الفراغ تقريبًا 300,000 كم/ث أو 3×10^8 م/ث',
            difficulty: 'سهل'
        }
    ]
};

// حالة التطبيق
const appState = {
    currentPage: 'subjects',
    currentSubject: null,
    currentLesson: null,
    currentQuiz: null,
    quizAnswers: [],
    userProgress: JSON.parse(localStorage.getItem('userProgress')) || {},
    settings: {
        videoQuality: '720',
        darkMode: false,
        notifications: true
    }
};

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    loadUserSettings();
    updateCopyrightYear();
    checkFirstVisit();
});

function initApp() {
    renderNavigation();
    renderHomePage();
    setupEventListeners();
    updateProgressBars();
}

// عرض صفحة المواد الدراسية
function renderHomePage() {
    const container = document.getElementById('subjectsContainer');
    container.innerHTML = '';
    
    for (const subject in lessonsData) {
        const progress = calculateSubjectProgress(subject);
        
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.innerHTML = `
            <div class="subject-header">
                <h2 class="subject-name">${subject}</h2>
                <div class="subject-meta">
                    <span class="subject-hours">${lessonsData[subject].length} دروس</span>
                    <span class="subject-progress">${progress}% اكتمال</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
            </div>
            <div class="subject-body">
                <p class="subject-desc">${getSubjectDescription(subject)}</p>
                <div class="subject-actions">
                    <button class="btn btn-lessons">عرض الدروس</button>
                    <button class="btn btn-quiz">بدء الاختبار</button>
                </div>
            </div>
        `;
        
        card.querySelector('.btn-lessons').addEventListener('click', () => showLessons(subject));
        card.querySelector('.btn-quiz').addEventListener('click', () => startQuiz(subject));
        
        container.appendChild(card);
    }
}

// عرض دروس المادة
function showLessons(subject) {
    appState.currentPage = 'lessons';
    appState.currentSubject = subject;
    
    document.getElementById('subjectsContainer').style.display = 'none';
    document.getElementById('lessonsContainer').style.display = 'grid';
    document.getElementById('pageTitle').textContent = `دروس ${subject}`;
    
    const container = document.getElementById('lessonsList');
    container.innerHTML = '';
    
    lessonsData[subject].forEach((lesson, index) => {
        const lessonCard = document.createElement('div');
        lessonCard.className = 'lesson-card';
        
        const isCompleted = appState.userProgress[`${subject}_${lesson.videoId}`]?.completed || false;
        
        lessonCard.innerHTML = `
            <div class="lesson-number">${index + 1}</div>
            <div class="lesson-content">
                <h3 class="lesson-title">${lesson.title}</h3>
                <p class="lesson-duration">${lesson.duration}</p>
                <p class="lesson-desc">${lesson.description}</p>
                ${lesson.resources.length > 0 ? 
                    `<div class="lesson-resources">
                        <i class="fas fa-file-download"></i>
                        ${lesson.resources.length} مصادر تعليمية
                    </div>` : ''
                }
            </div>
            <div class="lesson-status ${isCompleted ? 'completed' : ''}">
                ${isCompleted ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-play-circle"></i>'}
            </div>
        `;
        
        lessonCard.addEventListener('click', () => playLesson(lesson));
        container.appendChild(lessonCard);
    });
}

// تشغيل الدرس
function playLesson(lesson) {
    appState.currentLesson = lesson;
    appState.currentPage = 'video';
    
    document.getElementById('lessonsContainer').style.display = 'none';
    document.getElementById('videoContainer').style.display = 'block';
    
    const videoPlayer = document.getElementById('lessonVideo');
    videoPlayer.src = lesson.videoSrc;
    videoPlayer.load();
    
    document.getElementById('videoTitle').textContent = lesson.title;
    
    // عرض الموارد التعليمية
    const resourcesContainer = document.getElementById('lessonResources');
    resourcesContainer.innerHTML = '';
    
    if (lesson.resources.length > 0) {
        resourcesContainer.style.display = 'block';
        lesson.resources.forEach(resource => {
            const resourceItem = document.createElement('a');
            resourceItem.href = resource;
            resourceItem.className = 'resource-item';
            resourceItem.innerHTML = `
                <i class="fas fa-file-pdf"></i>
                <span>${resource.split('/').pop()}</span>
                <i class="fas fa-download"></i>
            `;
            resourceItem.setAttribute('download', '');
            resourcesContainer.appendChild(resourceItem);
        });
    } else {
        resourcesContainer.style.display = 'none';
    }
    
    // تحديث التقدم عند انتهاء الفيديو
    videoPlayer.addEventListener('ended', () => {
        markLessonAsCompleted(appState.currentSubject, lesson.videoId);
    });
}

// بدء الاختبار
function startQuiz(subject) {
    appState.currentPage = 'quiz';
    appState.currentSubject = subject;
    appState.currentQuiz = quizzesData[subject];
    appState.quizAnswers = [];
    appState.currentQuestionIndex = 0;
    
    document.getElementById('subjectsContainer').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
    document.getElementById('quizTitle').textContent = `اختبار ${subject}`;
    
    showQuestion();
}

// عرض سؤال الاختبار
function showQuestion() {
    const question = appState.currentQuiz[appState.currentQuestionIndex];
    const quizQuestion = document.getElementById('quizQuestion');
    
    quizQuestion.innerHTML = `
        <div class="question-header">
            <span class="question-number">السؤال ${appState.currentQuestionIndex + 1} من ${appState.currentQuiz.length}</span>
            <span class="question-difficulty ${question.difficulty === 'صعب' ? 'hard' : question.difficulty === 'متوسط' ? 'medium' : 'easy'}">
                ${question.difficulty}
            </span>
        </div>
        <h3 class="question-text">${question.question}</h3>
    `;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.innerHTML = `
            <span class="option-letter">${String.fromCharCode(65 + index)})</span>
            <span class="option-text">${option}</span>
        `;
        
        optionElement.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionElement);
    });
    
    document.getElementById('quizProgress').style.width = 
        `${(appState.currentQuestionIndex / appState.currentQuiz.length) * 100}%`;
}

// اختيار إجابة
function selectAnswer(optionIndex) {
    const currentQuestion = appState.currentQuiz[appState.currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.answer;
    
    appState.quizAnswers.push({
        question: currentQuestion.question,
        userAnswer: optionIndex,
        correctAnswer: currentQuestion.answer,
        isCorrect: isCorrect,
        explanation: currentQuestion.explanation
    });
    
    // عرض التغذية الراجعة
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        if (index === currentQuestion.answer) {
            option.classList.add('correct');
        } else if (index === optionIndex && !isCorrect) {
            option.classList.add('wrong');
        }
        option.style.pointerEvents = 'none';
    });
    
    // تحديث النتيجة
    if (isCorrect) {
        appState.userProgress.score = (appState.userProgress.score || 0) + 1;
    }
    
    document.getElementById('nextBtn').style.display = 'block';
}

// عرض نتائج الاختبار
function showQuizResults() {
    appState.currentPage = 'results';
    
    document.getElementById('quizContainer').style.display = 'none';
    document.getElementById('resultsContainer').style.display = 'block';
    
    const score = appState.quizAnswers.filter(a => a.isCorrect).length;
    const totalQuestions = appState.quizAnswers.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    document.getElementById('resultsScore').textContent = `${score}/${totalQuestions}`;
    document.getElementById('resultsPercentage').textContent = `${percentage}%`;
    document.getElementById('resultsCircle').style.background = `
        conic-gradient(#2c7865 ${percentage}%, #f0f0f0 ${percentage}% 100%)
    `;
    
    // عرض الإجابات
    const answersContainer = document.getElementById('quizAnswers');
    answersContainer.innerHTML = '';
    
    appState.quizAnswers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = `answer-item ${answer.isCorrect ? 'correct' : 'wrong'}`;
        
        answerElement.innerHTML = `
            <div class="answer-question">
                <span class="answer-number">${index + 1}.</span>
                <span class="answer-text">${answer.question}</span>
                <i class="fas ${answer.isCorrect ? 'fa-check' : 'fa-times'}"></i>
            </div>
            <div class="answer-explanation">
                <p>${answer.explanation}</p>
            </div>
        `;
        
        answersContainer.appendChild(answerElement);
    });
    
    // حفظ التقدم
    saveUserProgress();
}

// ميزات إضافية
function calculateSubjectProgress(subject) {
    const lessons = lessonsData[subject];
    if (!lessons.length) return 0;
    
    const completedLessons = lessons.filter(lesson => 
        appState.userProgress[`${subject}_${lesson.videoId}`]?.completed
    ).length;
    
    return Math.round((completedLessons / lessons.length) * 100);
}

function markLessonAsCompleted(subject, videoId) {
    if (!appState.userProgress[`${subject}_${videoId}`]) {
        appState.userProgress[`${subject}_${videoId}`] = {
            completed: true,
            completedAt: new Date().toISOString()
        };
        saveUserProgress();
        updateProgressBars();
    }
}

function saveUserProgress() {
    localStorage.setItem('userProgress', JSON.stringify(appState.userProgress));
    localStorage.setItem('userSettings', JSON.stringify(appState.settings));
}

function loadUserSettings() {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
        appState.settings = JSON.parse(savedSettings);
        applySettings();
    }
}

function applySettings() {
    if (appState.settings.darkMode) {
        document.body.classList.add('dark-mode');
    }
}

function updateCopyrightYear() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

function checkFirstVisit() {
    if (!localStorage.getItem('firstVisit')) {
        showWelcomeMessage();
        localStorage.setItem('firstVisit', 'true');
    }
}

function showWelcomeMessage() {
    const welcomeModal = document.createElement('div');
    welcomeModal.className = 'welcome-modal';
    welcomeModal.innerHTML = `
        <div class="modal-content">
            <h2>مرحبًا بك في منصة التعليم التفاعلي!</h2>
            <p>ابدأ رحلة التعلم الخاصة بك من خلال تصفح الدروس أو اختبار معلوماتك</p>
            <button class="btn btn-primary">ابدأ الآن</button>
        </div>
    `;
    
    document.body.appendChild(welcomeModal);
    welcomeModal.querySelector('.btn').addEventListener('click', () => {
        welcomeModal.remove();
    });
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // التنقل بين الصفحات
    document.getElementById('homeLink').addEventListener('click', () => {
        renderHomePage();
    });
    
    // التحكم في الفيديو
    document.getElementById('videoBackBtn').addEventListener('click', () => {
        showLessons(appState.currentSubject);
    });
    
    // إدارة الاختبار
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (appState.currentQuestionIndex < appState.currentQuiz.length - 1) {
            appState.currentQuestionIndex++;
            showQuestion();
        } else {
            showQuizResults();
        }
    });
    
    document.getElementById('quizBackBtn').addEventListener('click', () => {
        renderHomePage();
    });
    
    document.getElementById('retryQuizBtn').addEventListener('click', () => {
        startQuiz(appState.currentSubject);
    });
    
    // الإعدادات
    document.getElementById('settingsBtn').addEventListener('click', () => {
        showSettingsModal();
    });
}
