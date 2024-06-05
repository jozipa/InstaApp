import getRequestData from "./getRequestData.js";
import userController from "./userController.js";

const usersRouter2 = async (request, response, token) => {
  switch (request.method) {
    case "GET":
      if (request.url == "/api/profile") {
        let userData = await userController.userProfileInfo(token)
        response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        response.end(JSON.stringify(userData));
      }
      break;
    case "POST":

      break;
    case "PATCH":
      if (request.url == "/api/profile") {
        let userData = await getRequestData(request);
        let info = await userController.updateUserData(JSON.parse(userData), token);
        response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        response.end(JSON.stringify(info));
      }
      break;
    case "DELETE":
      break;
  }
};

export default usersRouter2;
