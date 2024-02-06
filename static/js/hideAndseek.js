document.addEventListener('DOMContentLoaded', function () {
    const sentButton = document.getElementById('sent');
    const form = document.getElementById('form-submit');
    const processLoading = document.getElementById('processLoading');
    const successDiv = document.getElementById('success');
    
    // ซ่อน div "processLoading" และ "success" เมื่อเริ่ม
    processLoading.style.display = 'none';
    successDiv.style.display = 'none';

    sentButton.addEventListener('click', () => {
        form.style.display = 'none';
        processLoading.style.display = 'flex';

        // รอ 5 วินาทีแล้วแสดง div "success"
        setTimeout(() => {
            form.style.display = 'none';
            processLoading.style.display = 'none';
            successDiv.style.display = 'block';
        }, 5000);
    });
});
