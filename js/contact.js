document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Validate form
            if (validateForm(formData)) {
                // Simulate form submission
                submitForm(formData);
            }
        });
    }

    function validateForm(data) {
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (data.name.length < 2) {
            showError('Please enter a valid name');
            return false;
        }

        if (!emailRegex.test(data.email)) {
            showError('Please enter a valid email address');
            return false;
        }

        if (data.subject.length < 2) {
            showError('Please enter a subject');
            return false;
        }

        if (data.message.length < 10) {
            showError('Message must be at least 10 characters long');
            return false;
        }

        return true;
    }

    function submitForm(data) {
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;
        
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';

        // Simulate API call
        setTimeout(() => {
            // Show success message
            showSuccess('Thank you! Your message has been sent successfully.');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.disabled = false;
            btnText.textContent = originalText;
        }, 1500);
    }

    function showSuccess(message) {
        // Remove existing messages
        removeMessages();

        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;

        // Insert before form
        contactForm.parentNode.insertBefore(successDiv, contactForm);

        // Remove message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    function showError(message) {
        // Remove existing messages
        removeMessages();

        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;

        // Insert before form
        contactForm.parentNode.insertBefore(errorDiv, contactForm);

        // Remove message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    function removeMessages() {
        const messages = document.querySelectorAll('.success-message, .error-message');
        messages.forEach(message => message.remove());
    }

    // Add animation to info cards
    const infoCards = document.querySelectorAll('.info-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    infoCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
});