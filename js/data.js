
import API from './api.js';


const endpoints = {
    SHOES: 'data/shoes',
    SHOE_BY_ID: 'data/shoes/',

};

const api = new API(
    '290BAF56-AFDC-7951-FFA3-967150454700',
    'E5568438-67FD-4942-AE38-10D2F2E86A54'
)

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);

// get all shoes
export async function getAll(text) {
    return api.get(endpoints.SHOES);
}

// create shoe
export async function create(shoe) {
    return api.post(endpoints.SHOES, shoe);
}

// get shoe by id
export async function getById(id) {
    return api.get(endpoints.SHOE_BY_ID + id);
}

// edit shoes by id
export async function edit(id, shoe) {
    return api.put(endpoints.SHOE_BY_ID + id, shoe);
}

// remove shoe
export async function remove(id) {
    return api.delete(endpoints.SHOE_BY_ID + id);
}

export function checkResult(result) {
    if (result.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }
}

