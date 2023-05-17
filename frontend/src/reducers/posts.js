import { FETCH_ALL, CREATE, UPDATE, FETCH_POST,DELETE, LIKE, FETCH_BY_SEARCH } from '../constants/actionTypes';

export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case FETCH_BY_SEARCH:
            return action.payload;
        case FETCH_POST:
                return {post: action.payload };
        case LIKE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case CREATE:
            return [...posts, action.payload];
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post) //action.payload is the updated post        
        default:
            return posts;

    }
};