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
const gallerySection = document.getElementById('gallery')
const card = gallerySection.querySelectorAll('.card')
const errorMessage = document.createElement('h1')

//FETCH API AND PARSE IT TO JSON - SUCCESS : FAILURE
fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
.then(data => generateHTML(data.results))
.then(() => modalHtml())
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

gallerySection.insertAdjacentHTML('beforeend', users.join('')) 

}


const modalHtml = function(){ gallerySection.addEventListener('click', function(e){

	if(e.target.tagName === 'DIV' && e.target.id !== 'gallery' ){
		console.log(e.target)
		generateModal()
	}
})}

function generateModal(){
         
       

}
