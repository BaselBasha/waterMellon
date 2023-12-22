
if (!localStorage.getItem('notificationShown')) {
    Swal.fire({
        title: "<strong>Early Access</strong>",
        icon: "info",
        html: `
            This is an early access for the website. Please report any issues you find on the contact page. Thank you.
        `,
        confirmButtonText: `
            <i class="fa fa-thumbs-up"></i> Great!
        `,
        confirmButtonAriaLabel: "Thumbs up, great!",
    });
    localStorage.setItem('notificationShown', 'true');
}


var cards = document.querySelectorAll('.card');
let row = document.querySelector(".row");
row.addEventListener("click", function (event) {
    const clickedCard = event.target.closest('.card');
    if (clickedCard) {
        clickedCard.classList.toggle('is-flipped');
    }
});
