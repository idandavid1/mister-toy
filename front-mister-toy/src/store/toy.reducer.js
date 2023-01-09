import { toyService } from "../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_FILTER = 'SET_FILTER'

const initialState = {
    toys: [],
    filter: toyService.getEmptyFilter(),
}

export function toyReducer(state = initialState, action) {
    let toys

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case REMOVE_TOY: 
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }
        case UPDATE_TOY: 
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }
        case ADD_TOY:
            toys = [action.toy ,...state.toys]
            return { ...state, toys }

            case SET_FILTER:
                return { ...state, filter: action.filter }   
            
        default:
            return state
    }
}