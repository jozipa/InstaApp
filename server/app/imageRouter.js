import getRequestData from "./getRequestData.js";
import fileController from "./fileController.js";
import jsonController from "./jsonController.js";
import { photosArray } from "./model.js";

const imageRouter = async (request, response) => {
  switch (request.method) {
    case "GET":
      if (request.url == "/api/photos") {
        response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        response.end(JSON.stringify(photosArray));
      }
      if (request.url.match(/\/api\/photos\/([0-9]+)/)) {
        let url = request.url;
        let id = url.split("/")[3];
        let wanted = jsonController.getOne(id);
        response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        response.end(JSON.stringify(wanted));
      }
      if (request.url.match(/\/api\/photos\/tags\/([0-9]+)/)) {
        let url = request.url;
        let id = url.split("/")[4];
        let wanted = jsonController.getTagsFromOne(id);
        response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        response.end(JSON.stringify(wanted));
      }
      if (request.url.match(/\/api\/getimage\/([0-9]+)/)) {
        let url = request.url;
        let id = url.split("/")[3];
        let photoJson = jsonController.getOne(id);
        let photo = await fileController.getTagsFromOne(photoJson);
        response.writeHead(200, {'content-type':'image/jpg'});
        response.end(JSON.stringify(photo));
      }
      break;
    case "POST":
      if (request.url == "/api/photos") {
        let fileinfo = await fileController.addFile(request);
        jsonController.add(fileinfo);
      }
      break;
    case "PATCH":
      if (request.url == "/api/photos/tags") {
        let tags = await getRequestData(request);
        let info = jsonController.addTagToPhoto(tags);
      }
      break;
    case "DELETE":
      if (request.url.match(/\/api\/photos\/([0-9]+)/)) {
        let url = request.url;
        let id = url.split("/")[3];
        let wanted = jsonController.deleteOne(id);
        response.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        response.end(JSON.stringify(wanted));
      }
      
      break;
  }
};

export default imageRouter;
