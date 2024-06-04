import { createServer } from "http";
import imageRouter from "./app/imageRouter.js";
import tagsRouter from "./app/tagsrouter.js";
import filtersRouter from "./app/filtersRouter.js";
import usersRouter from "./app/userRouter.js";
import "dotenv/config";

createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  //images
  if (req.url.search("/api/photos") != -1) {
    await imageRouter(req, res);
  }

  //tags
  else if (req.url.search("/api/tags") != -1) {
    await tagsRouter(req, res);
  }

  //filters
  else if (req.url.search("/api/filters") != -1) {
    await filtersRouter(req, res);
  }

  //users router
  else if (req.url.search("/api/user") != -1) {
    await usersRouter(req, res);
  }
}).listen(process.env.APP_PORT, () =>
  console.log(`listen on ${process.env.APP_PORT}`)
);
