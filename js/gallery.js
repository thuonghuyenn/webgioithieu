document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-out forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeLightbox = lightbox.querySelector('.close-lightbox');
    const prevButton = lightbox.querySelector('.lightbox-prev');
    const nextButton = lightbox.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    const visibleItems = () => Array.from(galleryItems).filter(item => 
        item.style.display !== 'none'
    );

    // Open lightbox
    galleryItems.forEach(item => {
        item.querySelector('.view-btn').addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-overlay');
            
            currentImageIndex = visibleItems().indexOf(item);
            
            lightboxImg.src = img.src;
            lightboxCaption.innerHTML = caption.innerHTML;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Navigate through images
    prevButton.addEventListener('click', () => {
        const items = visibleItems();
        currentImageIndex = (currentImageIndex - 1 + items.length) % items.length;
        const prevItem = items[currentImageIndex];
        
        lightboxImg.src = prevItem.querySelector('img').src;
        lightboxCaption.innerHTML = prevItem.querySelector('.gallery-overlay').innerHTML;
    });

    nextButton.addEventListener('click', () => {
        const items = visibleItems();
        currentImageIndex = (currentImageIndex + 1) % items.length;
        const nextItem = items[currentImageIndex];
        
        lightboxImg.src = nextItem.querySelector('img').src;
        lightboxCaption.innerHTML = nextItem.querySelector('.gallery-overlay').innerHTML;
    });

    // Close lightbox with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
})