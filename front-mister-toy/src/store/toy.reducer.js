
export const SET_TOYS = 'SET_TOYS'

const initialState = {
    toys: [],
    filter: null,
}

export function toyReducer(state = initialState, action) {
    let toys

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        default:
            return state
    }
}