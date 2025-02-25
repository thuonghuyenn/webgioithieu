document.addEventListener('DOMContentLoaded', function() {
    // Read More functionality for announcements
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.previousElementSibling;
            const fullText = content.getAttribute('data-full-text') || content.textContent;
            
            if (this.textContent === 'Read More') {
                content.setAttribute('data-full-text', content.textContent);
                content.textContent = fullText;
                this.textContent = 'Read Less';
            } else {
                content.textContent = content.textContent.substring(0, 100) + '...';
                this.textContent = 'Read More';
            }
        });
    });

    // View Lesson Modal
    const viewLessonButtons = document.querySelectorAll('.view-lesson-btn');
    
    viewLessonButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lessonTitle = this.closest('.lesson-card').querySelector('h3').textContent;
            alert(`Opening lesson: ${lessonTitle}`);
            // Here you could implement a modal or redirect to a lesson page
        });
    });

    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe announcement cards
    document.querySelectorAll('.announcement-card').forEach(card => {
        observer.observe(card);
    });

    // Observe event cards
    document.querySelectorAll('.event-card').forEach(card => {
        observer.observe(card);
    });

    // Observe lesson cards
    document.querySelectorAll('.lesson-card').forEach(card => {
        observer.observe(card);
    });
});