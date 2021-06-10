import {createStore,applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import rootreducer from './reducers/index'

import {composeWithDevTools} from 'redux-devtools-extension'
const store = createStore(
    rootreducer,
    composeWithDevTools(applyMiddleware(thunk))
)

const DataProvider = ({children}) => {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
} 
export default DataProvider