const movieContainerDiv = document.querySelector(".movie-container")

// ALL MY MOVIE MOVIE SHOW
const viewMovieCard = document.querySelector(".view-movie-card")
const aMovieContainer = document.querySelector(".amovie-container")
const allMyMoviesDiv = document.querySelector(".all-my-movies")
const myMovieContainer = document.querySelector(".my-movie-container")
const movieShowTime = document.querySelector(".movies-show-time")
const movieButtonDiv = document.querySelector(".show-room-btn-div")

class MovieCard {
    constructor(movieObj){
        this.title = movieObj.Title
        this.image = movieObj.Poster
        this.year = movieObj.Year
        this.imbdID = movieObj.imdbID
       
    }
    render(){
        
        const MovieCardDiv = document.createElement("DIV")
        MovieCardDiv.dataset.id = this.imbdID
        const movieTitle = document.createElement("h1")
        movieTitle.innerText = this.title
        movieTitle.dataset.id = this.imbdID
        const movieImage = document.createElement("IMG")
        movieImage.dataset.id = this.imbdID
        movieImage.src = this.image
        movieImage.alt = "movie image"
        MovieCardDiv.append(movieTitle)
        MovieCardDiv.append(movieImage)
        const p = document.createElement("P")
        p.dataset.id = this.imbdID
        p.innerText = this.year
        MovieCardDiv.append(p)
        MovieCardDiv.addEventListener("click",(evt) => {
                let imbed = evt.target.dataset.id

                getMovieInfo(imbed)
        })

        return MovieCardDiv
    
    }
}

function getMovieInfo(imbed){
    fetch(`https://movie-database-imdb-alternative.p.rapidapi.com/?i=${imbed}&r=json&plot=full`,{  
        headers: {
            "x-rapidapi-key": "287941f746msh758df8198e2197ap12f836jsn75a065b0db76"
        },  
    })
    .then(r => r.json())
    .then(movie=>{
        console.log(movie)
        viewMovieCard.innerHTML=""
        aMovie(movie)
    })
}

function aMovie(movie){
    let aMovieContainer = document.querySelector(".amovie-container")
        aMovieContainer.innerHTML=""
    const aMovieLeftDiv = document.createElement("DIV")
         const aMovieTitileh1 = document.createElement("H1")
        aMovieTitileh1.innerText = movie.Title
        const aMovieImg = document.createElement("IMG")
        aMovieImg.src = movie.Poster
        const aMovieSaveButton = document.createElement("BUTTON")
        aMovieSaveButton.innerText = "Save to Movies"
            aMovieImg.alt = "movie poster"
            const aMoviePlot = document.createElement("P")
            aMoviePlot.innerText = movie.Plot
            const aMovieRated = document.createElement("DIV")
            aMovieRated.innerText = movie.Rated
    const aMovieRightDiv = document.createElement("DIV")
        const aMovieDirector = document.createElement("h4")
            aMovieDirector.innerText = movie.Director   
        const aMovieActors = document.createElement("H4")
            aMovieActors.innerHTML = movie.Actors
        const aMovieReleased = document.createElement("DIV")
            aMovieReleased.innerText = movie.Released
        const aMovieRuntime = document.createElement("DIV")
            aMovieRuntime.innerText = movie.Runtime
        const aMovieGenre = document.createElement("DIV")
            aMovieGenre.innerText = movie.Genre 
        const aMovieProduction = document.createElement("DIV")
            aMovieProduction.innerText = movie.Production
        const aMovieType = document.createElement("DIV")
            aMovieType.innerText = movie.Type
            myMovieContainer.innerHTML ="" 
            aMovieContainer.innerHTML = ""
    aMovieLeftDiv.append(aMovieTitileh1, aMovieImg, aMovieSaveButton, aMoviePlot, aMovieRated)
    aMovieRightDiv.append(aMovieDirector, aMovieActors, aMovieReleased, aMovieRuntime, aMovieGenre, aMovieProduction, aMovieType)
    aMovieContainer.appendChild(aMovieLeftDiv)
    aMovieContainer.appendChild(aMovieRightDiv)
       
    aMovieSaveButton.addEventListener("click", (evt) => {
        console.log(evt.target)
        fetch("http://localhost:3000/movies",{
            method: "POST" ,
            headers: {
                "content-type" : "application/json",
                "accept" : "application/json"
            },
            body: JSON.stringify({
               title: movie.Title,
                poster: movie.Poster, 
                actors: movie.Actors,
                director: movie.Director,
                released: movie.Released,
                genre: movie.Genre,
                rated: movie.Rated,
                run_time: movie.Runtime,
                plot: movie.Plot,
                production: movie.Production,
                a_type: movie.Type
            })
        })
            .then(r => r.json())
            .then(resjson =>{ 
                aMovieContainer.innerHTML = ""
                myMovieContainer.append(myMovieShowPage(resjson))
            })
    })
}

