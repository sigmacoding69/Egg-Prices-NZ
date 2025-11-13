// About page functionality

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('about.html')) {
        initializeAboutPage();
    }
});

function initializeAboutPage() {
    animateStats();
    setupContactForm();
}

function animateStats() {
    // Animate the stats numbers when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    });
    
    const statNumbers = document.querySelectorAll('.stat-item h3');
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateNumber(element) {
    const text = element.textContent;
    const number = parseFloat(text.replace(/[^0-9.]/g, ''));
    const suffix = text.replace(/[0-9.,]/g, '');
    
    if (isNaN(number)) return;
    
    let current = 0;
    const increment = number / 50; // 50 steps
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        if (number >= 1000) {
            element.textContent = formatLargeNumber(current) + suffix;
        } else {
            element.textContent = current.toFixed(1) + suffix;
        }
    }, 30);
}

function formatLargeNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toFixed(0);
}

function setupContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name') || event.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    const topic = formData.get('topic') || event.target.querySelector('select').value;
    const message = formData.get('message') || event.target.querySelector('textarea').value;
    
    // Simulate form submission
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Reset form
        event.target.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showToast('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // In a real application, you would send this data to your backend
        console.log('Contact form submission:', { name, email, topic, message });
        
    }, 2000);
}


