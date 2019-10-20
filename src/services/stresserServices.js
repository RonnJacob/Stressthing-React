import {FETCH_URL} from "../utils/constants";

export default class stresserServices {
  addStresser = (stresser) => {
    return fetch(FETCH_URL + 'stresser', {
        method: 'post',
        body: JSON.stringify(regularUser),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "same-origin"
    }).then(res => console.log(res));
  }

  findStresser = (userId) => {
    return fetch(FETCH_URL + 'stresser/' + userID+'/stressdata')
        .then(function(response){
            return response.json();
        });
  }
}
