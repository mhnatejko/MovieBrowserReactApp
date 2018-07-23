import React from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FindSimilar from "./components/FindSimilar";
import SortPanel from "./components/SortPanel";
import Movies from "./components/Movies/Movies";
import MovieDetailsModal from "./components/MovieDetailsModal";
import AlertBar from "./components/AlertBar";
import Footer from "./components/Footer";
import './styles/main.css';
import './fontello-64b77b31/fontello-64b77b31/css/fontello.css';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            movieData: {},
            movieDataFiltered: {},
            titleToSearch: '',
            error: false,
            modalIsOpen: false,
            movieDetails: {},            
            movieToFindSimilar: [],
            wordToFilter: '',
        }
    }

//----------------LOOKING FOR A MOVIE----------------------------------------------
    handleCaptureTitle(e){
        this.setState({titleToSearch: e.target.value});
    }
   
    movieSearch(title){
        let uri = `https://api.themoviedb.org/3/search/movie?api_key=7c9bb1299040116471c7ad8cf75955b8&query=${title}&page=1`;
        return uri;
    }  

    handleStartSearch(){
        let uri = this.movieSearch(this.state.titleToSearch);
        fetch(uri)
            .then(res => res.json())
            .then(data => {
                this.setState({movieData: data});
                this.setState({movieDataFiltered: data})
            })
            .catch(err => this.setState({error: true}));        
    }

    handleEnterPressed(e){
        let keyCode = e.keyCode || e.which;
        if( keyCode === 13){
            this.handleStartSearch();
        }
    }
//----------------------------------------------------------------------------------

//------------------------SORT METHODS----------------------------------------------
    makeDataHardCopy(){
        let prevDataHardCopy = Object.assign({}, this.state.movieDataFiltered);
        return prevDataHardCopy;
    }
    handleSortAverage(){
        let prevDataHardCopy = this.makeDataHardCopy();
        prevDataHardCopy.results.sort((a,b) => b.vote_average - a.vote_average);
        this.setState({movieData: prevDataHardCopy});
    }
    handleSortPopularity(){
        let prevDataHardCopy = this.makeDataHardCopy();
        prevDataHardCopy.results.sort((a,b) => b.popularity - a.popularity);
        this.setState({movieData: prevDataHardCopy});
    }
    handleSortDate(){
        let prevDataHardCopy = this.makeDataHardCopy();
        prevDataHardCopy.results.sort((a,b) => Date.parse(b.release_date) - Date.parse(a.release_date));
        this.setState({movieData: prevDataHardCopy});
    }

    handleFilter(e){      
        let filterWord = e.target.value;
        this.setState({wordToFilter: e.target.value}); 
        let filteredMovieList = {...this.state.movieData};
        filteredMovieList.results = [...this.state.movieData.results.filter(el => el.title.toLowerCase().indexOf(filterWord.toLowerCase()) !== -1)];
        this.setState({movieDataFiltered: filteredMovieList});
    }
//-----------------------------------------------------------------------------------

    posterSearch(path){
        let uri = `https://image.tmdb.org/t/p/w200/${path}`;
        return uri;
    }

    returnPictureUri(path){
        let uri = `https://image.tmdb.org/t/p/w154${path}`;
        return uri;        
    }

//-----------------------MODAL------------------------------------------------------
openModal(e) {
    this.setState({modalIsOpen: true});       
    let uri = `https://api.themoviedb.org/3/movie/${e.target.value}?api_key=7c9bb1299040116471c7ad8cf75955b8`;
    fetch(uri)
        .then(res => res.json())
        .then(data => this.setState({movieDetails: data}))     
        .catch(err => console.log(err));        
}

closeModal() {
    this.setState({modalIsOpen: false});
}
//----------------------------------------------------------------------------------

//---------------------------FIND SIMILAR-------------------------------------------  
    handleFindSimilar(e){
        let uri = `https://api.themoviedb.org/3/movie/${e.target.value}?api_key=7c9bb1299040116471c7ad8cf75955b8`;
        fetch(uri)
            .then(res => res.json())
            .then(data => {
                let newBase = [...this.state.movieToFindSimilar].concat([data]);
                if(newBase.length > 2){newBase.length = 2};
                this.setState({movieToFindSimilar: newBase});
            })     
            .catch(err => console.log(err));        
    }

    handleStartFindingSimilar(){
        if(this.state.movieToFindSimilar.length === 2){

            const averageFunction = (key) => (this.state.movieToFindSimilar[0][key] + this.state.movieToFindSimilar[1][key]) / 2;
            //let averagePopularity = Math.ceil(averageFunction("popularity"));
            let averageVote = Math.ceil(averageFunction("vote_average"));
            let averageCount = Math.ceil(averageFunction("vote_count"));
            //let averageDate = (this.state.movieToFindSimilar[0][release_date] + this.state.movieToFindSimilar[1][release_date]) / 2)

            let movie01Gen = [];
            let movie02Gen = [];
            let commonMovieGen = [];
            
            for(let elem of this.state.movieToFindSimilar[0].genres){movie01Gen.push(elem.id)};
            for(let elem of this.state.movieToFindSimilar[1].genres){movie02Gen.push(elem.id)};
            commonMovieGen = movie01Gen.filter(el => movie02Gen.indexOf(el !== -1));
            let commonGen = commonMovieGen.join(',');
            
            let makeURI = () => `https://api.themoviedb.org/3/discover/movie?api_key=7c9bb1299040116471c7ad8cf75955b8&sort_by=popularity.desc&with_genres=${commonGen}&vote_count.lte=${averageCount}&vote_average.lte=${averageVote}&page=1`
            
            fetch(makeURI())
                .then(res => res.json())
                .then(data => {
                    this.setState({movieData: data});
                    this.setState({movieDataFiltered: data});
                })
                .catch(err => this.setState({error: true})); 
        }
        //console.log("makeURI:", makeURI(), ",averagePopularity:", averagePopularity, ",averageVote:", averageVote, "averageCount:", averageCount);
       //-------------------
        // &= //
        // &vote_average.gte= //Filter and only include movies that have a rating that is greater or equal to the specified value.
        // &vote_count.gte= //Filter and only include movies that have a vote count that is greater or equal to the specified value.
        // &with_genres= //gatunki
    }

    handleRemoveFindingSimilar(){
        this.setState({movieToFindSimilar: []})
    }
