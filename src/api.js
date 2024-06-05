import axios from 'axios';

const CAT_API_URL = 'https://api.thecatapi.com/v1';
const DOG_API_URL = 'https://api.thedogapi.com/v1';

export const fetchCatImages = async (breedId = '') => {
    const response = await axios.get(`${CAT_API_URL}/images/search?limit=20&breed_ids=${breedId}`);
    return response.data;
};

export const fetchDogImages = async (breedId = '') => {
    const response = await axios.get(`${DOG_API_URL}/images/search?limit=20&breed_ids=${breedId}`);
    return response.data;
};

export const fetchCatBreeds = async () => {
    const response = await axios.get(`${CAT_API_URL}/breeds`);
    return response.data;
};

export const fetchDogBreeds = async () => {
    const response = await axios.get(`${DOG_API_URL}/breeds`);
    return response.data;
};

