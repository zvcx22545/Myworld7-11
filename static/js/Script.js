let isRotated = false; // Track the rotation state

document.getElementById('selectBox').addEventListener('click', function(event) {
  // Prevent the default action to manually control the rotation
  event.preventDefault();
  
  const angleIcon = document.getElementById('angleIcon');
  if (!isRotated) {
    // Rotate 180 degrees
    angleIcon.style.transform = 'rotate(180deg)';
    isRotated = true;
  } else {
    // Rotate back to 0 degrees
    angleIcon.style.transform = 'rotate(0deg)';
    isRotated = false;
  }
  // Manually trigger the native click action if not rotated
  if (!isRotated) this.size = 1; // Hack to trigger the dropdown
});

document.getElementById('selectBox').addEventListener('change', function() {
  // Ensure the icon rotates back to 0 degrees upon selection
  document.getElementById('angleIcon').style.transform = 'rotate(0deg)';
  isRotated = false;
  this.blur(); // Remove focus from select to reset its state
  this.size = 0; // Reset size to default to close the dropdown
});