import { baseUrl } from "../config";
import httpClient from '../http';

const basePath = baseUrl + "/api/teachers"
const bloc = {
  getTeacher: () => {
    return httpClient.get(basePath);
  },
  signupTeacher: name => {
    return httpClient.post(basePath, { body: { name } });
  },
};

export default bloc;