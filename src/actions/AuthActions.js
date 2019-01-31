import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCES,
    LOGIN_USER_FAIL,
    LOGIN_USER
}
    from './types'

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    }
}

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSucces(dispatch, user))
            .catch((error) => {
                //console.log(error)
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSucces(dispatch, user))
                    .catch(() => loginsUserFail(dispatch));
            })
    };
}

const loginsUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSucces = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCES,
        payload: user
    });
    Actions.main();
}