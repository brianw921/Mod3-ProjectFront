let showRoomShows = document.querySelector(".show-rooms-shows") 
let showRooms = document.querySelector(".show-rooms")


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
    //SEARCH BUTTON
    const movieSearchSubmitButton = document.createElement("BUTTON")
        movieSearchSubmitButton.className = "movie-search-btn"
        movieSearchSubmitButton.innerText = "search🔍"
        movieSearchSubmitButton.type ="submit"
    movieSearchForm.append(movieSearchSubmitButton, movieSearchFormInput) 
    movieSearchDiv.append(movieSearchForm)
    // ALL MY MOVIES BUTTON
    const allMyMoviesButton = document.createElement("BUTTON")
        allMyMoviesButton.className = "saved-movies-btn"
        allMyMoviesButton.innerText = "View Movies"
        // SHOW ROOM BUTTON
    const showRoomButtonDiv = document.createElement("DIV") 
        showRoomButtonDiv.className = "show-room-btn-div"
    const showRoomButton = document.createElement("BUTTON")
        showRoomButton.className = "show-room-btn" 
        showRoomButton.innerText = "Show Rooms 🎞"
    const movieDayButtonDiv =  document.createElement("DIV") 
        movieDayButtonDiv.className = "movie-day-button-div"
    // const movieDay = document.createElement("BUTTON")

    //     movieDay.className = "movie-day-btn"
    //     movieDay.innerText = "Whats Playing"
    // movieDayButtonDiv.append(movieDay)
    showRoomButtonDiv.append(showRoomButton)
    movieContainerDiv.appendChild(movieSearchDiv)
    movieContainerDiv.appendChild(movieDayButtonDiv)
    movieContainerDiv.appendChild(showRoomButtonDiv)
    movieContainerDiv.appendChild(allMyMoviesButton)
// SHOW ROOM LISTENER
    showRoomButton.addEventListener("click",evt =>{    
        allMyMoviesDiv.innerHTML=""
        movieShowTime.innerHTML= ""
        showRooms.innerHTML=""
        movieShowTime.innerHTML= ""
        aMovieContainer.innerHTML=""
        myMovieContainer.innerHTML=""
         viewMovieCard.innerHTML=""
        myShowRooms() 
    })
    // SEARCH LISTENER
    movieSearchForm.addEventListener("submit", evt =>{
        evt.preventDefault()
        movieShowTime.innerHTML= ""
        allMyMoviesDiv.innerHTML=""
        showRooms.innerHTML=""
        showRoomShows.innerHTML=""
         viewMovieCard.innerHTML = ""
       aMovieContainer .innerHTML = ""
         myMovieContainer.innerHTML=""
    
    
        let search = evt.target.minput.value
        searchMovieApi(search)    
    })
    // ALL MY MOVIES LISTENER
    allMyMoviesButton.addEventListener("click", evt =>{
        allMyMoviesDiv.innerHTML=""
      showRooms.innerHTML=""
      showRoomShows.innerHTML=""
       movieShowTime.innerHTML= ""
       myMovieContainer.innerHTML=""
        viewMovieCard.innerHTML=""
        allMyMovies()    
    })
}

function allMyMovies(){
      
    fetch("http://localhost:3000/movies")
    .then(r => r.json())
    .then((savedMovies) => {
        savedMovies.data.forEach((movie) => {
           allMyMoviesHtml(movie.attributes)
        })
    })
}
function allMyMoviesHtml(movie){
    const movieDiv = document.createElement("DIV")
        movieDiv.dataset.id = movie.id
    const h4 = document.createElement("h4")
    h4.innerText = movie.title
    h4.dataset.id = movie.id
    const mImage = document.createElement("IMG")
    mImage.className = "view-all-movies-img"
    mImage.src = movie.poster
    mImage.alt = "movie poster"
    mImage.height="42"
    
    movieDiv.appendChild(mImage)
    movieDiv.appendChild(h4)
    allMyMoviesDiv.appendChild(movieDiv)
    
    movieDiv.addEventListener("click", (evt) => {
        
      aMovieContainer.innerHTML = ""
        myMovieShowPage(movie)
        
        
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
     
        obj.forEach((item) =>{
            console.log(item)      
            let mc = new MovieCard(item)
            viewMovieCard.append(mc.render()) 
        })
    })
}
}



function myShowRooms(){
    fetch("http://localhost:3000/show_rooms")
    .then(r => r.json())
    .then((showRoomsList) => {
        
        showRoomsList.data.forEach((showRoom) => {         
            displayMyShowRoom(showRoom)
        })
    })
}


function displayMyShowRoom(room){
    
    
    const div = document.createElement("DIV")
    const button = document.createElement("BUTTON")
    button.innerText = `Show Room: ${room.id}`
    button.dataset.id = room.id
    div.append(button)
    showRooms.appendChild(div)

    button.addEventListener("click",(evt) => {
        console.log(evt.target)
        allMyMoviesDiv.innerHTML=""
        viewMovieCard.innerHTML = ""
        showRoomShows.innerHTML = ""
        aMovieContainer.innerHTML=""
        showRoomMovies(evt)
        

        
    })
    
}

function showRoomMovies(evt){
    let id = evt.target.dataset.id
    const showsDiv = document.createElement("DIV")
    const showRoomMovie = document.createElement("H1")
    showRoomMovie.innerText = "Movies and Time"
    const showRoomMovieUL = document.createElement("UL")
    showRoomMovie.append( showRoomMovieUL)
    showsDiv.appendChild(showRoomMovie)
    showRoomShows.appendChild(showsDiv)
    fetch(`http://localhost:3000/show_rooms/${id}`)
        .then(r => r.json())
        .then((rj) => {
           let movies =  rj.included.filter(obj => obj.type ==="movie")
           let showTime = rj.included.filter(obj => obj.type ==="show_time")
           showTime.forEach((time) => {
               movies.forEach((movie) => {
                   if(time.attributes.movie_id === movie.attributes.id){
                       const showRoomMovieLI = document.createElement("LI")
                       showRoomMovieLI.innerText = `Playing ${movie.attributes.title} on ${time.attributes.day} on ${time.attributes.show_time}`
                       const rmButton = document.createElement("BUTTON")
                       rmButton.dataset.id = time.id
                       rmButton.innerText= "Remove"
                       showRoomMovieLI.append(rmButton)
                       showRoomMovieUL.append(showRoomMovieLI )

                       rmButton.addEventListener("click",(evt) => {
                            // let id = evt.target.dataset.id
                            // let evtli = event.target
                           deletShowTime(evt )
                       })                       
                    }                    
                })  
            })
        })
 }

 function deletShowTime(evt){
     fetch(`http://localhost:3000/show_times/${evt.target.dataset.id}`,{
         method:"DELETE"
     })
     .then(r=>r.json())
     .then((rj) => {
        evt.target.parentElement.remove()

       
     })
 }
        
