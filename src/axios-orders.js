import axios from 'axios';

const firebase = axios.create({
    baseURL: 'https://burger-builder-47451.firebaseio.com/'
});

export default firebase;