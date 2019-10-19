import {FETCH_URL} from "../utils/constants";

export default class UserServices {
    checkUserNameValidity = (uname) => {
        return fetch(FETCH_URL + 'username/' + uname)
            .then(res => {
                    return res.json();
                }
            );
    };

    verifyUser = (token) => {
        return fetch(FETCH_URL + 'account/verify?token=' + token)
            .then(res => res.json());
    }
    getProfile = () => {
        return fetch(FETCH_URL + 'profile')
            .then(res => {
                    return res.json();
                }
            );
    };

    updateProfile = (user) =>
        fetch(FETCH_URL+"user/"+user._id, {
            method : 'put',
            body : JSON.stringify(user),
            headers : {
                'content-type' : 'application/json'
            }

        }).then(response=> {
                return response.json()
        })

    loginUser = (username, password) => {
        return fetch(FETCH_URL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then(res => res.json());
    };

    logOutUser = (token) => {
        return fetch(FETCH_URL + 'logout?token=' + token)
            .then(res => res.json());
    }

    findById = userID => {
        return fetch(FETCH_URL + 'user/' + userID)
            .then(response => response.json());
    }



}
