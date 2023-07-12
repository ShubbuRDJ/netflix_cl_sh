//1. action for get movie 
export const getMovieStart = ()=>({
    type:"GET_MOVIES_START",
});
export const getMovieSuccess = (movies)=>({
    type:"GET_MOVIES_SUCCESS",
    payload:movies,
});
export const getMovieFailure = ()=>({
    type:"GET_MOVIES_FAILURE",
}); 

//2. action for create movie
export const createMovieStart = ()=>({
    type:"CREATE_MOVIE_START",
});
export const createMovieSuccess = (movies)=>({
    type:"CREATE_MOVIE_SUCCESS",
    payload:movies,
});
export const createMovieFailure = ()=>({
    type:"CREATE_MOVIE_FAILURE",
}); 

//3. action for create movie
export const updateMovieStart = ()=>({
    type:"UPDATE_MOVIE_START",
});
export const updateMovieSuccess = (movie)=>({
    type:"UPDATE_MOVIE_SUCCESS",
    payload:movie,
});
export const updateMovieFailure = ()=>({
    type:"UPDATE_MOVIE_FAILURE",
}); 

//4. action for delete movie
export const deleteMovieStart = ()=>({
    type:"DELETE_MOVIE_START",
});
export const deleteMovieSuccess = (id)=>({
    type:"DELETE_MOVIE_SUCCESS",
    payload:id,
});
export const deleteMovieFailure = ()=>({
    type:"DELETE_MOVIE_FAILURE",
}); 