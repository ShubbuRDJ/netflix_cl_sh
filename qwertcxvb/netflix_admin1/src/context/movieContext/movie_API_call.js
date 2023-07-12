import axios from "axios";
import {createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMovieFailure, getMovieStart, getMovieSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess} from './MovieActions'


// 1. get movie  
export const getMovies = async(dispatch)=>{
    dispatch(getMovieStart());
    try {
        const res = await axios.get('/movies/allMovie',{headers:{auth_token:"xsdhgklrtu "+JSON.parse(localStorage.getItem('user')).accessToken}});
        dispatch(getMovieSuccess(res.data));
    } catch (error) {
        dispatch(getMovieFailure());
    }
} 

// 2. create movie 
export const createMovies = async(movie,dispatch)=>{
    dispatch(createMovieStart());
    try {
        const res = await axios.post('/movies/addMovie',movie,{headers:{auth_token:"xsdhgklrtu "+JSON.parse(localStorage.getItem('user')).accessToken}});
        dispatch(createMovieSuccess(res.data));
    } catch (error) {
        dispatch(createMovieFailure());
    }
}

// 3. update movie 
export const updateMovie = async(id,movie,dispatch)=>{
    dispatch(updateMovieStart());
    try {
        const res = await axios.put('/movies/updateMovie/'+id,movie,{headers:{auth_token:"xsdhgklrtu "+JSON.parse(localStorage.getItem('user')).accessToken}});
        dispatch(updateMovieSuccess(res.data));
    } catch (error) {
        dispatch(updateMovieFailure());
    }
}

// 4. delete movie 
export const deleteMovie = async(id,dispatch)=>{
    dispatch(deleteMovieStart());
    try {
        await axios.delete('/movies/deleteMovie/'+id,{headers:{auth_token:"xsdhgklrtu "+JSON.parse(localStorage.getItem('user')).accessToken}});
        dispatch(deleteMovieSuccess(id));
    } catch (error) {
        dispatch(deleteMovieFailure())
    }
} 