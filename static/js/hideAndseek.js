document.addEventListener('DOMContentLoaded', function () {
    const sentButton = document.getElementById('sent');
    const form = document.getElementById('form-submit');
    const top = document.getElementById('top-contents');
    const processLoading = document.getElementById('processLoading');
    const closeBTN = document.getElementById('closeSuccess');
    const successDiv = document.getElementById('success');
    
    // ซ่อน div "processLoading" และ "success" เมื่อเริ่ม
    processLoading.style.display = 'none';
    closeBTN.style.display = 'none';
    successDiv.style.display = 'none';
    top.style.display = 'block';

    sentButton.addEventListener('click', () => {
        form.style.display = 'none';
        top.style.display = 'none';
        processLoading.style.display = 'flex';

        // รอ 5 วินาทีแล้วแสดง div "success"
        setTimeout(() => {
            form.style.display = 'none';
            processLoading.style.display = 'none';
            closeBTN.style.display = 'none';
            successDiv.style.display = 'block';
            closeBTN.style.display = 'flex';

            // เมื่อ div "success" ถูกแสดง ให้เริ่มนับถอยหลัง
            var countdown = 3; // เวลาที่ต้องการ (หน่วยเป็นวินาที)

            var countdownButton = document.getElementById("countdownButton");

            // ตั้งค่าเวลาแสดงบนปุ่ม
            countdownButton.innerText = "( " + countdown + " ) " + " ปิด";

            // นับถอยหลัง
            var countdownInterval = setInterval(function () {
                countdown--;
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    countdownButton.innerText = "เสร็จสิ้น";
                    // เพิ่มการดำเนินการที่ต้องการเมื่อนับถอยหลังเสร็จสิ้นที่นี่
                } else {
                    countdownButton.innerText = "( " + countdown + " ) " + " ปิด";
                }
            }, 1000); // นับเวลาทุกๆ 1 วินาที (1000 มิลลิวินาที)

        }, 5000);
    });

});
