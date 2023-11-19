const stars = document.querySelectorAll(".star");
const selectedRating = document.getElementById("selected-rating");
const reviewText = document.getElementById("review-text");
const submitButton = document.getElementById("submit-review");
const reviewList = document.getElementById("review-list");

let rating = 0;

stars.forEach(star => {
    star.addEventListener("click", () => {
        rating = parseInt(star.getAttribute("data-rating"));
        updateRating();
    });
});

function updateRating() {
    stars.forEach(star => {
        const starRating = parseInt(star.getAttribute("data-rating"));
        if (starRating <= rating) {
            star.classList.add("selected");
        } else {
            star.classList.remove("selected");
        }
    });

    selectedRating.innerText = `${rating} Stars`;
}

submitButton.addEventListener("click", () => {
    const review = reviewText.value;
    if (rating > 0 && review.trim() !== "") {
        addReview(rating, review);
        resetForm();
    }
});

function addReview(rating, review) {
    const reviewItem = document.createElement("li");
    reviewItem.classList.add("review-item");
    reviewItem.innerHTML = `<b>${rating} Stars:</b> ${review}`;
    reviewList.appendChild(reviewItem);
}

function resetForm() {
    stars.forEach(star => star.classList.remove("selected"));
    selectedRating.innerText = "0 Stars";
    reviewText.value = "";
    rating = 0;
}
