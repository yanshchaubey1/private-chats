// Hide popup when "Explore Movies" button is clicked
document.getElementById("exploreBtn").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

// Function to handle video upload
function uploadVideo() {
  const videoInput = document.getElementById('videoUpload');
  const videoFile = videoInput.files[0];

  if (!videoFile) {
    alert('Please select a video file to upload.');
    return;
  }

  const formData = new FormData();
  formData.append('video', videoFile);

  // Send the video file to the server
  fetch('/upload', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Display the uploaded video
      const videoContainer = document.getElementById('videoContainer');
      const videoElement = document.createElement('video');
      videoElement.src = data.videoPath;  // Use video path from server response
      videoElement.controls = true;

      // Add video to container
      videoContainer.appendChild(videoElement);
    })
    .catch((error) => {
      console.error('Error uploading video:', error);
    });
}

// Fetch and display previously uploaded videos on page load
window.onload = function() {
  fetch('/get-videos')
    .then(response => response.json())
    .then(videos => {
      const videoContainer = document.getElementById('videoContainer');
      videos.forEach(videoPath => {
        const videoElement = document.createElement('video');
        videoElement.src = videoPath; // Use the video path from server response
        videoElement.controls = true;
        videoContainer.appendChild(videoElement);
      });
    })
    .catch(error => {
      console.error('Error fetching videos:', error);
    });
}
