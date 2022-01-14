import {createStore, combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {currentSongReducer, playlistReducer} from '../reducers/song'

const rootReducer = combineReducers({
  currentSongReducer,
  playlistReducer
})

export type playlistState = ReturnType<typeof playlistReducer>
export type currentSongState = ReturnType<typeof currentSongReducer>

export const songStore = createStore(rootReducer,{},applyMiddleware(thunk))


// Have a current song reducer and array of song reducer.