function myMovieShowPage(movie){
    allMyMoviesDiv.innerHTML = ""
    const myMovieDiv = document.createElement("DIV")
        myMovieDiv.className = "my-movie"
    const myMovieTitileh1 = document.createElement("H1")
        myMovieTitileh1.innerText = movie.title
    const myMovieImg = document.createElement("IMG")
        myMovieImg.src = movie.poster
        myMovieImg.alt = "movie poster"
    const myMoviePlot = document.createElement("P")
        myMoviePlot.innerText = movie.plot
    const myMovieRated = document.createElement("DIV")
        myMovieRated.innerText = movie.rated        
        
    const myMovieDirector = document.createElement("h4")
        myMovieDirector.innerText = movie.director   
    const myMovieActors = document.createElement("H4")
        myMovieActors.innerHTML = movie.actors
    const myMovieReleased = document.createElement("DIV")
        myMovieReleased.innerText = movie.released
    const myMovieRuntime = document.createElement("DIV")
        myMovieRuntime.innerText = movie.runtime
    const myMovieGenre = document.createElement("DIV")
        myMovieGenre.innerText = movie.genre 
    const myMovieProduction = document.createElement("DIV")
        myMovieProduction.innerText = movie.production
    const myMovieType = document.createElement("DIV")
        myMovieType.innerText = movie.a_type 
    const myMovieDeleteButton = document.createElement("BUTTON")
        myMovieDeleteButton.type = "submit"
        myMovieDeleteButton.className = "my-movie-delete-btn"
        myMovieDeleteButton.innerText = "Remove from List"

        const showTimeButton = document.createElement("BUTTON")
    showTimeButton.className = "show-times-btn"
    showTimeButton.innerText = "Add to a Show room"



    

        myMovieDiv.append(myMovieTitileh1, myMovieImg, myMoviePlot, myMovieRated, 
            myMovieDirector, myMovieActors, myMovieReleased, myMovieRuntime, myMovieGenre,
             myMovieProduction, myMovieType, myMovieDeleteButton , showTimeButton)
    myMovieContainer.innerHTML = ""
    myMovieContainer.appendChild(myMovieDiv)
    // return myMovieDiv
    

    showTimeButton.addEventListener( "click", (evt) => {
        showTimeButton.remove()
       
       
        const movieSearchForm = document.createElement("FORM")
        movieSearchForm.className = "movie-search-form"
        movieSearchForm.dataset.id = movie.id

        const daySelect = document.createElement("SELECT")
        daySelect.className = "weekdays"
        const monday = document.createElement("OPTION")
        monday.value = "Monday"
        monday.innerText = "Monday"
        const tuesday = document.createElement("OPTION")
        tuesday.value = "tuesday"
        tuesday.innerText = "Tuesday"
        const wednesday = document.createElement("OPTION")
        wednesday.value = "wednesday"
        wednesday.innerText = "Wednesday"
        const thursday = document.createElement("OPTION")
        thursday.value = "thursday"
        thursday.innerText = "Thursday"
        const friday = document.createElement("OPTION")
        friday.value = "friday"
        friday.innerText = "Friday"
        const saturday = document.createElement("OPTION")
        saturday.value = "saturday"
        saturday.innerText = "Saturday"
        const sunday = document.createElement("OPTION")
        sunday.value = "sunday"
        sunday.innerText = "Sunday"

        daySelect.append(monday, tuesday,wednesday , thursday, friday)
        const roomSelect1 = document.createElement("SELECT")
        roomSelect1.className = "select1"
        
        
        const option1 = document.createElement("OPTION")
        option1.value = "2:00 pm"
        option1.innerText = "2:00"
        const option2 = document.createElement("OPTION")
        option2.value = "4:00 pm"
        option2.innerText = "4:00 pm"
        const option3 = document.createElement("OPTION")
        option3.value = "6:00 pm"
        option3.innerText = "6:00 pm"
        const option4 = document.createElement("OPTION")
        option4.value = "8:00 pm"
        option4.innerText = "8:00 pm"
        const option5 = document.createElement("OPTION")
        option5.value = "10:00 pm"
        option5.innerText = "10:00 pm"
        roomSelect1.append( option1, option2, option3, option4, option5)
        
        // myMovieDiv.appendChild(select)
        const roomSelect2 = document.createElement("SELECT")
        roomSelect2.className = "select2"

        fetch("http://localhost:3000/show_rooms")
            .then(r => r.json())
            .then((roomsArray) => {
                console.log(roomsArray)
                roomsArray.data.forEach((room) => {
                    const option = document.createElement("OPTION")
                    option.value = room.id
                    option.innerText = `Room Number: ${room.id}`
                   
                    roomSelect2.append(option)
                })
            })
            //mUST POST HERE 
            // myMovieDiv.appendChild(roomSelect)
            
            const submitButton = document.createElement("Button")
            submitButton.type ="Submit"
            submitButton.innerText = "Set Show Time"

            movieSearchForm.append(daySelect , roomSelect1, roomSelect2, submitButton)
            myMovieDiv.appendChild(movieSearchForm)

            //add EventListener to moive Search Form to create a new Show time //POST

            movieSearchForm.addEventListener("submit", (evt) => {
                evt.preventDefault()
                console.log(evt.target)
                let dayValue = evt.target.querySelector(".weekdays").value
                let timeValue = evt.target.querySelector(".select1").value
                let roomValue = evt.target.querySelector(".select2").value
                
                fetch(`http://localhost:3000/show_times`, {
                    method: "POST",
                    headers: {
                        "content-type" :"application/json",
                        "accept" : "application/json"
                    }, 
                    body: JSON.stringify({
                        movie_id: movie.id,
                        day: dayValue,
                        show_time: timeValue,
                        show_room_id: roomValue
                    })
                })
                .then(r => r.json())
                .then((savedMovieTime) => {

                    console.log()
                    myMovieDiv.innerHTML = ""
                    movieShowTime(savedMovieTime, movie)
                })
            })
    })
    //DELETE BUTTON
    myMovieDeleteButton.addEventListener("click" ,(evt) => {
        console.log(evt.target)

        fetch(`http://localhost:3000/movies/${movie.id}`, {
            method: "DELETE"
        })
        .then((resjson) => {
            myMovieContainer.innerHTML = "" //REMOVES the movie show from 
            debugger
            const movieDiv = allMyMoviesDiv.querySelector(`[data-id='${movie.id}']`)
            
            // movieDiv.remove()
            
            // allMyMoviesDiv
        }
        )
        allMyMovies()
    })
    
    function movieShowTime(a_time, movie){
        
        const movieShowTime = document.querySelector(".movies-show-time")
    //    if(time.movie_id === movie.id)
    //    let movieTimeImage = movie.poster    
       
       
        const showTimeDiv = document.createElement("DIV")
        const showTimeMovieImg = document.createElement("IMG")
        showTimeMovieImg.src = movie.poster
        
        showTimeMovieImg.alt = "poster"
        const showTimeMovieH1 = document.createElement("H3")
        showTimeMovieH1.innerText= movie.title
        const h1 =document.createElement("H3")
        h1.innerText = `${a_time.data.attributes.day} at ${a_time.data.attributes.show_time} playing in ShowRoom ${a_time.data.attributes.show_room_id}`
        showTimeDiv.append(h1 , showTimeMovieImg, showTimeMovieH1)
       
        movieShowTime.appendChild(showTimeDiv)
    
    }
}
