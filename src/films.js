// Exercise 1: Get the array of all directors.
function getAllDirectors(movies) {
  const directors = movies.map((pelicula) => pelicula.director);
  //console.log(directors);
  return directors;
}

// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(movies, director) {
  const peliculasDirectores = movies.filter(
    (pelicula) => pelicula.director === director
  );
  //console.log (peliculasDirectores);
  return peliculasDirectores;
}
// Exercise 3: Calculate the average of the films of a given director.
function moviesAverageOfDirector(movies, director) {
  const peliculasDirectores = getMoviesFromDirector(movies, director);
  const puntuosPeliculas = peliculasDirectores.reduce(
    (acumulador, pelicula) => acumulador + pelicula.score,
    0
  );
  const average = (puntuosPeliculas / peliculasDirectores.length).toFixed(2);
  //console.log('average', average);
  return parseFloat(average);
}

// Exercise 4:  Alphabetic order by title
function orderAlphabetically(movies) {
  const titulospeliculas = movies.map((pelicula) => pelicula.title);
  const ordenalfabeto = titulospeliculas.sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });
  //console.log('ordenando', ordenalfabeto);
  return ordenalfabeto.slice(0, 20);
}

// Exercise 5: Order by year, ascending
function orderByYear(movies) {
  let peliculasOrdenadas = [];
  const tablaPeliculasAnio = obtenerPeliculasOrdenadasAnio(movies);
  Object.values(tablaPeliculasAnio).forEach((peliculasAnio) => {
    if (peliculasAnio.length === 1) {
      peliculasOrdenadas.push(peliculasAnio[0]);
    } else {
      const pelisOrdenadasTitulo = ordenarPeliculasTitulo(peliculasAnio);
      peliculasOrdenadas = [...peliculasOrdenadas, ...pelisOrdenadasTitulo];
    }
  });
  //console.log('aray de peliculas final', peliculasOrdenadas);
  return peliculasOrdenadas;
}

function ordenarPeliculasTitulo(movies) {
  const ordenTitulo = movies.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  return ordenTitulo;
}

function obtenerPeliculasOrdenadasAnio(movies) {
  const tablaPeliculas = {};
  movies.forEach((pelicula) => {
    const pelicuasEnAnio = tablaPeliculas[pelicula.year];
    if (!pelicuasEnAnio) {
      tablaPeliculas[pelicula.year] = [pelicula];
    } else {
      tablaPeliculas[pelicula.year].push(pelicula);
    }
  });
  //console.log('peliculas ordenadas anio', tablaPeliculas);
  return tablaPeliculas;
}

// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory(movies, genre) {
  const generoPeliculas = movies.filter((pelicula) =>
    pelicula.genre.includes(genre)
  );
  if (generoPeliculas.length === 0) {
    return 0;
  }
  const sumaPromedio = generoPeliculas.reduce(
    (suma, pelicula) => suma + pelicula.score,
    0
  );
  const promedio = sumaPromedio / generoPeliculas.length;
  //console.log('promdeio', promedio);
  return promedio;
}

// Exercise 7: Modify the duration of movies to minutes
function hoursToMinutes(movies) {
  const moviesInminutes = movies.map((pelicula) => {
    const duracion = pelicula.duration;
    const horas = duracion.match(/(\d+)h/);
    const minutos = duracion.match(/(\d+)min/);
    const horasExtraidas = horas ? parseInt(horas[1]) : 0;
    const minutosExtraidos = minutos ? parseInt(minutos[1]) : 0;
    const nuevaDuracion = horasExtraidas * 60 + minutosExtraidos;
    return { ...pelicula, duration: nuevaDuracion };
  });
  return moviesInminutes;
}

// Exercise 8: Get the best film of a year
function bestFilmOfYear(movies, year) {
  const pelicuasEnAnio = movies.filter((pelicula) => pelicula.year === year);
  if (pelicuasEnAnio.length === 0) {
    return null;
  }
  let mejorPeliculaAnio = pelicuasEnAnio[0];
  pelicuasEnAnio.forEach((pelicula) => {
    if (pelicula.score > mejorPeliculaAnio.score) {
      mejorPeliculaAnio = pelicula;
    }
  });
  return [mejorPeliculaAnio];
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getMoviesFromDirector,
    moviesAverageOfDirector,
    orderAlphabetically,
    orderByYear,
    moviesAverageByCategory,
    hoursToMinutes,
    bestFilmOfYear
  };
}
