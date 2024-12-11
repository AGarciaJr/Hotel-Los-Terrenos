import axios from 'axios';

const CORP_API_BASE_URL = 'http://localhost:8080/api/corporations';

export const listCorporations = () => axios.get(CORP_API_BASE_URL);

export const getCorporation = (corpId) => {
    // Remove any non-corporation IDs to prevent unnecessary API calls
    if (!corpId || !corpId.toString().startsWith('CORP')) {
        return Promise.reject('Not a corporation ID');
    }
    return axios.get(`${CORP_API_BASE_URL}/${corpId}`);
};

export const validateCorporateId = (corpId) => {
    if (!corpId || !corpId.toString().startsWith('CORP')) {
        return Promise.reject('Not a corporation ID');
    }
    return axios.get(`${CORP_API_BASE_URL}/${corpId}`);
};