const cv = document.getElementById("cv");
cv.addEventListener("click", function () {
    Swal.fire({
        title: "Upload your cv as a google drive link",
        showClass: {
            popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
                `
        },
        hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
                `
        }
    });
})