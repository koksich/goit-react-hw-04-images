import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
    key: '35168652-e3d07a1f2c4886b9d79735066',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
};

export const fetchImages = async (query, page) => {
    const { data } = await axios.get(`?q=${query}&page=${page}`);
    return data;

}