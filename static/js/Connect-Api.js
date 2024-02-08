$(document).ready(function() {
    
  

  $('#form-submit').submit(function(event) {

      // Prevent the default form submission behavior
      event.preventDefault();
  
      // Get the form data
      let formData = new FormData(this);
      var settings = {
        "url": "https://games.myworld-store.com/api-dev//orders/shopTransaction",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0"
        },
        "data": JSON.stringify({
          "phone": "0983031004",
          "admin_id": "9aff03e2-8bb8-40a2-a8e3-8478e1d5553b",
          "slip_image_url": imageUrl,
          "products": [
            {
              "id": "1003928433",
              "price": 130
            }
          ]
        }),
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });
  
      // Make sure to append the image file to the FormData object if it exists
      let fileInput = document.getElementById('upload-img');
      if (fileInput.files.length > 0) {
        let file = fileInput.files[0];
        formData.append("file", fileInput.files[0]);
      }
      let imageUrl = null
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
          imageUrl = response.url
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          // Handle errors
          console.error('Error:', textStatus, errorThrown);
        });
    });
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
        $("#sellerSelectBox").append('<option value="" disabled selected>ผู้ขายสินค้า</option>');

        // Add options fetched from API
        response.forEach(function (optionAdmin) {
            $("#sellerSelectBox").append('<option value="' + optionAdmin.admin_id + '">' + optionAdmin.name + '</option>');

        });
    })
    .fail(function (xhr, status, error) {
        console.error("Error fetching products:", error);
    });