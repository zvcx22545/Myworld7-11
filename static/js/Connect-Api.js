$(document).ready(function() {
  // Initial API calls to populate dropdowns
  // (Your GetProduct and GetAdmin AJAX calls here)

  // Form submission handler
  $("#form-submit").on("submit", function(e) {
    e.preventDefault(); // Prevent default form submission

    // Collect user input
    let phone = $("#Telephone").val();
    let adminId = $("#sellerSelectBox").val(); // Assuming this is how you get the selected admin ID
    let mainProductId = $("#selectBox").val();
    let products = []; // Array to hold all products

    // Iterate over all product fields
    $(".container-form").each(function() {
        let productId = $(this).find(".select-Box").val(); // Adjust selector as needed
        let price = parseInt($(this).find(".Price").val()); // Adjust selector as needed
        if (productId && !isNaN(price)) {
            products.push({ id: productId, price: price});
        }
    });
    
    if (mainProductId) {
      // Add the main product with its details to the products array
      // You might need to adjust this to include a default price or fetch the price from another input if applicable
      let mainProductPrice = parseInt($("#Price").val()); // Assuming there's a price input for the main product
      if (!isNaN(mainProductPrice)) { // Check if main product price is a valid number
        products.push({ id: mainProductId, price: mainProductPrice });
    }
  }
  console.log(products)

  let imageUrl = null; // Initial imageUrl

  let fileInput = document.getElementById('upload-img');
  if (fileInput.files.length > 0) {
      let formData = new FormData();
      formData.append("file", fileInput.files[0]);

      // Adjusted Image Upload AJAX call
      let settings = {
          "url": "https://games.myworld-store.com/api-dev//upload/file",
          "method": "POST",
          "timeout": 0,
          "processData": false,
          "mimeType": "multipart/form-data",
          "contentType": false,
          "data": formData
      };

      $.ajax(settings).done(function (response) {
          // Assuming the response is JSON and contains a property named 'url'
          let jsonResponse = JSON.parse(response); // Parse the response as JSON
          imageUrl = jsonResponse.url; // Extract the image URL

          // Now that you have the imageUrl, proceed to submit form data
          submitFormData(phone, adminId, products, imageUrl);
      }).fail(function(jqXHR, textStatus, errorThrown) {
          console.error('Error uploading image:', textStatus, errorThrown);
          // You can still submit the form without an image URL if necessary
          submitFormData(phone, adminId, products, imageUrl);
      });
    } else {
        // No image to upload, proceed to submit form data
        submitFormData(phone, adminId, products, imageUrl);
    }
});



function submitFormData(phone, adminId, products, imageUrl) {
    // Prepare data for Submitform API
    let data = {
        phone: phone,
        admin_id: adminId,
        slip_image_url: imageUrl,
        products: products
    };
    console.log(data)
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
            SuccessOnSubmit();
            
            // Handle success, maybe show a success message or redirect
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error submitting form:', textStatus, errorThrown);
            // Handle error
        }
    });
}

const SuccessOnSubmit = () => {
  const processLoading = document.getElementById('processLoading');
    const successDiv = document.getElementById('success');
    const closeBTN = document.getElementById('closeSuccess');
    const form = document.getElementById('form-submit');
    const top = document.getElementById('top-contents');
    const sentButton = document.getElementById('sent'); // Ensure this button exists in your HTML

    // Immediately show loading, hide form and top contents
    processLoading.style.display = 'flex';
    form.style.display = 'none';
    top.style.display = 'none';

    // After a delay (e.g., simulating processing time or waiting for a background task)
    setTimeout(() => {
        // Hide loading, show success message and the close button
        processLoading.style.display = 'none';
        successDiv.style.display = 'block';
        closeBTN.style.display = 'flex'; // 'none' followed by 'flex' seems redundant, just set to 'flex'

        // Countdown and potential page reload logic here
        var countdown = 3; 
        var countdownButton = document.getElementById("countdownButton");
        countdownButton.innerText = "( " + countdown + " ) ปิด";

        var countdownInterval = setInterval(function () {
            countdown--;
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                countdownButton.innerText = "เสร็จสิ้น";
                setTimeout(function () {
                    location.reload(); // Or redirect as needed
                }, 1000);
            } else {
                countdownButton.innerText = "( " + countdown + " ) ปิด";
            }
        }, 1000);
    }, 5000);
}

const paymentValue = (Paymentinput) => {
  let paymentInput = document.getElementById(Paymentinput);
  if (paymentInput.files.length > 0) {
    console.log("Payment is successfuly")
  } else {
    showAlert("แจ้งเตือน!", "กรุณาอัพโหลดสลิปชำระเงิน", "error");
  }
};

let checkPayment = document.getElementById("sent"); // Corrected variable name
checkPayment.addEventListener("click", function () {
  paymentValue("upload-img");
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


    
  // function submitFormData(phone, productId, adminId,Price, imageUrl) {
  //     // Prepare data for Submitform API
  //     let data = {
  //         phone: phone,
  //         admin_id: adminId,
  //         slip_image_url: imageUrl,
  //         products: [
  //             {
  //                 id: productId,
  //                 price: Price // This should be dynamically set based on selected product
  //             }
  //         ]
  //     };

  //     // Submitform API AJAX call
  //     $.ajax({
  //         url: "https://games.myworld-store.com/api-dev//orders/shopTransaction",
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json",
  //             "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0"
  //         },
  //         data: JSON.stringify(data),
  //         success: function(response) {
  //             console.log('Form submitted successfully:', response);
  //             // Handle success, maybe show a success message or redirect
  //         },
  //         error: function(jqXHR, textStatus, errorThrown) {
  //             console.error('Error submitting form:', textStatus, errorThrown);
  //             // Handle error
  //         }
  //     });
  // }