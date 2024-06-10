import { createServer } from "http";
import imageRouter from "./app/imageRouter.js";
import tagsRouter from "./app/tagsrouter.js";
import filtersRouter from "./app/filtersRouter.js";
import usersRouter from "./app/userRouter.js";
import usersRouter2 from "./app/userRouter2.js";
import userController from "./app/userController.js";
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
  if (req.url.search("/api/photos") != -1 || req.url.search("/api/getimage") != -1) {
    // if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    //   let token = req.headers.authorization.split(" ")[1]
    //   let check = userController.verifyToken(token)
    //   if (check.verified) {
    //   }
    //   }
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

  //users router
  else if (req.url.search("/api/profile") != -1) {
    console.log('asdasdadsadasda');
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      let token = req.headers.authorization.split(" ")[1]
      let check = userController.verifyToken(token)
      console.log('dupa', check);
      if (check.verified) {
        await usersRouter2(req, res, check);
      }
    }
  }
}).listen(process.env.APP_PORT, () =>
  console.log(`listen on ${process.env.APP_PORT}`)
);
