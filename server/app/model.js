// inne potrzebne funkcje

let photosArray = [
  // {
  //   id: 1111111111,
  //   album: "album",
  //   originalName: "fileInfo.files.name",
  //   url: "fileInfo.url",
  //   lastChange: "original",
  //   history: [
  //     {
  //       status: "original",
  //       lastModifiedDate: "fileInfo.files.lastModifiedDate",
  //     },
  //   ],
  //   tags: [],
  // },
];
let tagsArray = [
  "#love",
  "#instagood",
  "#fashion",
  "#instagram",
  "#photooftheday",
  "#art",
  "#photography",
  "#beautiful",
  "#nature",
  "#picoftheday",
  "#travel",
  "#happy",
  "#cute",
  "#instadaily",
  "#style",
  "#tbt",
  "#repost",
  "#followme",
  "#summer",
  "#reels",
  "#like4like",
  "#beauty",
  "#fitness",
  "#food",
];

class TagsObjects {
  constructor(id, name, popularity) {
    this.id = id;
    this.name = name;
    this.popularity = popularity;
  }
}

let tagsObjectArray = [];
for (let i = 1; i <= tagsArray.length; i++) {
  tagsObjectArray.push(
    new TagsObjects(i, tagsArray[i - 1], Math.floor(Math.random() * 990) + 10)
  );
}

class User {
  constructor(id, name, lastname, email, confirmed, password, album, description) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.confirmed = confirmed;
    this.password = password;
    this.album = album;
    this.description = description
  }
}

let usersArray = [];

export {
  photosArray,
  tagsArray,
  tagsObjectArray,
  TagsObjects,
  usersArray,
  User,
};
