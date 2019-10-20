import {FETCH_URL} from "../utils/constants";

export default class fitnessServices {
  addFitness = (fitness) => {
    return fetch(FETCH_URL + 'fitness', {
        method: 'post',
        body: JSON.stringify(regularUser),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "same-origin"
    }).then(res => console.log(res));
  }

  findFitnessData= (userId) => {
    return fetch(FETCH_URL + 'fitness/' + userID+'/fitnessdata')
        .then(function(response){
            return response.json();
        });
  }
}
