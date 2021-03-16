import axios from "axios";

const instance = axios.create({
  baseURL: "https://nameless-lake-62164.herokuapp.com",
});
export default instance;
