console.log( "mod 3")


loadPage()
function loadPage(){
    addSearchBar()
 

function addSearchBar(){
    const movieSearchDiv = document.createElement("DIV")
    movieSearchDiv.type = "header"
    const movieSearchForm = document.createElement("FORM")
    const movieSearchFormInput = document.createElement("INPUT")
    movieSearchFormInput.className = "movie-input"
    movieSearchFormInput.name = "minput" 
    const movieSearchSubmitButton = document.createElement("BUTTON")
    movieSearchSubmitButton.className = "movie-search-btn"
    movieSearchSubmitButton.innerText = "search🔍"
    movieSearchSubmitButton.type ="submit"
    movieSearchForm.append(movieSearchSubmitButton)
    movieSearchForm.append(movieSearchFormInput)
    movieSearchDiv.append(movieSearchForm)
    const allMyMoviesButton = document.createElement("BUTTON")
    allMyMoviesButton.className = "saved-movies-btn"
    allMyMoviesButton.innerText = "View Movies"
    
    movieContainerDiv.appendChild(movieSearchDiv)
    movieContainerDiv.appendChild(allMyMoviesButton)

    movieSearchForm.addEventListener("submit", evt =>{
        evt.preventDefault()
        myMovieContainer.innerHTML = ""
        allMyMoviesDiv.innerHTML=""
        let search = evt.target.minput.value
        searchMovieApi(search)    
    })

    allMyMoviesButton.addEventListener("click", evt =>{
        allMyMoviesDiv.innerHTML=""
     
        allMyMovies()
    })
}

function allMyMovies(){
    fetch("http://localhost:3000/movies")
    .then(r => r.json())
    .then((savedMovies) => {
        savedMovies.forEach((movie) => {
           allMyMoviesHtml(movie)
        })
    })
}


function searchMovieApi(search){
    
    fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?r=json&s=${search}`,{  
        headers: {
            "x-rapidapi-key": "287941f746msh758df8198e2197ap12f836jsn75a065b0db76"
          },  
    })
    .then(res =>res.json())
    .then((rj) => {
        let obj = rj.Search
       viewMovieCard.innerHTML = ""
       aMovieContainer .innerHTML = ""
        obj.forEach((item) =>{
            console.log(item)      
            let mc = new MovieCard(item)
            viewMovieCard.append(mc.render()) 
        })
        // movieCard()
    })
}
}


function allMyMoviesHtml(movie){
    const movieDiv = document.createElement("DIV")
    movieDiv.innerText = movie.title
    
    allMyMoviesDiv.appendChild(movieDiv)
    
    movieDiv.addEventListener("click", (evt) => {
        
      aMovieContainer.innerHTML = ""
        myMovieShowPage(movie)
        
        
    })
    
}