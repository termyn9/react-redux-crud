import http from "../http/http-common-user";

const getAll = () => {
  return http.get("/users");
};

const create = (data) => {
  return http.post("/signup", data);
};

const UsersService = {
  create,
  getAll
};

export default UsersService;
