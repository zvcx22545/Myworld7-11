let formCount = 1; // Start with one form
let value2 = 2;
let value3 = 3;

const addform = document.getElementById('add-form')
addform.addEventListener("click",() => {
   
    if (formCount) {

        let formContainer = document.getElementById("container-form");
        let newForm = document.createElement("div");
        newForm.classList.add('container-form')
        newForm.innerHTML = `
        <div class="w-full">
        <div class="grid">
            <label class="font-bold" for="type">ชิ้นที่${formCount+1}</label>
            <label for="type">ประเภทสินค้า</label>
        </div>
        <div class="relative inline-block w-full h-[40px] mt-[0.5rem]">
            <!-- Adjust this div to use flex and justify-between for alignment -->
            <div
                class="bg-[#DEDEDE] border border-black rounded-lg p-2 cursor-pointer flex justify-end items-center w-full h-[40px]">
                <i id="angleIcon" class="fas fa-angle-down" style="transition: transform 0.2s;"></i>
            </div>
            <select id="selectBox-${formCount}" class="absolute inset-0 opacity-0 cursor-pointer w-full h-[40px] select-Box"
                required>
                <option value="" disabled selected>กรุณาเลือกประเภทสินค้า</option>
                <option value="option-${formCount+1}">Option ${formCount+1}</option>
                <option value="option-${value2+1}">Option ${value2+1}</option>
                <option value="option-${value3+1}">Option ${value3+1}</option>
            </select>
        </div>
    </div>
    <div class="grid items-end w-full">
        <label for="Price-${formCount}">ราคา (บาท)</label>
        <input class="w-[100%] h-[40px] border-1 border-[#000] p-2 rounded-lg mt-[0.5rem]" type="text" id="Price-${formCount}" required>
    </div>
      `;
      newForm.id = "container-form-" + formCount; // Update ID of the new form section
      formContainer.appendChild(newForm);
      value2++;
      value3++;
      formCount++;
  
      } 
    
})

