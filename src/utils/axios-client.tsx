import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL;
// axiosClient.defaults.timeout = 10000;
axiosClient.defaults.headers.common = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = false;

const setTokenHeader = () => {
  axiosClient.defaults.headers.common = {
    "Content-Type": "application/json",
    Accept: "application/json",
    authorization: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).accessToken : '',
  };
};

const setNoTokenHeader = () => {
  axiosClient.defaults.headers.common = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
};

const setFormHeader = () => {
  axiosClient.defaults.headers.common = {
    "Content-Type": "multipart/form-data",
    authorization: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).accessToken : '',
  };
};

export async function getCustomRequest(URL: string) {
  const response = await axios.get(`/${URL}`);
  return response;
}

export async function getRequestNoToken(URL: string, options = {}) {
  setNoTokenHeader();
  const response = await axiosClient.get(`/${URL}`, options);
  return response;
}

export async function getRequest(URL: string, options = {}) {
  setTokenHeader();
  const response = await axiosClient.get(`/${URL}`, options);
  return response;
}

export async function getFileDownload(URL: string) {
  const response = await axios.get(
    process.env.REACT_APP_SERVER_BASE_URL + `/${URL}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).accessToken : '',
      },
      responseType: "blob",
    }
  );
  return response;
}

export async function postRequestNoToken(URL: string, payload: any, config = {}) {
  setNoTokenHeader();
  const response = await axiosClient.post(`/${URL}`, payload, config);
  return response;
}

export async function postRequest(URL: string, payload: any, config = {}) {
  setTokenHeader();
  const response = await axiosClient.post(`/${URL}`, payload, config);
  return response;
}
export async function postRequestWithForm(URL: string, payload: any, config = {}) {
  setFormHeader();
  const response = await axiosClient.post(`/${URL}`, payload, config);
  return response;
}

export async function putRequest(URL: string, payload: any) {
  setTokenHeader();
  const response = await axiosClient.put(`/${URL}`, payload);
  return response;
}

export async function putRequestWithForm(URL: string, payload: any) {
  setFormHeader();
  const response = await axiosClient.put(`/${URL}`, payload);
  return response;
}

export async function patchRequest(URL: string, payload: any) {
  setTokenHeader();
  const response = await axiosClient.patch(`/${URL}`, payload);
  return response;
}

export async function deleteRequest(URL: string) {
  setTokenHeader();
  const response = await axiosClient.delete(`/${URL}`);
  return response;
}
