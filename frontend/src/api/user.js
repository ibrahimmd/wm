import config from '../config/config.json'
import axios from 'axios';

var endpoint = config.app.api.endpoint;

export async function get_user (user_id) {    
    return axios.get(`${endpoint}/user/${user_id}`,{});
}      

const user = {
    get_user    
};

export default user;