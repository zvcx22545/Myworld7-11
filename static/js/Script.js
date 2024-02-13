// let isRotated = false; // Track the rotation state
// document.querySelectorAll(".select-Box").forEach(function (selectBox) {
//   selectBox.addEventListener("click", function (event) {
//     event.preventDefault(); // ป้องกันการทำงานเริ่มต้นของเหตุการณ์
//     const angleIcon = this.parentElement.querySelector(".fas.fa-angle-down");
//     if (!isRotated) {
//       angleIcon.style.transform = "rotate(180deg)";
//       isRotated = true;
//     } else {
//       angleIcon.style.transform = "rotate(0deg)";
//       isRotated = false;
//     }

//     if (!isRotated) this.size = 1;
//   // เมื่อมีการคลิกที่ selectBox, ตรวจสอบและเปลี่ยนแปลงสถานะของ angle icon
//   selectBox.addEventListener("click", function () {
//     // ตรวจสอบสถานะการหมุนจาก dataset
//     let isRotated = angleIcon.dataset.isRotated === "true";
//     // เปลี่ยนแปลงการหมุนของ angle icon
//     angleIcon.style.transform = isRotated ? "rotate(0deg)" : "rotate(180deg)";
//     // อัปเดตสถานะการหมุนใน dataset
//     angleIcon.dataset.isRotated = isRotated ? "false" : "true";
//   });

//   // เมื่อมีการเปลี่ยนแปลงค่าของ selectBox (เลือก option), รีเซ็ตการหมุนของ angle icon
//   selectBox.addEventListener("change", function () {
//     const angleIcon = this.parentElement.querySelector(".fas.fa-angle-down");
//     // เมื่อ option ถูกเลือก, ตั้งค่าการหมุนเป็น 0 องศา
//     angleIcon.style.transform = "rotate(0deg)";
//     isRotated = false;
//     this.blur();
//     this.size = 0;
//     // อัพเดตสถานะการหมุนใน dataset
//   });
// });
// })

const dropdownContainer = document.getElementById('dropdownContainer');

dropdownContainer.addEventListener('touchstart', function(event) {
    event.stopPropagation();
});

dropdownContainer.addEventListener('click', function(event) {
    event.stopPropagation();
    this.classList.toggle('active');
});

document.addEventListener('touchstart', function(event) {
    const dropdownContainer = document.getElementById('dropdownContainer');
    const target = event.target;
    const isClickInsideDropdown = dropdownContainer.contains(target);
    const isDropdownActive = dropdownContainer.classList.contains('active');

    if (!isClickInsideDropdown && isDropdownActive) {
        dropdownContainer.classList.remove('active');
    }
    const selectBox = document.getElementById('selectBox');

// เพิ่ม event listener สำหรับการเลือก option
    selectBox.addEventListener('change', function(event) {
    const dropdownContainer = document.getElementById('dropdownContainer');
    dropdownContainer.classList.remove('active');
  });
});

document.addEventListener('click', function(event) {
    const dropdownContainer = document.getElementById('dropdownContainer');
    const target = event.target;
    const isClickInsideDropdown = dropdownContainer.contains(target);
    const isDropdownActive = dropdownContainer.classList.contains('active');

    if (!isClickInsideDropdown && isDropdownActive) {
        dropdownContainer.classList.remove('active');
    }
});



const dropdownContainer2 = document.getElementById('dropdownContainer2');

dropdownContainer2.addEventListener('touchstart', function(event) {
    event.stopPropagation();
});

dropdownContainer2.addEventListener('click', function(event) {
    event.stopPropagation();
    this.classList.toggle('active');
});

document.addEventListener('touchstart', function(event) {
    const dropdownContainer = document.getElementById('dropdownContainer2');
    const target = event.target;
    const isClickInsideDropdown = dropdownContainer.contains(target);
    const isDropdownActive = dropdownContainer.classList.contains('active');

    if (!isClickInsideDropdown && isDropdownActive) {
        dropdownContainer.classList.remove('active');
    }
    const selectBox = document.getElementById('sellerSelectBox');

// เพิ่ม event listener สำหรับการเลือก option
    selectBox.addEventListener('change', function(event) {
    const dropdownContainer = document.getElementById('dropdownContainer2');
    dropdownContainer.classList.remove('active');
  });
});

document.addEventListener('click', function(event) {
    const dropdownContainer = document.getElementById('dropdownContainer2');
    const target = event.target;
    const isClickInsideDropdown = dropdownContainer.contains(target);
    const isDropdownActive = dropdownContainer.classList.contains('active');

    if (!isClickInsideDropdown && isDropdownActive) {
        dropdownContainer.classList.remove('active');
    }
});


// const selectBox = document.getElementById('selectBox');
//     const selectedOption = document.getElementById('selectedOption');
//     selectBox.addEventListener('change', function() {
//         selectedOption.textContent = this.options[this.selectedIndex].textContent;
//     });
// const selectBox1 = document.getElementById('sellerSelectBox');
//     const selectedOption1 = document.getElementById('selectedOption1');
//     selectBox1.addEventListener('change', function() {
//         selectedOption1.textContent = this.options[this.selectedIndex].textContent;
//     });
const priceInput = document.getElementById('Price');
    priceInput.addEventListener('blur', function(event) {
        this.value = parseFloat(this.value).toFixed(2);
    });