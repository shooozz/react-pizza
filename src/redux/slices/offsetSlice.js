import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { url, API_KEY, pageSize } from '../store'

// const [offsetLoaded, setOffsetLoaded] = React.useState(false)
// &offset=${pageCount ? offset[pageCount] : ''}
// import { selectOffset } from '../redux/slices/offsetSlice'
// const { offset } = useSelector(selectOffset)
// const offsetHandler = (response: any) => {
//     console.log(response)
//     if (typeof response === 'undefined') {
//         setOffsetLoaded(true)
//     } else {
//         dispatch(addOffset(response))
//     }
// }

const initialState = {
    count: 0,
    offset: [' '],
    status: 'loading' // idle | loading | succeeded | failed
}

export const fetchOffset = createAsyncThunk('offset/fetchOffset', async (_, thunkApi) => {
    const state = thunkApi.getState()
    // console.log(state.filter.pageCount)
    const { data } = await axios.get(`${url}?&pageSize=${pageSize}&offset=${state.offset.offset[state.offset.count]}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })
    return data.offset
})

export const offsetSlice = createSlice({
    name: 'offset',
    initialState,
    reducers: {
        addCount(state) {
            state.count++
            console.log(state.count)
            // state.offset.push(action.payload)
            // prevOffset => [...prevOffset, response]
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchOffset.pending, state => {
                state.status = 'loading'
            })
            .addCase(fetchOffset.fulfilled, (state, action) => {
                // if (action.payload) {
                // while (state.count < 4) {
                // console.log(state.count)
                state.count++
                fetchOffset()
                if (!state.offset.includes(action.payload)) {
                    state.offset.push(action.payload)
                }
                // }
                // }
                state.status = 'success'
            })
            .addCase(fetchOffset.rejected, state => {
                state.status = 'error'
                state.items = []
            })
    }
})

export const { addCount } = offsetSlice.actions

export const selectOffset = state => state.offset

export default offsetSlice.reducer
