/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from "axios";

const baseURL = "http://127.0.0.1:4000";
function axiosRequest(request:string, baseURL:string, URL:string,data:object) {
  // eslint-disable-next-line sonarjs/no-all-duplicated-branches
  return  axios[request](baseURL + URL, data);  
}

function axioRequest(request:string, baseURL:string, URL:string) { //,data?:object) {
  // eslint-disable-next-line sonarjs/no-all-duplicated-branches
  return  axios[request](baseURL + URL);  
}

const endpoints = {
  login: (data) => axiosRequest('post', baseURL, "/authorize", data),
  logout: (data) => axiosRequest('post', baseURL, "/logout", data),
  postOrganization: (data) => axiosRequest('post', baseURL, `/organization`, data),
  postDivision: (data) => axiosRequest('post', baseURL, `/division`, data),
  postEmployee: (data, employeeId) => axiosRequest('post', baseURL, `/employee/?id=${employeeId}`, data),
  putOrganization: (data, organizationId) => axiosRequest('put', baseURL, `/organization/?id=${organizationId}`, data),
  putDivision: (data, divisionId) => axiosRequest('put', baseURL, `/division/?id=${divisionId}`, data),
  putEmployee: (data, employeeId) => axiosRequest('put', baseURL, `/employee/?id=${employeeId}`, data),
  delOrganization: (organizationId) => axioRequest('delete', baseURL, `/organization/?id=${organizationId}`),
  delDivision: (divisionId) => axioRequest('delete', baseURL, `/division/?id=${divisionId}`),
  delEmployee: (employeeId) => axioRequest('delete', baseURL, `/employee/?id=${employeeId}`),
  getOrganization: () => axios.get(baseURL + `/organization`),
  getDivision: (organizationId) => axios.get(baseURL + `/division/?id=${organizationId}`),
  getEmployee: (employeeId) => axios.get(baseURL + `/employee/?id=${employeeId}`),
};

export default endpoints;