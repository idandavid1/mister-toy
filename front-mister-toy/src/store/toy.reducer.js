
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'

const initialState = {
    toys: [],
    filter: null,
}

export function toyReducer(state = initialState, action) {
    let toys

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY: 
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }
        default:
            return state
    }
}