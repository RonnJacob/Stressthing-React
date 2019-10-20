import {FETCH_URL} from "../utils/constants";

export default class StresserServices {
  addStresser = (stresser) => {
    return fetch(FETCH_URL + 'stresser', {
        method: 'post',
        body: JSON.stringify(stresser),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "same-origin"
    }).then(res => console.log(res));
  }

  findStresser = (userId) => {
    return fetch(FETCH_URL + 'stresser/' + userId+'/stressdata')
        .then(function(response){
            return response.json();
        });
  }
}
