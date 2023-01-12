
export const SET_USER = 'SET_USER'
export const SET_USER_ACTIVITY = 'SET_USER_ACTIVITY'

const initialState = {
    user: null
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case SET_USER_ACTIVITY:
            state.user.activities.push(action.activity)
            if(action.activity.status === 'add todo') state.user.balance += 10
            return { ...state }
        default:
            return state
    }
}
