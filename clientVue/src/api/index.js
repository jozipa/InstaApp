import axios from "axios";

const get = async (url) => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        console.log('urk',url);
        const response = await axios.get(url);
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};


const getToken = async (url, token) => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, }
        const response = await axios.get(url, { headers: headers });
        console.log("getToken", response.data);
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

const postToken = async (url, email, token) => {

  return new Promise(async (resolve, reject) => {

    setTimeout(async () => {
      try {
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, }

        const response = await axios.post(url, email, {headers: headers})
        console.log("axios", response.data);
        resolve(response.data)
      } catch (err) {
        reject(err)
      }

    }, 1000);

  })
}

const patchToken = async (url, info, token) => {

  return new Promise(async (resolve, reject) => {

    setTimeout(async () => {
      try {
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, }

        const response = await axios.patch(url, info, {headers: headers})
        console.log("axios", response.data);
        resolve(response.data)
      } catch (err) {
        reject(err)
      }

    }, 1000);

  })
}

const post = async (url, object) => {

  return new Promise(async (resolve, reject) => {

    setTimeout(async () => {
      try {
        const response = await axios.post(url, object)
        console.log("axios", response.data);
        resolve(response.data)
      } catch (err) {
        reject(err)
      }

    }, 1000);
  })
}


const file = async (url, fd, data) => {

  return new Promise(async (resolve, reject) => {
    console.log('filePOst', data);
    setTimeout(async () => {
      try {
        const response = await axios.post(url, fd, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${data}` }
        })
        console.log("axios", response.data);
        resolve(response.data)
      } catch (err) {
        reject(err)
      }

    }, 1000);

  })
}



const getPhotos = (token) => getToken("http://localhost:3000/api/photos", token);
const deletePhotos = (id) => get(`http://localhost:3000/api/photos/${id}`);
const registerUser = (object) => post(`http://localhost:3000/api/user/register`, object)
const loginUser = (object) => post(`http://localhost:3000/api/user/login`, object)
const postFile = (object, token) => file("http://localhost:3000/api/photos", object, token)
const editProfile = (object, token) => patchToken(`http://localhost:3000/api/profile`, object, token)
const getUser = (email,token) => postToken("http://localhost:3000/api/user/current", email, token);
const getTagsArr = () => get(`http://localhost:3000/api/tags/raw`)



export { getPhotos, deletePhotos, registerUser, loginUser, postFile, editProfile, getUser, getTagsArr };
