function showAlert(title, text, icon) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon || "error",
    confirmButtonText: "ตกลง",
    allowOutsideClick: true, // อนุญาตให้คลิกภายนอกเพื่อปิด modal
    showLoaderOnConfirm: true, // แสดง animation ในระหว่างกดปุ่มตกลง
    // backdrop: `
    // rgba(0,0,123,0.4)
    // url("https://www.icegif.com/wp-content/uploads/2023/01/icegif-85.gif")
    // no-repeat
    // center top
    // `,
    preConfirm: () => {
      // สมมติว่ามีการประมวลผลบางอย่าง (เช่น การร้องขอ AJAX)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000); // ประมาณ 2 วินาที
      });
    },
  });
}

let formCount = 1; // Start with one form
let value2 = 2;
let value3 = 3;


const addform = document.getElementById("add-form");
addform.addEventListener("click", () => {

  fetch("https://games.myworld-store.com/api//options/product", {
        method: "GET",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDUzMzYzNDR9.g0VSsvTajlOr_FsNiQBTuCbIUM-O24R5jCwREc_9eP0"
        },
    })
    .then(response => response.json())
    .then(data => {
        // Loop through the data and create option elements
        data.forEach(option => {
            let optionElement = document.createElement("option");
            optionElement.value = option.id;
            
            // if (window.innerWidth <= 430) {
            //     optionElement.textContent = option.name.length > 8 ? option.name.slice(0, 8) + "..." : option.name;
            // } else {
                optionElement.textContent = option.name;
            // }
            
            document.getElementById(selectBoxId).appendChild(optionElement);
            // console.log(optionElement.value);
            
        });
    })
    .catch(error => {
        console.error('Error fetching options:', error);
    });
  // if (formCount) {
  let formContainer = document.getElementById("container-form");
  let newForm = document.createElement("div");
  newForm.classList.add("container-form");
  let selectBoxId = `selectBox-${formCount}`;
  // formCount++;

  newForm.innerHTML = `
        <div class="w-full">
        <div class="grid">
            <label class="font-bold" for="type">ชิ้นที่ ${formCount + 1}</label>
            <label for="type">ประเภทสินค้า</label>
        </div>
        <div class="relative inline-block w-full h-[40px] mt-[0.5rem]">
            <!-- Adjust this div to use flex and justify-between for alignment -->
            <div
                class="bg-[#DEDEDE] border border-black rounded-lg p-2 cursor-pointer flex justify-end items-center w-full h-[40px]">
                <span class="me-auto selectedOption">My beer</span>
                <i id="angleIcon" class="fas fa-angle-down" style="transition: transform 0.2s;"></i>
            </div>
            <select id="${selectBoxId}" class="absolute inset-0 opacity-0 cursor-pointer w-full h-[40px] select-Box"
                required>
                <div id="selectedValueDisplay"></div>
                <option value="" disabled selected>กรุณาเลือกประเภทสินค้า</option>
                
  }</option>
            </select>
        </div>
    </div>
    <div class="grid items-end w-full">
            <div class="flex justify-end">
                <button type="button" class="flex items-end ml-2 p-1 text-red-500" onclick="deleteForm()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CE4D4D" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
            </div>
        <label for="Price-${formCount}">ราคา (บาท)</label>
        <input class="w-[100%] h-[40px] border-1 border-[#000] p-2 rounded-lg mt-[0.5rem] text-right Price" type="text" id="Price-${formCount}" required>
    </div>
      `;

  newForm.id = "container-form-" + formCount; // Update ID of the new form section
  formContainer.appendChild(newForm);
  showoption();
  assignEventListeners();
  
  let inputElements = document.querySelectorAll(".Price");
  // Loop through each input element and attach the event listener
  inputElements.forEach(function (inputElement) {
    inputElement.addEventListener("keypress", Blockcharater);
  });
  decimalformat();
  formCount++;
  value2++;
  value3++;
  // Assuming you're dynamically creating the select options with JS
  //   formCount++;
  //   }

});

const decimalformat = () => {
  const Pricedecumal = document.querySelectorAll('.Price'); // Note the '.' before 'Price' to select elements with the class 'Price'

  // Loop through each element in the NodeList
  Pricedecumal.forEach(function(input) {
      // Add blur event listener to each input element
      input.addEventListener('blur', function(event) {
          // Format the input value with commas for thousands separators and two decimal places
          if (this.value.trim() !== "") { // Check if the value is not empty after trimming whitespace
              let numericValue = parseFloat(this.value.replace(/,/g, "")); // Remove commas before parsing
              if (!isNaN(numericValue)) { // Check if the parsed numeric value is not NaN
                  this.value = numericValue.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              } else {
                  this.value = ""; // Reset the value to empty if parsing fails
              }
          }
      });
  });
}




