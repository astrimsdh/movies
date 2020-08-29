$('.search-button').on('click', function(){
  $.ajax({
    url: 'http://www.omdbapi.com/?apikey=d4868c9e&s='+$('.input-keyword').val(),
    success: results => {
      console.log(results)
      const movies = results.Search
      let cards = ''
      movies.forEach(movie => {
        cards += showCard(movie)
      })
      $('.movie-container').html(cards)
      // Ketika tombol detail di-klik
      $('.modal-detail-button').on('click', function(){
        $.ajax({
          url: 'http://www.omdbapi.com/?apikey=d4868c9e&i='+$(this).data('imdbid'),
          success: hasil =>{
            const movieDetail = showMovieDetail(hasil)
            $('.modal-body').html(movieDetail)
          },
          error: e => {
            console.log(e.resposeText)
          }
        })
      })
      // const page = Math.ceil(results.totalResults/10)
      // const pagination = `<div class="col">
      //   <nav aria-label="Page navigation example">
      //     <ul class="pagination justify-content-center">
      //       <li class="page-item"><a class="page-link" href="#">Previous</a></li>
      //       <li class="page-item"><a class="page-link" href="#">1</a></li>
      //       <li class="page-item"><a class="page-link" href="#">2</a></li>
      //       <li class="page-item"><a class="page-link" href="#">3</a></li>
      //       <li class="page-item"><a class="page-link" href="#">Next</a></li>
      //     </ul>
      //   </nav>
      // </div>`
      //
      // $('.pagination-area').html(pagination)
      },
      error: e => {
        console.log(e.resposeText)
      }
    })
})

function showCard(movie){
  return `<div class="col-md-4 my-5">
            <div class="card">
              <img src="${movie.Poster}" alt="" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${movie.Title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
                <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${movie.imdbID}">See Detail</a>
              </div>
            </div>
          </div>`
}

function showMovieDetail(hasil){
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${hasil.Poster}" alt="" class="img-fluid">
              </div>
              <div class="col-md">
                <div class="list-group">
                  <div class="list-group-item"><h4>${hasil.Title} (${hasil.Year})</h4></div>
                  <div class="list-group-item"><strong>Director: </strong>${hasil.Director}</div>
                  <div class="list-group-item"><strong>Actors: </strong>${hasil.Actors}</div>
                  <div class="list-group-item"><strong>Writer: </strong>${hasil.Writer}</div>
                  <div class="list-group-item"><strong>Plot :</strong><br>${hasil.Plot}</div>
                </div>
              </div>
            </div>
          </div>`
}
