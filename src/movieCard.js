const movieContainerDiv = document.querySelector(".movie-container")
const viewMovieCard = document.querySelector(".view-movie-card")
const aMovieContainer = document.querySelector(".amovie-container")
const allMyMoviesDiv = document.querySelector(".all-my-movies")
const myMovieContainer = document.querySelector(".my-movie-container")

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
        //    console.log(evt.target.dataset.id)
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

// addSaveToMovieCollectionButton()
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
                console.log(resjson)
                // myMovieShowPage(resjson)
                // allMyMoviesHtml.append(resjson)
                myMovieContainer.append(myMovieShowPage(resjson))
                
            })
    })



}

function myMovieShowPage(movie){
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
        myMovieDiv.append(myMovieTitileh1, myMovieImg, myMoviePlot, myMovieRated, myMovieDirector, myMovieActors, myMovieReleased, myMovieRuntime, myMovieGenre, myMovieProduction, myMovieType)
    myMovieContainer.innerHTML = ""
    myMovieContainer.appendChild(myMovieDiv)
    // return myMovieDiv
    
}