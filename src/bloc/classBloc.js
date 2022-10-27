import { baseUrl } from "../config";
import httpClient from "../http"

const basePath = baseUrl + "/api/classes"
const bloc = {
  getClass: classId => {
    return httpClient.get(`${basePath}/${classId}`);
  },
  createClass: name => {
    return httpClient.post(`${basePath}`, { body: { name } });
  },
  getStatistics: classId => {
    return httpClient.get(`${basePath}/${classId}/statistics`);
  },
};

export default bloc;