import { tagsArray, tagsObjectArray, TagsObjects } from "./model.js";

const tagsController = {
  getAll: () => {
    return new Promise((resolve) => {
      resolve(tagsArray);
    });
  },
  getAllAsObjects: () => {
    return new Promise((resolve) => {
      resolve(tagsObjectArray);
    });
  },
  getOne: (id) => {
    return new Promise((resolve) => {
      let tag = tagsObjectArray.find((element) => element.id == id);
      resolve(tag);
    });
  },
  addNew: (str) => {
    let obj = JSON.parse(str);
    let tags = obj.tags;
    for (let i = 0; i < tags.length; i++) {
      let tag = tags[i];
      let exists = tagsObjectArray.find((element) => element.name == tag);
      if (exists != undefined) {
      } else {
        tagsObjectArray.push(
          new TagsObjects(
            tagsObjectArray.length + 1,
            tag,
            Math.floor(Math.random() * 990) + 10
          )
        );
        tagsArray.push(tag);
      }
    }
    let info = {
      info: `Tags: ${tags} added succesfully`,
      arr: tags,
      obj: obj,
    };
    return info;
  },
};

export default tagsController;
