function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(tabId).classList.add('active');
    
    event.currentTarget.classList.add('active');
    
    if (tabId === 'polls') {
        drawPollChart();
    }
    
    animateElements();
}

function updateTimeline() {
    const major = document.getElementById('major').value;
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (major === 'engineering') {
        timelineItems[0].querySelector('p').textContent = 'شهادة الثانوية العامة بمعدل لا يقل عن 12/20 في الشعبة العلمية مع اجتياز اختبار القبول في الرياضيات والفيزياء';
        timelineItems[1].querySelector('p').textContent = '5 سنوات دراسية (4 سنوات للتخصص + سنة تحضيرية) مع تدريب عملي في السنة النهائية';
    } else if (major === 'computer') {
        timelineItems[0].querySelector('p').textContent = 'شهادة الثانوية العامة بمعدل لا يقل عن 12/20 مع اجتياز اختبار القبول في الرياضيات';
        timelineItems[1].querySelector('p').textContent = '4 سنوات دراسية مع مشروع تخرج في السنة النهائية';
    } else if (major === 'biology') {
        timelineItems[0].querySelector('p').textContent = 'شهادة الثانوية العامة بمعدل لا يقل عن 12/20 في الشعبة العلمية';
        timelineItems[1].querySelector('p').textContent = '3 سنوات دراسية مع تدريب ميداني في السنة النهائية';
    }
}

function openModal(course) {
    const modal = document.getElementById('registration-modal');
    const title = document.getElementById('modal-title');

    const courseNames = {
        'python-workshop': 'ورشة برمجة Python',
        'public-speaking': 'ورشة الخطابة والإلقاء',
        'entrepreneurship': 'ورشة ريادة الأعمال',
        'english-workshop': 'ورشة اللغة الإنجليزية',
        'skills-competition': 'مسابقة المهارات الطلابية',
        'student-day': 'فعاليات يوم الطالب'
    };
    
    title.textContent = `تسجيل في ${courseNames[course] || 'الفعالية'}`;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('registration-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const modal = document.getElementById('registration-modal');
    if (event.target == modal) {
        closeModal();
    }
}

function submitPoll() {
    const selectedOption = document.querySelector('input[name="improvement"]:checked');
    
    if (!selectedOption) {
        alert('الرجاء اختيار أحد الخيارات قبل التصويت');
        return;
    }
    
    alert('شكرًا لك على المشاركة في الاستطلاع! صوتك يساهم في تطوير جامعتنا.');
    drawPollChart();
}

function drawPollChart() {
    const ctx = document.getElementById('results-chart').getContext('2d');
    
    const pollData = {
        labels: ['تحسين المرافق', 'الأنشطة الطلابية', 'الدعم النفسي', 'البنية التكنولوجية', 'التدريب لسوق العمل'],
        datasets: [{
            data: [35, 25, 15, 10, 15],
            backgroundColor: [
                '#0E5823',
                '#84C5ED',
                '#E3A74E',
                '#2ecc71',
                '#e74c3c'
            ],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    };
    
    new Chart(ctx, {
        type: 'doughnut',
        data: pollData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                    rtl: true,
                    labels: {
                        font: {
                            family: 'Tajawal',
                            size: 14
                        },
                        padding: 20
                    }
                },
                title: {
                    display: true,
                    text: 'نتائج الاستطلاع',
                    font: {
                        family: 'Tajawal',
                        size: 18,
                        weight: 'bold'
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                }
            },
            cutout: '60%',
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });
}

function shareDream() {
    const nameInput = document.getElementById('dreamer-name');
    const dreamInput = document.getElementById('dream-text');
    
    if (!dreamInput.value.trim()) {
        alert('الرجاء كتابة حلمك قبل المشاركة');
        return;
    }
    
    const name = nameInput.value.trim() || 'طالب جامعة تيسمسيلت';
    const dream = dreamInput.value.trim();
    
    const dreamCard = document.createElement('div');
    dreamCard.className = 'dream-card animate-in';
    dreamCard.innerHTML = `
        <h4>${name}</h4>
        <p>${dream}</p>
    `;
    
    document.getElementById('dream-wall').prepend(dreamCard);
    
    nameInput.value = '';
    dreamInput.value = '';
    
    setTimeout(() => {
        dreamCard.classList.add('show');
    }, 10);
    
    alert('شكرًا لك على مشاركة حلمك! نتمنى لك تحقيق كل ما تطمح إليه.');
}

function animateElements() {
    const elements = document.querySelectorAll('.animate-in');
    elements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('show');
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

window.onload = function() {
    animateElements();
    
    window.addEventListener('scroll', animateElements);
    
    if (document.getElementById('polls').classList.contains('active')) {
        drawPollChart();
    }
};