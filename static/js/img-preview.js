const uploadImgInput = document.getElementById('upload-img');
const imgPreview = document.getElementById('img-preview');

uploadImgInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;

            img.onload = () => {
                const maxWidth = 100;
                const maxHeight = 100;

                const width = img.width;
                const height = img.height;

                let newWidth = width;
                let newHeight = height;

                if (width > maxWidth || height > maxHeight) {
                    const aspectRatio = width / height;

                    if (width > height) {
                        newWidth = maxWidth;
                        newHeight = maxWidth / aspectRatio;
                    } else {
                        newHeight = maxHeight;
                        newWidth = maxHeight * aspectRatio;
                    }
                }

                imgPreview.style.backgroundImage = `url(${e.target.result})`;
                imgPreview.style.backgroundSize = `${newWidth}px ${newHeight}px`;
                imgPreview.style.backgroundPosition = 'center';
                imgPreview.style.backgroundRepeat = 'no-repeat';
                imgPreview.textContent = ''; // Clear the default text
            };
           
        };
        

        reader.readAsDataURL(file);
        imgPreview.forEach(function (image) {
            image.addEventListener("click", function () {
                // เมื่อรูปถูกคลิก แสดงรูปใหญ่ขึ้น
                showLargeImage(this.src);
            });
        });
    } else {
        // Handle case when no file is selected or user cancels selection
        imgPreview.style.backgroundImage = 'none'; // Clear the background image
        imgPreview.style.backgroundSize = 'auto'; // Reset background size
        imgPreview.textContent = '100*100'; // Restore the default text
    }
});

function showLargeImage(imageSrc) {
    // สร้างตัวแสดงรูปใหญ่ขึ้น
    var largeImageContainer = document.createElement("div");
    largeImageContainer.classList.add("large-image-container");

    // สร้างภาพใหญ่
    var largeImage = document.createElement("img");
    largeImage.src = imageSrc;
    largeImage.classList.add("large-image");

    // เพิ่มภาพใหญ่ลงในตัวแสดงรูปใหญ่ขึ้น
    largeImageContainer.appendChild(largeImage);

    // เพิ่มตัวแสดงรูปใหญ่ขึ้นในหน้า
    document.body.appendChild(largeImageContainer);

    // เพิ่มการจัดการคลิกเพื่อปิดรูปใหญ่
    largeImageContainer.addEventListener("click", function () {
        // เมื่อคลิกที่รูปใหญ่ ให้ปิดรูปใหญ่ลง
        document.body.removeChild(largeImageContainer);
    });
}
