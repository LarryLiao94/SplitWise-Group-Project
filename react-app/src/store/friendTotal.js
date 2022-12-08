import { csrfFetch } from './csrf'

const GET_TOTAL_BALANCE = 'friend/GET_TOTAL_BALANCE';

const getTotalBalance = (friendTotal) => ({
    type: GET_TOTAL_BALANCE,
    friendTotal
})

const initialState = {};

export const getTotalBalanceThunk = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/friends/${Number(id)}`)
    const { friendTotal } = await res.json()

    if (res.ok) {
        dispatch(getTotalBalance(friendTotal))
    }
    return res
}

const friendTotalReducer = (state = initialState, action) => {
    let newState = {...state};
    
    switch(action.type){
        case GET_TOTAL_BALANCE:
            newState.friendTotal = action.friendTotal
            return newState

        default:
            return state;
    }
};

export default friendTotalReducer;