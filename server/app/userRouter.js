import getRequestData from "./getRequestData.js";
import userController from "./userController.js";

const usersRouter = async (request, response) => {
  switch (request.method) {
    case "GET":
      if (request.url.match('/api/user/confirm/*')) {
        let url = request.url;
        let token = url.split("/")[4];
        let info = userController.verifyToken(token);
        if (info.verified) {
          userController.updateUserInfo();
        }
        response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        response.end(JSON.stringify(info));
      }
      if (request.url == "/api/user/") {
        let info = userController.getUsers();
        response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        response.end(JSON.stringify(info));
      }
      break;
    case "POST":
      if (request.url == "/api/user/register") {
        let userData = await getRequestData(request);
        let info = await userController.registerUser(JSON.parse(userData));
        response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        response.end(JSON.stringify(info));
      }
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
  }
};

export default usersRouter;
