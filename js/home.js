document.addEventListener('DOMContentLoaded', function() {
    // Read More Button Functionality
    const readMoreBtn = document.querySelector('.read-more-btn');
    if (readMoreBtn) {
        const additionalText = `Our class consists of 30 dedicated students and 5 passionate teachers. 
            We believe in fostering a supportive learning environment where every student can reach their full potential. 
            Through various activities and events, we build strong bonds and create lasting memories together.`;
        
        readMoreBtn.addEventListener('click', function() {
            const aboutText = document.querySelector('.about-text p');
            if (this.textContent === 'Read More') {
                aboutText.textContent += ' ' + additionalText;
                this.textContent = 'Read Less';
            } else {
                aboutText.textContent = aboutText.textContent.replace(additionalText, '');
                this.textContent = 'Read More';
            }
        });
    }

    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonials[index].classList.add('active');
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }

    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .news-card, .about-content, .testimonial-card').forEach(element => {
        observer.observe(element);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 30; // Divide animation into 30 steps
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.round(current);
                }
            }, 50);
        });
    }

    // Trigger stats animation when the about section comes into view
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateStats();
                statsObserver.unobserve(aboutSection);
            }
        }, observerOptions);

        statsObserver.observe(aboutSection);
    }
});