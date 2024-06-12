import { photosArray, tagsObjectArray } from "./model.js";
import tagsController from "./tagsController.js";

const jsonController = {
  add: (fileInfo) => {
    let photo = {
      id: new Date().getTime(),
      album: fileInfo.fields,
      originalName: fileInfo.files.name,
      url: fileInfo.url,
      lastChange: "original",
      history: [
        {
          status: "original",
          lastModifiedDate: fileInfo.files.lastModifiedDate,
        },
      ],
      tags: [],
    };
    photosArray.push(photo);
    return photo
  },
  getOne: (id) => {
    let wanted = photosArray.find((element) => element.id == id);
    if (wanted == undefined) {
      return "No such image";
    } else {
      return wanted;
    }
  },
  deleteOne: (id) => {
    let info = "No such file";
    for (let i = 0; i < photosArray.length; i++) {
      let element = photosArray[i];
      if (element.id == id) {
        info = "Photo deleted succesfully";
        photosArray.splice(i, 1);
      }
    }
    return info;
  },
  addTagToPhoto: (str) => {
    let info = tagsController.addNew(str);
    let arr = info.arr;
    let photo = photosArray.find((element) => element.id == info.obj.id);
    for (let i = 0; i < arr.length; i++) {
      let tag = arr[i];
      let tagObj = tagsObjectArray.find((element) => element.name == tag);
      photo.tags.push(tagObj);
    }
  },
  getTagsFromOne: (id) => {
    let wanted = photosArray.find((element) => element.id == id);
    if (wanted == undefined) {
      return "No such image";
    } else {
      let resoult = {
        id: wanted.id,
        tags: wanted.tags,
      };
      return resoult;
    }
  },
};

export default jsonController;
