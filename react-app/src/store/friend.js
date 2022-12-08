import { csrfFetch } from './csrf'

const ADD_FRIEND = 'friend/ADD_FRIEND';
const REMOVE_FRIEND = 'friend/REMOVE_FRIEND';
const GET_FRIENDS = 'friend/GET_FRIEND';
const GET_FRIEND_ID = 'friend/GET_FRIEND_ID';

const addFriend = (friend) => ({
    type: ADD_FRIEND,
    payload: friend
})

const getAllFriends = (friends) => ({
    type: GET_FRIENDS,
    friends
})

const getFriendById = (friend) => ({
    type: GET_FRIEND_ID,
    friend
})

const removeFriend = (friend) => ({
    type:REMOVE_FRIEND,
    friend
})

const initialState = {};

export const addFriendThunk = (friendEE) => async (dispatch) => {
    const response = await csrfFetch(`/api/friends/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(friendEE)
    });
    if (response.ok) {
        const newFriend = await response.json();
        dispatch(addFriend(newFriend));
    }
    return response;
}

export const getFriends = () => async (dispatch) => {
    const res = await csrfFetch(`/api/friends/`);
    const { friends, friendId } = await res.json()
    
    if (res.ok) {
        const data = {}
        friends.forEach((friend) =>  
            data[friend] = friend)
        dispatch(getAllFriends(data))
    }
    return res
}

export const removeFriendThunk = (friend) => async (dispatch) => {
    const res = await csrfFetch(`/api/friends/${friend.id}/edit`, {
        method: 'DELETE'
    })
    const data = await res.json();

    if (res.ok) {
        dispatch(removeFriend(friend))
        return data;
    }
}

const friendsReducer = (state = initialState, action) => {
    let newState = {...state};
    
    switch(action.type){
        case ADD_FRIEND:
            newState.friends = action.payload
            return newState;

        case GET_FRIENDS:
            return { ...state, ...action.friends }

        case REMOVE_FRIEND:
            delete newState[action.friend.id]
            return newState

        default:
            return state;
    }
};

export default friendsReducer;