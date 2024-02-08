function showAlert(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon || "error",
        confirmButtonText: "ตกลง",
        allowOutsideClick: true, // อนุญาตให้คลิกภายนอกเพื่อปิด modal
        showLoaderOnConfirm: true, // แสดง animation ในระหว่างกดปุ่มตกลง
        preConfirm: () => {
          // สมมติว่ามีการประมวลผลบางอย่าง (เช่น การร้องขอ AJAX)
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000); // ประมาณ 2 วินาที
          });
        },
      })
}


let formCount = 1; // Start with one form
let value2 = 2;
let value3 = 3;

const addform = document.getElementById("add-form");
addform.addEventListener("click", () => {
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
                <span  class="me-auto selectedOption">My beer</span>
                <i id="angleIcon" class="fas fa-angle-down" style="transition: transform 0.2s;"></i>
            </div>
            <select id="${selectBoxId}" class="absolute inset-0 opacity-0 cursor-pointer w-full h-[40px] select-Box"
                required>
                <div id="selectedValueDisplay"></div>
                <option value="" disabled selected>กรุณาเลือกประเภทสินค้า</option>
                <option value="option-${formCount + 1}">Option ${formCount + 1
        }</option>
                <option value="option-${value2 + 1}">Option ${value2 + 1
        }</option>
                <option value="option-${value3 + 1}">Option ${value3 + 1
        }</option>
            </select>
        </div>
    </div>
    <div class="grid items-end w-full">
            <div class="flex justify-end">
                <button type="button" class="flex items-end ml-2 p-1 text-red-500" onclick="deleteForm(${formCount})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CE4D4D" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
            </div>
        <label for="Price-${formCount}">ราคา (บาท)</label>
        <input class="w-[100%] h-[40px] border-1 border-[#000] p-2 rounded-lg mt-[0.5rem] Price" type="text" id="Price-${formCount}" required>
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
    formCount++;
    value2++;
    value3++;
    // Assuming you're dynamically creating the select options with JS
    //   formCount++;
    //   }
});

function showoption() {
    document.querySelectorAll(".select-Box").forEach(function (selectBox) {
        selectBox.addEventListener("change", function () {
            const selectedOption = this.options[this.selectedIndex].textContent;
            this.parentNode.querySelector(".selectedOption").textContent =
                selectedOption;
        });
    });
}

function assignEventListeners() {
    document.querySelectorAll(".select-Box").forEach(function (selectBox) {
        selectBox.addEventListener("click", function (event) {
            event.preventDefault(); // ป้องกันการทำงานเริ่มต้นของเหตุการณ์
            const angleIcon = this.parentElement.querySelector(".fas.fa-angle-down");
            if (!isRotated) {
                angleIcon.style.transform = "rotate(180deg)";
                isRotated = true;
            } else {
                angleIcon.style.transform = "rotate(0deg)";
                isRotated = false;
            }

            if (!isRotated) this.size = 1;
        });

        selectBox.addEventListener("change", function () {
            const angleIcon = this.parentElement.querySelector(".fas.fa-angle-down");
            angleIcon.style.transform = "rotate(0deg)";
            isRotated = false;
            this.blur();
            this.size = 0;
        });
    });
}

// Block character function
function Blockcharater(event) {
    var regex = /^\d+$/; // Regular expression to match only numbers
    if (!regex.test(event.key)) {
        event.preventDefault(); // Prevent non-numeric characters
        showAlert("แจ้งเดือน!", "สามารถกรอกตัวเลขได้เท่านั้น!", "error");
    }
}

let inputElements = document.querySelectorAll(".Price");
    // Loop through each input element and attach the event listener
    inputElements.forEach(function (inputElement) {
        inputElement.addEventListener("keypress", Blockcharater);
    });

// Delete Funtion
function deleteForm(formCountToDelete) {
    let formContainer = document.getElementById("container-form");
    let formToDelete = document.getElementById(
        "container-form-" + formCountToDelete
    );
    if (formToDelete) {
        formContainer.removeChild(formToDelete);
        // ปรับค่า formCount, value2, และ value3 ลดลงตามจำนวนที่ลบ
        formCount--;
        value2--;
        value3--;
        // อัพเดท id ของฟอร์มที่เหลือให้ถูกต้อง
        for (let i = formCountToDelete + 1; i <= formCount; i++) {
            let form = document.getElementById("container-form-" + i);
            form.id = "container-form-" + (i - 1);
            form.querySelector("label[for='Price-" + i + "']").textContent =
                "ราคา (บาท)";
            form.querySelector("input#Price-" + i).id = "Price-" + (i - 1);
            form.querySelector("select").id = "selectBox-" + (i - 1);
            form.querySelector("label[for='type']").textContent =
                "ชิ้นที่" + " " + (i - 1);
        }
    }
}
