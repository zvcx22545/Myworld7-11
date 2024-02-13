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

document.getElementById('dropdownContainer').addEventListener('click', function () {
  this.classList.toggle('active');
});
document.getElementById('dropdownContainer2').addEventListener('click', function () {
  this.classList.toggle('active');
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