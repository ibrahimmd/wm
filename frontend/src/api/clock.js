import config from '../config/config.json'
import axios from 'axios';

var endpoint = config.app.api.endpoint;

export async function clock_in (user_id, clock_in) {    
    return axios.post( `${endpoint}/clock/in/${user_id}`, {
        clock_in: clock_in.toJSON()            
      });
}      

export async function clock_out (user_id, clock_out) {
    return axios.post( `${endpoint}/clock/out/${user_id}`, {
        clock_out: clock_out.toJSON()
      });
}      


const clock = {
    clock_in,
    clock_out
};

export default clock;