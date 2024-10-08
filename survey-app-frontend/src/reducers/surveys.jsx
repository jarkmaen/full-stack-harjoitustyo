import storageService from '../services/storage'
import surveysService from '../services/surveys'
import { createSlice } from '@reduxjs/toolkit'
import { notify } from './notification'

const slice = createSlice({
    name: 'surveys',
    initialState: [],
    reducers: {
        set(state, { payload }) {
            return payload
        },
        add(state, { payload }) {
            return state.concat(payload)
        },
        alter(state, { payload }) {
            return state.map((s) => (s.id !== payload.id ? s : payload))
        },
        remove(state, { payload }) {
            return state.filter((s) => s.id !== payload)
        }
    }
})

const { set, add, alter, remove } = slice.actions

export const addSurvey = (survey) => {
    return async (dispatch) => {
        const user = storageService.loadUser()
        if (!user) {
            dispatch(notify('You must be logged in to create a survey.', 'danger'))
            return { success: false }
        }
        try {
            const data = await surveysService.create(survey)
            dispatch(add(data))
            dispatch(notify('Survey created successfully!'))
            return { success: true }
        } catch {
            dispatch(notify('Failed to create survey.', 'danger'))
            return { success: false }
        }
    }
}

export const closeSurvey = (id) => {
    return async (dispatch) => {
        const data = await surveysService.close(id)
        dispatch(alter(data))
    }
}

export const initSurveys = () => {
    return async (dispatch) => {
        const data = await surveysService.getAll()
        dispatch(set(data))
    }
}

export const removeSurvey = (id) => {
    return async (dispatch) => {
        await surveysService.remove(id)
        dispatch(remove(id))
        dispatch(notify('Survey removed successfully!'))
    }
}

export const respondSurvey = (id, response) => {
    return async (dispatch) => {
        try {
            const user = storageService.loadUser()
            if (!user) {
                dispatch(notify('You must be logged in to submit a response.', 'danger'))
                return { success: false }
            }
            const formattedResponse = {
                questions: Object.entries(response).map(([id, response]) => ({ id, response }))
            }
            const data = await surveysService.respond(id, formattedResponse)
            dispatch(alter(data))
            dispatch(notify('Survey response submitted successfully!'))
            return { success: true }
        } catch {
            dispatch(notify('Failed to submit survey response.', 'danger'))
            return { success: false }
        }
    }
}

export default slice.reducer
