$(document).ready(() =>{
 $('#searchForm').on('submit' , (e) =>{
 	 let searchText= $('#searchText').val();
 	 getMovies(searchText);

 	e.preventDefault();
 });
});

 function getMovies(searchText){
 	axios.get('http://www.omdbapi.com?s='+searchText + '&apikey=fa7ce572')
 	  .then((response) => {

 		console.log(response);
 		let movies=response.data.Search;
 		let output='';
 		 $.each(movies,(index,movie) => {
 			output+=`
              <div class="col-md-3">
               <div class="well text-center">
                 <img src="${movie.Poster}"><br>
                 <h5>${movie.Title}</h5}<br>
                 <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary"  >Movie Details </a>
               </div>
              </div>
 			`;

 		});
 		$("#movies").html(output);

 	})
 	.catch((err) => {
 		console.log(err);
 	});
 }

 function movieSelected(id){

 	sessionStorage.setItem('movieId', id);
 	window.location='movie.html';
 	return false;

 }
 function getMovie(){
 	let movieId= sessionStorage.getItem('movieId');
 	axios.get('http://www.omdbapi.com?i='+movieId + '&apikey=fa7ce572')
 	  .then((response) => {
 	  	console.log(response);
 	  	let movie = response.data;
 	  	let output=`
         <div class="row">
           <div class="col-md-4">
             <img src="${movie.Poster}" class="thumbnail">
            </div>
           <div class="col-md-8">
             <h3 class="title"> ${movie.Title}</h3>
             <ul class="list-group">
               <li class="list-group-item"><strong> Genre:</strong> ${movie.Genre}</li>
               <li class="list-group-item"><strong> Released:</strong> ${movie.Released}</li>
               <li class="list-group-item"><strong> Rated:</strong> ${movie.Rated}</li>
               <li class="list-group-item"><strong> imdb Rating:</strong> ${movie.imdbRating}</li>
               <li class="list-group-item"><strong> Director:</strong> ${movie.Director}</li>
               <li class="list-group-item"><strong> Actors:</strong> ${movie.Actors}</li>

              </ul><br>
           </div>
        </div>

        <div class ="row">
         <div class="well">
           <h4> Plot</h4>
             ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary"> View IMDB</a>
            <a href="index.html" class="btn btn-secondary"> Go back to search</a>
          </div>
         </div><br>
         


 	  	`;
 	  	$('#movie').html(output);
 	  })

        .catch((err) => {
 		console.log(err);
 	});

 }