//----------------------------------------------------------------------------------

//------------------------------FAVOURITE COLLECTION--------------------------------
    handleAddToFavourite(e){
        let movieBrowserFavouriteBase = localStorage.getItem("movieBrowserFavouriteBase");
        if(!movieBrowserFavouriteBase){
            localStorage.setItem("movieBrowserFavouriteBase", JSON.stringify( {results: []} ));
        }else{           
            let favouriteData = JSON.parse(movieBrowserFavouriteBase);
            let chooseId = Number(e.target.value);
            if(chooseId){                
                if(!favouriteData.results.some(el => el.id === chooseId)){
                    let choose = [...this.state.movieData.results.filter(el => el.id === chooseId)];            
                    favouriteData.results.push(choose[0])
                    localStorage.setItem("movieBrowserFavouriteBase", JSON.stringify( favouriteData )); 
                }
            }
        }
    }

    handleLoadFavourite(){
        let movieBrowserFavouriteBase = JSON.parse(localStorage.getItem("movieBrowserFavouriteBase"));
        if(movieBrowserFavouriteBase){
            this.setState({movieData: movieBrowserFavouriteBase});
            this.setState({movieDataFiltered: movieBrowserFavouriteBase});
        }
    }
//----------------------------------------------------------------------------------

    render(){
        return (
            <div className="main">
            <Header/>
                <div className="section">            
                    <FindSimilar    
                                    startFindingSimilar={this.handleStartFindingSimilar.bind(this)}
                                    removeFindingSimilar={this.handleRemoveFindingSimilar.bind(this)}
                                    returnPictureUri={this.returnPictureUri.bind(this)}
                                    poster_path1={this.state.movieToFindSimilar[0] ? this.state.movieToFindSimilar[0].poster_path : undefined}
                                    poster_path2={this.state.movieToFindSimilar[1] ? this.state.movieToFindSimilar[1].poster_path : undefined}
                    />
                    <MovieDetailsModal 
                                    modalIsOpen={this.state.modalIsOpen} 
                                    closeModal={this.closeModal.bind(this)}                            
                                    id={this.state.movieId}
                                    details={this.state.movieDetails}
                                    returnPictureUri={this.returnPictureUri.bind(this)}
                    />
                    <div className="options">
                        <SearchBar  
                                    startSearch={this.handleStartSearch.bind(this)} 
                                    captureTitle={this.handleCaptureTitle.bind(this)} 
                                    enterPressed={this.handleEnterPressed.bind(this)}
                                    value={this.state.titleToSearch}
                                    loadFavourite={this.handleLoadFavourite.bind(this)}
                        />
                        
                        <SortPanel  
                                    sortAverage={this.handleSortAverage.bind(this)} 
                                    sortPopularity={this.handleSortPopularity.bind(this)}
                                    sortDate={this.handleSortDate.bind(this)}
                                    movieReady={this.state.movieData.results}
                                    value={this.state.wordToFilter}
                                    filter={this.handleFilter.bind(this)}
                        />                             
                    </div>  
                    <AlertBar error={this.state.error}/>                 
                    <Movies 
                            movieDataResults={this.state.movieDataFiltered.results} 
                            openModal={this.openModal.bind(this)}
                            findSimilar={this.handleFindSimilar.bind(this)}
                            addToFavourite={this.handleAddToFavourite.bind(this)}
                            returnPictureUri={this.returnPictureUri.bind(this)}
                    />    
                    <Footer />
                </div>  
            </div>
        )
    }
}

export default App;
//----------------------------------config request---------------------------------------
// zwraca objekt z dostepnymi moliwosciami dla zapytan?
    //  let api_key = "7c9bb1299040116471c7ad8cf75955b8"
    //  let uri = `https://api.themoviedb.org/3/configuration?api_key=${api_key}`
     fetch("https://api.themoviedb.org/3/discover/movie?api_key=7c9bb1299040116471c7ad8cf75955b8&sort_by=popularity.desc&include_adult=true&include_video=false&with_genres=12,28,14&vote_count.gte=8196&vote_average.gte=7&page=1")
         .then(resp => resp.json())
         .then(data => console.log(data))
    // https://api.themoviedb.org/3/discover/movie?api_key=7c9bb1299040116471c7ad8cf75955b8&sort_by=popularity.desc&include_adult=false&include_video=false&vote_count.gte=8196&vote_average.gte=7&vote_count.gte=&with_genres=12,28,14&page=1
//---------------------------------------------------------------------------------------