import { csrfFetch } from './csrf'


const GET_FRIEND_ID = 'friend/GET_FRIEND_ID';

const getFriendById = (friend) => ({
    type: GET_FRIEND_ID,
    friend
})

const initialState = {};

export const getFriendIdThunk = (id) => async (dispatch) => {
    
    const res = await csrfFetch(`/api/friends/${Number(id)}`)
    
    const { details } = await res.json()
    
    if (res.ok) {
        
        dispatch(getFriendById(details))

    }
    return res
}

const friendDetailsReducer = (state = initialState, action) => {
    let newState = {...state};
    
    switch(action.type){
        case GET_FRIEND_ID:
            return { ...state, ...action.friend }

        default:
            return state;
    }
};

export default friendDetailsReducer;