function showoption() {
  document.querySelectorAll(".select-Box").forEach(function (selectBox) {
    selectBox.addEventListener("change", function () {
      let selectedOption = this.options[this.selectedIndex].textContent;

      // Check if the selected option text length is more than 15 characters
      if (selectedOption.length > 10) {
        // Slice the string to only include characters from the 13th to the 15th position
        // If you want to start from the 13th character to the end, you can use selectedOption.slice(12);
        // Adjust the start index and end index as needed
        selectedOption = selectedOption.slice(0, 10)+"..."; // Adjust indices as needed
      }

      this.parentNode.querySelector(".selectedOption").textContent = selectedOption;
    });
  });
}



function assignEventListeners() {
  document.querySelectorAll(".select-Box").forEach(function (selectBox) {
    const angleIcon = selectBox.parentElement.querySelector(".fas.fa-angle-down");

    // เมื่อมีการคลิกที่ selectBox, ตรวจสอบและเปลี่ยนแปลงสถานะของ angle icon
    selectBox.addEventListener("click", function () {
      // ตรวจสอบสถานะการหมุนจาก dataset
      let isRotated = angleIcon.dataset.isRotated === "true";
      // เปลี่ยนแปลงการหมุนของ angle icon
      angleIcon.style.transform = isRotated ? "rotate(0deg)" : "rotate(180deg)";
      // อัปเดตสถานะการหมุนใน dataset
      angleIcon.dataset.isRotated = isRotated ? "false" : "true";
    });

    // เมื่อมีการเปลี่ยนแปลงค่าของ selectBox (เลือก option), รีเซ็ตการหมุนของ angle icon
    selectBox.addEventListener("change", function () {
      const angleIcon = this.parentElement.querySelector(".fas.fa-angle-down");
      // เมื่อ option ถูกเลือก, ตั้งค่าการหมุนเป็น 0 องศา
      angleIcon.style.transform = "rotate(0deg)";
      // อัพเดตสถานะการหมุนใน dataset
      this.dataset.isRotated = "false";
    });
  });
}




// Block character function
function Blockcharater(event) {
  var regex = /^\d+$/; // Regular expression to match only numbers
  if (!regex.test(event.key)) {
    event.preventDefault(); // Prevent non-numeric characters
    showAlert("แจ้งเตือน!", "สามารถกรอกตัวเลขได้เท่านั้น!", "error");
  }
}

let inputElements = document.querySelectorAll(".Price");
// Loop through each input element and attach the event listener
inputElements.forEach(function (inputElement) {
  inputElement.addEventListener("keypress", Blockcharater);
});

// Delete Funtion
function deleteForm() {
  let formContainer = document.getElementById("container-form");
  let formToDelete = formContainer.lastElementChild;
  if (formToDelete) {
    formContainer.removeChild(formToDelete);
    // ปรับค่า formCount, value2, และ value3 ลดลงตามจำนวนที่ลบ
    formCount--;
    value2--;
    value3--;
  }
}

document.addEventListener('DOMContentLoaded', function () {
    const selectedOptionElement = document.getElementById('selectedOption');
    const sellerSelectBox = document.getElementById('selectBox');
    const selectedOptionElement1 = document.getElementById('selectedOption1');
    const sellerSelectBox1 = document.getElementById('sellerSelectBox');

    function updateSelectedOption1(selectedOptionElement, sellerSelectBox) {
        const selectedOptionText = sellerSelectBox.options[sellerSelectBox.selectedIndex].text;

        if (selectedOptionText.length > 10) {
            selectedOptionElement.textContent = selectedOptionText.slice(0, 10) + "...";
        } else {
            selectedOptionElement.textContent = selectedOptionText;
        }
    }

    function updateSelectedOption2(selectedOptionElement, sellerSelectBox) {
        const selectedOptionText = sellerSelectBox.options[sellerSelectBox.selectedIndex].text;

        if (selectedOptionText.length > 13) {
            selectedOptionElement.textContent = selectedOptionText.slice(0, 13) + "...";
        } else {
            selectedOptionElement.textContent = selectedOptionText;
        }
    }

    function handleResize() {
        if (window.innerWidth <= 430) {
            updateSelectedOption1(selectedOptionElement, sellerSelectBox);
            updateSelectedOption2(selectedOptionElement1, sellerSelectBox1);

            sellerSelectBox.addEventListener('change', function () {
                updateSelectedOption1(selectedOptionElement, sellerSelectBox);
            });

            sellerSelectBox1.addEventListener('change', function () {
                updateSelectedOption2(selectedOptionElement1, sellerSelectBox1);
            });
        } else {
            sellerSelectBox.removeEventListener('change', updateSelectedOption1);
            sellerSelectBox1.removeEventListener('change', updateSelectedOption2);
        }
    }

    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);
});

