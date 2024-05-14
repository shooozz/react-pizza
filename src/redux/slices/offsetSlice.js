import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    offset: ['']
}

export const offsetSlice = createSlice({
    name: 'offset',
    initialState,
    reducers: {
        addOffset(state, action) {
            console.log(state, 'STATE')
            console.log(action, 'ACTION')
            state.offset.push(action.payload)
            // prevOffset => [...prevOffset, response]
        }
    }
})

export const { addOffset } = offsetSlice.actions

export default offsetSlice.reducer
