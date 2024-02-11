let isRotated = false; // Track the rotation state
function toggleDropdown() {

  var selectBox = document.getElementById('selectBox');
  var angleIcon = document.getElementById('angleIcon');

  if (selectBox.classList.contains('hidden')) {
      selectBox.classList.remove('hidden');
      selectBox.size = selectBox.length;
      angleIcon.style.transform = 'rotate(180deg)';
      document.addEventListener('click', closeDropdownOutside);
  } else {
      hideDropdown();
  }
}

function hideDropdown() {
  var selectBox = document.getElementById('selectBox');
  var angleIcon = document.getElementById('angleIcon');

  selectBox.classList.add('hidden');
  angleIcon.style.transform = 'rotate(0deg)';
  document.removeEventListener('click', closeDropdownOutside);
}

function updateSelectedOption() {
  var selectBox = document.getElementById('selectBox');
  var selectedOption = document.getElementById('selectedOption');
  selectedOption.textContent = selectBox.options[selectBox.selectedIndex].text;
  hideDropdown();
}

function closeDropdownOutside(event) {
  var selectBox = document.getElementById('selectBox');
  var angleIcon = document.getElementById('angleIcon');

  if (!event.target.closest('.select-wrapper')) {
      hideDropdown();
  }
}


function toggleDropdown1() {

  var selectBox = document.getElementById('sellerSelectBox');
  var angleIcon = document.getElementById('angleIcon1');

  if (selectBox.classList.contains('hidden')) {
      selectBox.classList.remove('hidden');
      selectBox.size = selectBox.length;
      angleIcon.style.transform = 'rotate(180deg)';
      document.addEventListener('click', closeDropdownOutside1);
  } else {
      hideDropdown1();
  }
}
function hideDropdown1() {
  var selectBox = document.getElementById('sellerSelectBox');
  var angleIcon1 = document.getElementById('angleIcon1');

  selectBox.classList.add('hidden');
  angleIcon1.style.transform = 'rotate(0deg)';
  document.removeEventListener('click', closeDropdownOutside1);
}

function updateSelectedOption1() {
  var selectBox = document.getElementById('sellerSelectBox');
  var selectedOption = document.getElementById('selectedOption1');
  selectedOption.textContent = selectBox.options[selectBox.selectedIndex].text;
  hideDropdown1();
}

function closeDropdownOutside1(event) {
  var selectBox = document.getElementById('selectBox');
  var angleIcon = document.getElementById('angleIcon');

  if (!event.target.closest('.select-wrapper')) {
      hideDropdown1();
  }
}


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