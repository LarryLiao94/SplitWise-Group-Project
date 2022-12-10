import FriendTabs from '../components/FriendDetails/FriendRightTab';
import { csrfFetch } from './csrf'

const ADD_FRIEND = 'friend/ADD_FRIEND';
const REMOVE_FRIEND = 'friend/REMOVE_FRIEND';
const GET_FRIENDS = 'friend/GET_FRIEND';
const GET_FRIEND_ID = 'friend/GET_FRIEND_ID';
const SEARCH_FRIENDS = 'friend/SEARCH_FRIENDS'

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

const findAllFriends = (friend) => ({
    type:SEARCH_FRIENDS,
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
        const newData = {
            'friends': {},
            'friendId' : {}
        }
        friends.forEach((friend) =>  
            data[friend] = friend)
        friends.forEach((friend) =>  
            newData['friends'][friend] = friend)
        friendId.forEach((friend) =>  
            newData['friendId'][friend] = friend)

        console.log(newData)
        
        dispatch(getAllFriends(newData))
    }
    return res
}

// export const filterFriends = (searchRes) => async (dispatch) => {
//     const res = await fetch(`/api/friends/search?firstName=${searchRes}`);
//     const { friends } = await res.json();

//     if (res.ok) {
//         const data = {}
//         friends.forEach((friend) => (data[friend.id] = friend));
//         dispatch(findAllFriends(data))
//         return friends;
//     }
// } 

export const removeFriendThunk = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/friends/${Number(id)}`, {
        method: 'DELETE'
    })
    const data = await res.json();

    if (res.ok) {
        dispatch(removeFriend(id))
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
            newState.friends = action.friends
            return newState;

        case REMOVE_FRIEND:
            delete newState[action.friend.id]
            // return newState

        default:
            return state;
    }
};

export default friendsReducer;