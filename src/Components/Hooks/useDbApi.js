import axios from "axios";

const firebaseURL = "https://trial1-c15f7-default-rtdb.firebaseio.com/";

export const useDbApi = () => {
  // GET
  const get = async (path) => {
    const res = await axios.get(`${firebaseURL}/${path}.json`);
    return res.data;
  };

  // POST
  const post = async (path, data) => {
    const res = await axios.post(`${firebaseURL}/${path}.json`, data);
    return res.data;
  };

  // PUT
  const put = async (path, data) => {
    const res = await axios.put(`${firebaseURL}/${path}.json`, data);
    return res.data;
  };

  // PATCH
  const patch = async (path, data) => {
    const res = await axios.patch(`${firebaseURL}/${path}.json`, data);
    return res.data;
  };

  // DELETE
  const remove = async (path) => {
    const res = await axios.delete(`${firebaseURL}/${path}.json`);
    return res.data;
  };

  return { get, post, put, patch, remove };
};
