import bcryptjs from "bcryptjs";
const { hash, compare } = bcryptjs;
import { usersArray, User } from "./model.js";
import jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;
import { jwtDecode } from "jwt-decode";





let userController = {
  registerUser: async (data) => {
    let validated = await userController.validateRegister(data);
    let info = {
      info: "user or email already exists",
      type: "error"
    };
    if (validated) {
      let encryptedPass = await userController.encryptPass(data.password);
      let token = await userController.createToken(data)
      let userObject = new User(
        new Date().getTime(),
        data.name,
        data.lastName,
        data.email,
        false,
        encryptedPass
      );
      usersArray.push(userObject);
      info = {
        info: `skopiuj poniższy link do przeglądarki
    http://localhost:3000/api/user/confirm/${token}
w celu potwierdzenia konta
Uwaga: link jest ważny przez godzinę`,
        userId: userObject.id,
        userArr: usersArray,
        type: "success"
      };
    }
    return new Promise((resolve, reject) => {
      resolve(info);
    });
  },
  loginUser: async (data) => {
    let user = usersArray.find((element) => element.email == data.email);
    let info = {
      info: "wrong email or unconfirmed user",
      type: 'error'
    };
    if (user != undefined && user.confirmed != false) {
      let validatePass = await userController.decryptPass(data.password, user.password);
      let token = await userController.createToken(data)
      if (validatePass) {
        info = {
          info: "logged succesfully",
          type: 'success',
          token: token,
        };
      }
      else { info.info = "wrong password" }
    }
    return new Promise((resolve, reject) => {
      resolve(info);
    });;
  },
  decryptPass: async (userpass, encrypted) => {
    let decrypted = await compare(userpass, encrypted)
    return new Promise((resolve, reject) => {
      resolve(decrypted);
    });
  },
  encryptPass: async (password) => {
    let encryptedPassword = await hash(password, 10);
    return new Promise((resolve, reject) => {
      resolve(encryptedPassword);
    });
  },
  validateRegister: async (data) => {
    return new Promise((resolve, reject) => {
      let name = usersArray.find((element) => element.name == data.name);
      let email = usersArray.find((element) => element.email == data.email);
      let validate = false;
      if (email == undefined && name == undefined) {
        validate = true;
      }
      resolve(validate);
    });
  },
  createToken: async (data) => {
    return new Promise((resolve, reject) => {
      let token = sign(
        {
          email: data.email,
          anyOtherData: "123"
        },
        process.env.VERY_SECRET_KEY, // key powinien być zapisany w .env
        {
          expiresIn: "15m" // "1m", "1d", "24h"
        }
      );
      resolve(token)
    })
  },
  verifyToken: (token) => {
    try {
      let decoded = verify(token, process.env.VERY_SECRET_KEY)
      return { verified: true, message: decoded }
    }
    catch (ex) {
      return { verified: false, message: ex.message };
    }
  },
  updateUserInfo: () => {
    usersArray[usersArray.length - 1].confirmed = true;
  },
  getUsers: () => {
    return usersArray
  },
  userProfileInfo: async (data) => {
    let info = {
      info: "you are not logged in",
      type: 'error'
    };
    if (data.verified) {
      let email = data.message.email
      let userData = usersArray.find((element) => element.email == email)
      if (userData != undefined) {
        info = {
          info: {
            name: userData.name,
            lastname: userData.lastname,
            email: userData.email,
          },
          type: 'success'
        };
      }
    }
    return new Promise((resolve, reject) => {
      resolve(info)
    })
  },
  updateUserData: (data, token) => {
    let name = usersArray.find((element) => element.name == data.name);
    let userData = usersArray.find((element) => element.email == token.message.email);
    let info = {
      info: "this name already exists",
      type: 'error'
    };
    if (name == undefined) {
      userData.name = data.name;
      userData.lastname = data.lastname;
      info = {
        info: "data updated successfully",
        type: 'success',
      };
    }
    return info
  }
};

export default userController;
