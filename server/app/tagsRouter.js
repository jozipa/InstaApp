import getRequestData from "./getRequestData.js";
import tagsController from "./tagsController.js";
import { tagsArray } from "./model.js";

const tagsRouter = async (request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
  switch (request.method) {
    case "GET":
      if (request.url == "/api/tags/raw") {
        let tags = await tagsController.getAll();
        response.end(JSON.stringify(tags));
      }
      if (request.url == "/api/tags") {
        let tags = await tagsController.getAllAsObjects();
        response.end(JSON.stringify(tags));
      }
      if (request.url.match(/\/api\/tags\/([0-9]+)/)) {
        let url = request.url;
        let id = url.split("/")[3];
        let wanted = await tagsController.getOne(id);
        response.end(JSON.stringify(wanted));
      }
      break;
    case "POST":
      if (request.url == "/api/tags") {
        let newTag = await getRequestData(request);
        let info = tagsController.addNew(newTag);
        response.end(JSON.stringify(info.info));
      }
      break;
    case "PATCH":
      break;
    case "DELETE":
      break;
  }
};

export default tagsRouter;
