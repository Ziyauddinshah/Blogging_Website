import axios from "axios";
const login = (emailId, password) => {
  return axios.post("http://localhost:3005/users/login", {
    email: emailId,
    password: password,
  });
};
const register = (firstname, email, password) => {
  return axios.post("http://localhost:3005/users/register", {
    firstname: firstname,
    email: email,
    password: password,
  });
};
const user_id_from_token = (token) => {
  let config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  return axios.get("http://localhost:3005/users/id_from_token", config);
};
export { login, register, user_id_from_token };
