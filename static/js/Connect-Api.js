$(document).ready(function() {
  // Initial API calls to populate dropdowns
  // (Your GetProduct and GetAdmin AJAX calls here)

  // Form submission handler
  $("#form-submit").on("submit", function(e) {
      e.preventDefault(); // Prevent default form submission

      // Collect user input
      let phone = $("#Telephone").val();
      let productId = $("#selectBox").val(); // Assuming this is how you get the selected product ID
      let adminId = $("#sellerSelectBox").val(); // Assuming this is how you get the selected admin ID
      let Price = $("#Price").val(); // Assuming this is how you get the selected admin ID
      let imageUrl = null; // This will hold the URL after image upload

      // Check if image is selected for upload
      let fileInput = document.getElementById('upload-img');
      if (fileInput.files.length > 0) {
          let formData = new FormData();
          formData.append("file", fileInput.files[0]);

          // Image Upload AJAX call
          $.ajax({
              url: 'https://games.myworld-store.com/api/upload/file',
              method: 'POST',
              headers: {
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0'
              },
              processData: false,
              contentType: false,
              mimeType: 'multipart/form-data',
              data: formData,
              success: function(response) {
                  imageUrl = response.url; // Assuming response contains the URL in this property
                  // Now proceed to submit form data including the image URL
                  submitFormData(phone, productId, adminId,Price, imageUrl,);
              },
              error: function(jqXHR, textStatus, errorThrown) {
                  console.error('Error uploading image:', textStatus, errorThrown);
              }
          });
      } else {
          // No image to upload, proceed to submit form data
          submitFormData(phone, productId, adminId,Price, imageUrl);
      }
  });

  function submitFormData(phone, productId, adminId,Price, imageUrl) {
      // Prepare data for Submitform API
      let data = {
          phone: phone,
          admin_id: adminId,
          slip_image_url: imageUrl,
          products: [
              {
                  id: productId,
                  price: Price // This should be dynamically set based on selected product
              }
          ]
      };

      // Submitform API AJAX call
      $.ajax({
          url: "https://games.myworld-store.com/api-dev//orders/shopTransaction",
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0"
          },
          data: JSON.stringify(data),
          success: function(response) {
              console.log('Form submitted successfully:', response);
              // Handle success, maybe show a success message or redirect
          },
          error: function(jqXHR, textStatus, errorThrown) {
              console.error('Error submitting form:', textStatus, errorThrown);
              // Handle error
          }
      });
  }
});
  
  var GetProduct = {
    url: "https://games.myworld-store.com/api-dev//options/product",
    method: "GET",
    timeout: 0,
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0",
    },
};

$.ajax(GetProduct)
    .done(function (response) {
        // Clear previous options
        $("#selectBox").empty();

        // Add default option
        $("#selectBox").append('<option value="" disabled selected>กรุณาเลือกประเภทสินค้า</option>');

        // Add options fetched from API
        response.forEach(function (option) {
          var displayName = option.name.length > 12 ? option.name.slice(0, 20) + '...' : option.name;
          $("#selectBox").append('<option value="' + option.id + '">' + displayName + '</option>');
          
        });
    })
    .fail(function (xhr, status, error) {
        console.error("Error fetching products:", error);
    });


    var Getadmin = {
      "url": "https://games.myworld-store.com/api-dev//options/admin",
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0"
      },
    };
    
    $.ajax(Getadmin)
    .done(function (response) {
        // Clear previous options
        $("#sellerSelectBox").empty();

        // Add default option
        $("#sellerSelectBox").append('<option value="" disabled selected>กรุณาเลือกประเภทสินค้า</option>');

        // Add options fetched from API
        response.forEach(function (optionAdmin) {
            $("#sellerSelectBox").append('<option value="' + optionAdmin.admin_id + '">' + optionAdmin.name + '</option>');

        });
    })
    .fail(function (xhr, status, error) {
        console.error("Error fetching products:", error);
    });