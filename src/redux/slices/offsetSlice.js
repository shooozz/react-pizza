import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    offset: ['']
}

export const offsetSlice = createSlice({
    name: 'offset',
    initialState,
    reducers: {
        addOffset(state, action) {
            state.offset.push(action.payload)
            // prevOffset => [...prevOffset, response]
        }
    }
})

export const { addOffset } = offsetSlice.actions

export const selectOffset = state => state.offset

export default offsetSlice.reducer
