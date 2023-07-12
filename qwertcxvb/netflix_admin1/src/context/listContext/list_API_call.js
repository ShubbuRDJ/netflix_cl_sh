import axios from "axios";
import {createListsFailure, createListsStart, createListsSuccess, deleteListsFailure, deleteListsStart, deleteListsSuccess, getListsFailure, getListsStart, getListsSuccess} from './ListActions'

// fetch list 
export const getList = async(dispatch)=>{
    dispatch(getListsStart());
    try {
        const res = await axios.get('/lists/fetchList',{headers:{auth_token:"xsdhgklrtu "+JSON.parse(localStorage.getItem('user')).accessToken}});
        dispatch(getListsSuccess(res.data));
    } catch (error) {
        dispatch(getListsFailure());
    }
} 

// create list 
export const createList = async(list,dispatch)=>{
    dispatch(createListsStart());
    try {
        const res = await axios.post('/lists/addList',list,{headers:{auth_token:"xsdhgklrtu "+JSON.parse(localStorage.getItem('user')).accessToken}});
        dispatch(createListsSuccess(res.data));
    } catch (error) {
        dispatch(createListsFailure());
    }
} 

// delete list 
export const deleteList = async(id,dispatch)=>{
    dispatch(deleteListsStart());
    try {
        await axios.delete('/lists/deleteList/'+id,{headers:{auth_token:"xsdhgklrtu "+JSON.parse(localStorage.getItem('user')).accessToken}});
        dispatch(deleteListsSuccess(id));
    } catch (error) {
        dispatch(deleteListsFailure());
    }
} 
