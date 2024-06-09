import formidable from "formidable";
import path, { resolve } from "path";
import jsonController from "./jsonController.js";
import fs from "fs"
const __dirname = path.resolve();

const fileController = {
  getFile: async (data) => {
    let url = data.url.split("/")
    let fileName = url[url.length-1];
    const imagePath = path.join(__dirname, 'upload', data.album, fileName);
  },
  addFile: async (req) => {
    let form = formidable({});
    form.keepExtensions = true;
    form.uploadDir = "upload";
    return new Promise((resolve) => {
      form.parse(req, function (err, fields, files) {
        let folderName = path.join(__dirname, "upload", fields.album)
        if (!fs.existsSync(folderName)) {
          fs.mkdir(folderName, (err) => {
            if (err) throw err
          })
        }

        let pathSplit = files.file.path.split("\\");
        let fileName = pathSplit[pathSplit.length - 1];
        let newFilePath = path.join(folderName, fileName);
        let newFilePathSplit = newFilePath.split("\\");

        fs.rename(files.file.path, newFilePath, function (err) {
          if (err) throw err
        })

        let flag = false;
        let url = '';
        for (let i = 0; i < newFilePathSplit.length; i++) {
          if (newFilePathSplit[i] == 'upload') flag = true;
          if (flag) {
            url = path.join(url, newFilePathSplit[i]);
          }
        }

        const fileInfo = {
          files: files.file,
          fields: fields.album,
          url: url
        }
        resolve(fileInfo)

      });
    })
  },
};

export default fileController
