let isRotated = false; // Track the rotation state

document.querySelectorAll('.select-Box').forEach(function(selectBox) {
  // Attach click event listener to each select element
  selectBox.addEventListener('click', function(event) {
    // Prevent the default action to manually control the rotation
    event.preventDefault();

    const angleIcon = this.parentElement.querySelector('.fas.fa-angle-down'); // Select the icon within the same container

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

  // Attach change event listener to each select element
  selectBox.addEventListener("change", function () {
    const angleIcon = this.parentElement.querySelector(".fas.fa-angle-down");
    // เมื่อ option ถูกเลือก, ตั้งค่าการหมุนเป็น 0 องศา
    angleIcon.style.transform = "rotate(0deg)";
    // อัพเดตสถานะการหมุนใน dataset
    this.dataset.isRotated = "false";
  });
});

const selectBox = document.getElementById('selectBox');
    const selectedOption = document.getElementById('selectedOption');

    selectBox.addEventListener('change', function() {
        selectedOption.textContent = this.options[this.selectedIndex].textContent;
    });

const selectBox1 = document.getElementById('sellerSelectBox');
    const selectedOption1 = document.getElementById('selectedOption1');

    selectBox1.addEventListener('change', function() {
        selectedOption1.textContent = this.options[this.selectedIndex].textContent;
    });

const priceInput = document.getElementById('Price');

    priceInput.addEventListener('blur', function(event) {
        this.value = parseFloat(this.value).toFixed(2);
    });