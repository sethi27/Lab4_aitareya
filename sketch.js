let videoElement;
let imageElement;
let isPlaying = true;
let isMuted = false;
let vid;
let currentImageIndex = 0;

// Array of image URLs
const imageUrls = [
    'https://images.pexels.com/photos/931007/pexels-photo-931007.jpeg',  // Waterfall
    'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',  // Mountain Lake
    'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg'   // Forest
];

function setup() {
    noCanvas(); // Prevent default canvas creation
    
    //  container div
    let container = createDiv('');
    container.id('mediaContainer');
    container.style('display', 'flex');
    container.style('flex-direction', 'column');
    container.style('align-items', 'center');
    container.style('gap', '20px');
    container.style('width', '100%');
    container.style('max-width', '800px');
    container.style('margin', '0 auto');
    
    //  image controls
    let imageControls = createDiv('');
    imageControls.style('display', 'flex');
    imageControls.style('gap', '10px');
    imageControls.style('margin', '10px');
    imageControls.parent(container);
    
    // Previous image button
    let prevBtn = createButton('Previous Image');
    prevBtn.mousePressed(() => changeImage(-1));
    styleButton(prevBtn, '#2196F3');
    prevBtn.parent(imageControls);
    
    // Next image button
    let nextBtn = createButton('Next Image');
    nextBtn.mousePressed(() => changeImage(1));
    styleButton(nextBtn, '#2196F3');
    nextBtn.parent(imageControls);
    
    //  image using createImg()
    imageElement = createImg(imageUrls[currentImageIndex], '');
    imageElement.size(400, 300);
    imageElement.parent(container);
    imageElement.style('border', '2px solid #2E7D32');
    imageElement.style('border-radius', '8px');
    imageElement.style('object-fit', 'cover');
    imageElement.style('width', '100%');
    imageElement.style('max-width', '400px');
    imageElement.style('height', '300px');
    
    //  image interaction
    imageElement.mouseOver(() => {
        imageElement.style('transform', 'scale(1.05)');
        imageElement.style('transition', 'transform 0.3s ease');
    });
    imageElement.mouseOut(() => {
        imageElement.style('transform', 'scale(1)');
        imageElement.style('transition', 'transform 0.3s ease');
    });
    
    // video element
    videoElement = createVideo(
        'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        () => {
            videoElement.loop();
            videoElement.volume(0.5);
            videoElement.play();
        }
    );
    videoElement.size(400, 300);
    videoElement.parent(container);
    videoElement.style('border', '2px solid #2E7D32');
    videoElement.style('border-radius', '8px');
    videoElement.style('width', '100%');
    videoElement.style('max-width', '400px');
    videoElement.style('height', '300px');
    videoElement.style('object-fit', 'cover');
    videoElement.style('background-color', '#000');
    
    //  video controls container
    let videoControls = createDiv('');
    videoControls.style('display', 'flex');
    videoControls.style('gap', '10px');
    videoControls.style('margin', '10px');
    videoControls.style('flex-wrap', 'wrap');
    videoControls.style('justify-content', 'center');
    videoControls.parent(container);
    
    // Video controls
    let playBtn = createButton('Play');
    playBtn.mousePressed(() => videoElement.play());
    styleButton(playBtn, '#4CAF50');
    playBtn.parent(videoControls);
    
    let pauseBtn = createButton('Pause');
    pauseBtn.mousePressed(() => videoElement.pause());
    styleButton(pauseBtn, '#f44336');
    pauseBtn.parent(videoControls);
    
    let volumeUpBtn = createButton('Volume Up');
    volumeUpBtn.mousePressed(() => {
        let vol = min(videoElement.volume() + 0.1, 1);
        videoElement.volume(vol);
    });
    styleButton(volumeUpBtn, '#2196F3');
    volumeUpBtn.parent(videoControls);
    
    let volumeDownBtn = createButton('Volume Down');
    volumeDownBtn.mousePressed(() => {
        let vol = max(videoElement.volume() - 0.1, 0);
        videoElement.volume(vol);
    });
    styleButton(volumeDownBtn, '#2196F3');
    volumeDownBtn.parent(videoControls);
}

// Function to change the image
function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + imageUrls.length) % imageUrls.length;
    imageElement.attribute('src', imageUrls[currentImageIndex]);
}

// Helper function to style buttons
function styleButton(btn, bgColor) {
    btn.style('padding', '8px 16px');
    btn.style('margin', '5px');
    btn.style('background-color', bgColor);
    btn.style('color', 'white');
    btn.style('border', 'none');
    btn.style('border-radius', '4px');
    btn.style('cursor', 'pointer');
    btn.style('font-family', 'Arial');
    btn.mouseOver(() => btn.style('opacity', '0.8'));
    btn.mouseOut(() => btn.style('opacity', '1'));
}

function videoLoaded(video) {
    console.log('Video is loaded and ready to play');
    vid.volume(0.5); // Set volume to 50%
    //  play the video
    vid.play().catch(function(error) {
        console.log("Video play failed:", error);
    });
}

function draw() {
    background(240);
    
    // some text
    fill(0);
    textSize(16);
    text('Loaded Image', 50, 80);
    text('Video Element', width/2 - 100, 80);
    
    //  frame around the video
    noFill();
    stroke(0);
    strokeWeight(2);
    rect(width/2 - 200, 100, 400, 300);
}

function togglePlay() {
    if (vid.elt.paused) {
        vid.play().catch(function(error) {
            console.log("Video play failed:", error);
        });
    } else {
        vid.pause();
    }
}

function stopVideo() {
    vid.pause();
    vid.time(0);
}

function toggleMute() {
    if (isMuted) {
        myVideo.volume(1);
        document.getElementById('toggleMute').textContent = 'Mute';
    } else {
        myVideo.volume(0);
        document.getElementById('toggleMute').textContent = 'Unmute';
    }
    isMuted = !isMuted;
} 