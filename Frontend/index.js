let shoeList = document.querySelector("#shoe-list")
let shoeDisplay = document.querySelector("#main-shoe")
let formEl = document.createElement("form")
let reviewsContainer = document.querySelector("#reviews-list")

getFirst()

function getFirst(){
    fetch("http://localhost:3000/shoes/1")
    .then(r => r.json())
    .then(shoe => {
        // creating a form with div, textarea, and input elements in DOM
        formEl.id = "new-review"
        let formDiv = document.createElement("div")
            formDiv.className = "form-group"
                let textarea = document.createElement("textarea")
                textarea.className = "form-control"
                textarea.id = "review-content"
                textarea.rows = "3"
                let input = document.createElement("input")
                input.type = "submit"
                input.className = "btn btn-primary"
        formEl.append(formDiv, textarea, input)

        displayShoe(shoe)
        showShoes()
    })
}

// fetch all shoes
function showShoes(){
    fetch("http://localhost:3000/shoes")
    .then(r => r.json())
    .then(shoes => {
        shoes.forEach(shoe => {
            let name = shoe.name
            let li = document.createElement("li")
            li.className = "list-group-item"
            li.textContent = name
            shoeList.append(li)

            // each LI has an event listener attached to it
            li.addEventListener("click", evt => {
                // evt.preventDefault
                displayShoe(shoe)
            })
        })
    })
}

// display one shoe's details, reviews, and new review form
function displayShoe(shoe){
    // adding shoe details
    let imgContainer = document.querySelector("#shoe-image")
    let nameContainer = document.querySelector("#shoe-name")
    let descriptionContainer = document.querySelector("#shoe-description")
    let priceContainer = document.querySelector("#shoe-price")
    imgContainer.src = shoe.image
    nameContainer.textContent = shoe.name
    descriptionContainer.textContent = shoe.description
    priceContainer.textContent = "Price: $" + shoe.price
    
    // adding new review form here for each shoe
    formEl.addEventListener("submit", evt => {
        evt.preventDefault()
        submitReview(shoe)
    })
    
    // show reviews of shoe
    reviewsContainer.innerHTML = ""
    shoeReviews = shoe.reviews
    shoeReviews.forEach(review => {
        createReview(review)
    })
    
    shoeDisplay.append(imgContainer, nameContainer, descriptionContainer, priceContainer, formEl, reviewsContainer)
}

function submitReview(shoe){
    // input typed by user
    let content = document.querySelector("#review-content").value
     
    // adding review through a POST fetch
    fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            content: content
        })
    })
    .then(r => r.json())
    .then(review => {
        createReview(review)
    })   
}

function createReview (review){
    let li = document.createElement("li")
    li.className = "list-group-item"
    li.textContent = review.content
    reviewsContainer.append(li)
}
