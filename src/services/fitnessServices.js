import {FETCH_URL} from "../utils/constants";

export default class FitnessServices {
  addFitness = (fitness) => {
    return fetch(FETCH_URL + 'fitness', {
        method: 'post',
        body: JSON.stringify(fitness),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "same-origin"
    }).then(res => console.log(res));
  }

  findFitnessData= (userId) => {
    return fetch(FETCH_URL + 'fitness/' + userId+'/fitnessdata')
        .then(function(response){
            return response.json();
        });
  }

  findLatestFitnessData = (userId) => {
    return fetch(FETCH_URL + 'fitness/' + userId+'/latest')
        .then(function(response){
            return response.json();
        });
  }
}
