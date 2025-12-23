import axios from "axios";

const firebaseURL = process.env.REACT_APP_FIREBASE_DB_URL;

if (!firebaseURL) {
  throw new Error(
    "REACT_APP_FIREBASE_DB_URL is not defined in environment variables"
  );
}

const api = axios.create({
  baseURL: firebaseURL,
  timeout: 15000,
});

/**
 * Normalizes Firebase paths and ensures `.json`
 */
const buildPath = (path) => `${path.replace(/^\/+/, "")}.json`;

/**
 * Centralized error handling
 */
const handleRequest = async (request) => {
  try {
    const res = await request();
    return res.data;
  } catch (err) {
    console.error("DB API Error:", err);

    const message =
      err?.response?.data?.error || err?.message || "Database request failed";

    throw new Error(message);
  }
};

export const dbApi = {
  get: (path) => handleRequest(() => api.get(buildPath(path))),

  post: (path, data) => handleRequest(() => api.post(buildPath(path), data)),

  put: (path, data) => handleRequest(() => api.put(buildPath(path), data)),

  patch: (path, data) => handleRequest(() => api.patch(buildPath(path), data)),

  remove: (path) => handleRequest(() => api.delete(buildPath(path))),
};
