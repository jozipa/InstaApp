import axios from "axios";

const get = async (url) => {
  return new Promise(async (resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await axios.get(url);
        console.log("axios", response.data);
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

const getToken = async (url, data) => {
  console.log('getTOkaaaaa1');
  return new Promise(async (resolve, reject) => {
    console.log('getTOkaaaaa12');
    setTimeout(async () => {
      console.log('getTOkaaaaa69');
      try {
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.token}`, }
        console.log('getTOkaaaaa pizdaaa');
        const response = await axios.get(url, { headers: headers });
        console.log("getToken", response.data);
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    }, 1000);
  });
};

const postToken = async (url, data) => {

  return new Promise(async (resolve, reject) => {

    setTimeout(async () => {
      try {
        const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${data.token}`, }

        const response = await axios.post(url, { email: data.email }, {
          headers: headers
        })
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

const file = async (url, fd) => {

  return new Promise(async (resolve, reject) => {

      setTimeout(async () => {
          try {
              const response = await axios.post(url, fd, {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
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
const postFile = (object) => file("http://localhost:3000/api/photos", object)


export { getPhotos, deletePhotos, registerUser, loginUser, postFile };
