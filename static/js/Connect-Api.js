$(document).ready(function() {
    $('#form-submit').submit(function(event) {
      // Prevent the default form submission behavior
      event.preventDefault();
  
      // Get the form data
      let formData = new FormData(this);
  
      // Make sure to append the image file to the FormData object if it exists
      let fileInput = document.getElementById('upload-img');
      if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        formData.append("file", fileInput.files[0]);
      }
  
      // Define AJAX settings
      let UploadFile = {
        url: 'https://games.myworld-store.com/api/upload/file',
        method: 'POST',
        timeout: 0,
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0'
        },
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        data: formData
      };
  
      // Make AJAX request
      $.ajax(UploadFile)
        .done(function(response) {
          // Handle the API response
          console.log(response);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          // Handle errors
          console.error('Error:', textStatus, errorThrown);
        });
    });
  });
  
  var settings = {
    "url": "https://games.myworld-store.com/api-dev//options/product",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });