import http from "../http/http-common-user";

const getAll = () => {
  return http.get("/users");
};

const get = id => {
  return http.get(`/users/${id}`)
}

const create = (data) => {
  return http.post("/signup", data);
};

const findByUsername = (username) => {
  return http.get(`/users?username=${username}`)
}

const remove = (id) => {
  return http.delete(`/users/${id}`);
}

const update = (id, data) => {
  return http.put(`/users/${id}`, data)
}

const UsersService = {
  create,
  getAll,
  get,
  findByUsername,
  remove,
  update,
};

export default UsersService;
