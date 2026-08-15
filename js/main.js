// ==========================================
// MAIN JAVASCRIPT: City Evolution Slider & Demographic Chart
// ==========================================

// 1. City Evolution Draggable Slider Logic
const slider = document.getElementById('compareSlider');
const overlay = document.getElementById('compareOverlay');

if (slider && overlay) {
    slider.addEventListener('input', (e) => {
        overlay.style.width = e.target.value + '%';
    });
}

// 2. Animated Population Chart (Scroll Triggered)
const chartCanvas = document.getElementById('populationChart');
if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    let chartRendered = false;

    function renderPopulationChart() {
        new Chart(ctx, {
            type: 'bar', 
            data: {
                labels: ['1981', '2001', '2012', '2026 (Est)'],
                datasets: [{
                    label: 'Bandarawela Population Growth',
                    data: [15000, 22000, 27000, 35000],
                    backgroundColor: 'rgba(46, 204, 145, 0.6)',
                    borderColor: '#2ecc91',
                    borderWidth: 2,
                    borderRadius: 5,
                    hoverBackgroundColor: '#2ecc91'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2500,
                    easing: 'easeOutQuart'
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: { color: '#94a39d' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a39d' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: '#ffffff', font: { family: "'Montserrat', sans-serif" } }
                    }
                }
            }
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !chartRendered) {
                renderPopulationChart();
                chartRendered = true;
            }
        });
    }, { threshold: 0.3 });

    observer.observe(chartCanvas);
}

// 3. Community Feedback Form Handler
const feedbackForm = document.getElementById('feedbackForm');
const formStatus = document.getElementById('formStatus');

if (feedbackForm) {
    feedbackForm.addEventListener('submit', async function(e) {
        e.preventDefault(); 
        
        const data = new FormData(feedbackForm);
        
        try {
            const response = await fetch(feedbackForm.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.innerText = "Thank you! Your feedback has been received.";
                formStatus.style.display = "block";
                feedbackForm.reset();
            } else {
                formStatus.innerText = "Oops! There was a problem submitting your feedback.";
                formStatus.style.color = "#e74c3c"; 
                formStatus.style.display = "block";
            }
        } catch (error) {
            formStatus.innerText = "Error submitting form. Please check your connection.";
            formStatus.style.color = "#e74c3c";
            formStatus.style.display = "block";
        }
    });
}
