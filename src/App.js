import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import firebase from 'firebase'
import reducers from './reducers';
import Router from './Router'
import LoginForm from './components/LoginForm'

class App extends Component {
    componentWillMount(){
        const config = {
            apiKey: "AIzaSyBsk4NqiGinASRwJpCo65sT0NWdT6fRqkc",
            authDomain: "manager-a916d.firebaseapp.com",
            databaseURL: "https://manager-a916d.firebaseio.com",
            projectId: "manager-a916d",
            storageBucket: "manager-a916d.appspot.com",
            messagingSenderId: "234414371096"
          };
          firebase.initializeApp(config);
    }
    render(){
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}

export default App;