const ADD_FRIEND = 'friend/ADD_FRIEND';
const REMOVE_FRIEND = 'friend/REMOVE_FRIEND';

const addFriend = (friend) => ({
    type: ADD_FRIEND,
    payload: friend
})

const initialState = {};

export const addFriendThunk = (friendEE) => async (dispatch) => {
    const response = await fetch(`/api/user/friends`, {
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

const friendsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type){
        case ADD_FRIEND:
            newState.friends = action.payload
            return newState;
        default:
            return state;
    }
};

export default friendsReducer;