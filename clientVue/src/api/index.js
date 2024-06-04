import axios from "axios"

const get = async (url) => {

    return new Promise(async (resolve, reject) => {

        setTimeout(async () => {
            try {
                const response = await axios.get(url)
                console.log("axios", response.data);
                resolve(response.data)
            } catch (err) {
                reject(err)
            }

        }, 1000);

    })
}

const getPhotos = () => get("http://localhost:3000/api/photos")

export {
    getPhotos,
}