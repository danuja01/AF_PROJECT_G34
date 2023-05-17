import { FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, FETCH_POST, END_LOADING, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../services/posts';

// Action Creators -> are functions that return actions


export const getPost = (id) => async (dispatch) => {
    try {
      //dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
  
      dispatch({ type: FETCH_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
  };



export const getPosts = () => async (dispatch) => {
    
    try {

        //dispatch({ type: START_LOADING });

        const { data } = await api.fetchPosts(); //data represents the posts
    
        dispatch({ type: FETCH_ALL, payload: data });
        //dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);    
    }


};

//search action 
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        //dispatch({ type: START_LOADING });
        const data = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: data.data });
        //dispatch({ type: END_LOADING });
        console.log(data)
    } catch (error) {
        console.log(error);
    }
}

  
//create action
export const createPost = (post) => async (dispatch) => {
    try {
        //dispatch({ type: START_LOADING });
        const data  = await api.createPost(post);
        
        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error);
    }
};

//update action
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data} = await api.updatePost(id, post);
        
        dispatch( { type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
};

//delete action
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

//like action
export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
  
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };