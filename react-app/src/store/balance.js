import { csrfFetch } from './csrf'

const GET_BALANCE = 'balance/GET_BALANCE';

const getBalance = (balance) => ({
    type: GET_BALANCE,
    balance
})

export const getBalanceThunk = () => async (dispatch) => {
    const res = await csrfFetch(`/api/users/balance/`);
    
    const { balance, owe, owed } = await res.json()
    // console.log(datahere, 'ASDNASJLDNSAFA')
    
    if (res.ok) {
        const data = {}
        data['owe'] = owe;
        data['owed'] = owed
        data['balance'] = balance
        // balance.forEach((balance) => data[balance.id] = balance)
        // data[owe] = owe
        // data[owed] = owed
        dispatch(getBalance(balance, owe, owed))
    }
    return res
}

const initialState = {}

const balanceReducer = (state = initialState, action) => {
    let newState = {...state};

    switch(action.type){
        case GET_BALANCE:
            return {...state, ...action.balance}

        default:
          return state
    }
};

export default balanceReducer;
