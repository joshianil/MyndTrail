// SHOW MENU
const showMenu = (toggleId, navId) => {
	const mobileNavToggle = document.getElementById(toggleId);
	const mobileNav = document.getElementById(navId);

	mobileNavToggle?.addEventListener('click', () => {
		mobileNavToggle?.classList.toggle('show-mobile-icons');
		mobileNav?.classList.toggle('show-mobile-nav');
	});
};
showMenu('mobile-nav-toggle', 'nav-list');

// IMAGE LIGHTBOX
document.addEventListener('DOMContentLoaded', () => {
	const lightbox = document.getElementById('lightbox-modal');
	const lightboxContent = document.getElementById('lightBoxModalContent');
	const closeBtn = document.querySelector('.lightbox-modal-close');
	const prevBtn = document.querySelector('.lightbox-modal-prev-btn');
	const nextBtn = document.querySelector('.lightbox-modal-next-btn');
	const items = document.querySelectorAll('.image-lightbox-item');
	let currentIndex = 0;

	if (lightbox) {
		// Image URLs (extracted from background-image styles)
		const images = Array.from(items).map(item => {
			const style = window.getComputedStyle(item);
			return style.backgroundImage.slice(4, -1).replace(/"/g, "");
		});

		// Open lightbox
		items.forEach(item => {
			item.addEventListener('click', () => {
				currentIndex = parseInt(item.dataset.index);
				showImage(currentIndex);
				lightbox.classList.add('active');
			});
		});

		// Close lightbox
		closeBtn.addEventListener('click', () => {
			lightbox.classList.remove('active');
			lightboxContent.innerHTML = '';
		});

		// Navigate to previous image
		prevBtn.addEventListener('click', () => {
			currentIndex = (currentIndex - 1 + images.length) % images.length;
			showImage(currentIndex);
		});

		// Navigate to next image
		nextBtn.addEventListener('click', () => {
			currentIndex = (currentIndex + 1) % images.length;
			showImage(currentIndex);
		});

		// Show image at current index
		function showImage(index) {
			lightboxContent.innerHTML = `<img src="${images[index]}" alt="Gallery image ${index + 1}">`;
		}

		// Keyboard navigation
		document.addEventListener('keydown', (e) => {
			if (lightbox.classList.contains('active')) {
				if (e.key === 'ArrowLeft') {
					prevBtn.click();
				} else if (e.key === 'ArrowRight') {
					nextBtn.click();
				} else if (e.key === 'Escape') {
					closeBtn.click();
				}
			}
		});
	}
});