/**********************************************************************************
*                                                                                 * 
*                                                                                 *
*                       TREEHOUSE TECHDEGREE - UNIT 5                             *
*                             Public API Requests                                 *
*                                                                                 *
*                                 Matt Hawes                                      *
*                                                                                 *
/**********************************************************************************/


//GLOBAL VARIABLES
const body = document.querySelector('body')
const errorMessage = document.createElement('h1')
const gallerySection = document.getElementById('gallery')
const modalSelection = document.createElement('div')
const buttonPrev = document.createElement('button')
const buttonNext = document.createElement('button')
buttonPrev.className = 'modal-prev'
buttonNext.className = 'modal-next'
modalSelection.className = 'modal-container'
buttonPrev.innerHTML = "Prev"
buttonNext.innerHTML = "Next"


//FETCH API AND PARSE IT TO JSON - SUCCESS : FAILURE
fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
.then(data => {
	generateHTML(data.results)
    generateModal(data.results)
})
.catch(systemFail)


//FUNCTION TO DISPLAY ERROR MESSAGE IF THERE IS A SIGNAL PROBLEM 
//FUNCTION CREATED EXTERNALLY FOR POSSIBLE REUSE
function systemFail(error){
	gallerySection.appendChild(errorMessage)
	errorMessage.innerHTML = "Trouble connecting with API! Please try again later."
	console.log(error, "Trouble connecting with API") }


//IF API IS SUCCESSFULLY FETCHED - THIS FUNCTION DISPLAYS IT TO THE PAGE
function generateHTML(data){
const users = data.map(user =>  

		`<div class="card">
			<div class="card-img-container">
			<img class="card-img" src="${user.picture.large}" alt="profile picture">
			</div>
			<div class="card-info-container">
			<h3 id="name" class="card-name cap">${user.name.title} ${user.name.first} ${user.name.last}</h3>
			<p class="card-text">${user.email}</p>
			<p class="card-text cap">${user.location.city}, ${user.location.state}</p>
		</div></div>`)

gallerySection.insertAdjacentHTML('beforeend', users.join('')) }


//CREATE MODAL WINDOWS (HIDDEN BY DEFAULT)
//ITERATE OVER CARDS AND DISPLAY MODAL WINDOW IF CARD MATCHES
function generateModal(data){
    let cards = document.querySelectorAll('.card')   
    for(let x = 0; x < cards.length; x++){
    	cards[x].addEventListener('click', function(e){
    		if(cards[x].html === data.innerHTML){

	//FORMAT PHONE NUMBER CORRECTLY - (XXX) XXX-XXXX
	const phoneReplace = data[x].phone.split('').filter(y => y!== '-' && y!== '(' && y !== ')').join('')
	const phoneOne = `(${phoneReplace.slice(0,3)})`
	const phoneTwo = `${phoneReplace.slice(4-7)}`
	const phoneThree = `${phoneReplace.slice(8-12)}`
	const phone = `${phoneOne} ${phoneTwo}-${phoneThree}`

		body.appendChild(modalSelection)
		modalSelection.insertAdjacentHTML('beforeend', 		       
       `<div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data[x].picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data[x].name.first} ${data[x].name.last}</h3>
                <p class="modal-text">${data[x].email}</p>
                <p class="modal-text cap">${data[x].location.city}</p>
                <hr>
                <p class="modal-text">${phone}</p>
                <p class="modal-text">${data[x].location.street.number} ${data[x].location.street.name}, ${data[x].location.city} ${data[x].location.postcode}</p>
                <p class="modal-text">Birthday: ${data[x].dob.date.slice(5,7)}/${data[x].dob.date.slice(8,10)}/${data[x].dob.date.slice(2,4)}</p>
            </div></div>`)  
	 modalSelection.appendChild(buttonPrev)
	 modalSelection.appendChild(buttonNext) 
        
     }})}}


//EVENT-LISTENER TO REMOVE MODEL WINDOW 
//REMOVE HTML TO CORRECTLY DISPLAY THE NEXT USER ON CLICK
modalSelection.addEventListener('click', function(e){
	body.removeChild(modalSelection)
	modalSelection.innerHTML = '' })

