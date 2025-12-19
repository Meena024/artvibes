import axios from "axios";

const firebaseURL = process.env.REACT_APP_FIREBASE_DB_URL;

export const dbApi = {
  get: async (path) => {
    const res = await axios.get(`${firebaseURL}/${path}.json`);
    return res.data;
  },

  post: async (path, data) => {
    const res = await axios.post(`${firebaseURL}/${path}.json`, data);
    return res.data;
  },

  put: async (path, data) => {
    const res = await axios.put(`${firebaseURL}/${path}.json`, data);
    return res.data;
  },

  patch: async (path, data) => {
    const res = await axios.patch(`${firebaseURL}/${path}.json`, data);
    return res.data;
  },

  remove: async (path) => {
    const res = await axios.delete(`${firebaseURL}/${path}.json`);
    return res.data;
  },
};
