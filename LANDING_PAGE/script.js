/* FUNCTION: Change Background Image + Active Content */
function changeBg(bg, title) {

    // Select banner container
    const banner = document.querySelector('.banner');

    // Select all movie content sections
    const contents = document.querySelectorAll('.content');

    // Change banner background image dynamically
    banner.style.background = `url(${bg}) center/cover no-repeat`;

    // Loop through all content blocks
    contents.forEach(content => {

        // Remove active class from all
        content.classList.remove('active');

        // Add active class only to selected movie section
        if (content.classList.contains(title)) {
            content.classList.add('active');
        }
    });
}


/* FUNCTION: Toggle Trailer Video Popup */
function toggleVideo() {

    // Select trailer container
    const trailer = document.querySelector('.trailer');

    // Select video element
    const video = document.querySelector('.trailer video');

    // Toggle active class (show/hide trailer)
    trailer.classList.toggle('active');

    // If trailer is opened
    if (trailer.classList.contains('active')) {

        // Restart video
        video.currentTime = 0;

        // Unmute video
        video.muted = false;

        // Play video
        video.play();

    } else {

        // Pause video when closed
        video.pause();
    }
}
