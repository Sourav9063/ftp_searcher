const mainLink = "https://www.sitelike.org";
const existingDb = "https://sourav9063.github.io/ftp-nextron/api/db.json";
const fs = require("fs");
const https = require("https");
const http = require("http");
const parser = require("node-html-parser");

const timeout = (delay) => {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, delay);
  });
};

const getAllLinks = async ({ sameLink }) => {
  try {
    const link = sameLink.split("//")[1].split("/")[0];
    console.log(mainLink + `/similar/${link}/`);
    const res = await fetch(mainLink + `/similar/${link}/`);
    const data = await res.text();
    const dom = parser.parse(data);
    const allLinks = [];
    dom.querySelectorAll("img+a").forEach((e) => {
      if (
        !e.innerHTML.includes("facebook") &&
        !e.innerHTML.includes("check Add Site page")
      ) {
        allLinks.push(`https://${e.innerHTML.trim()}`);
      }
    });
    return allLinks;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const init = async () => {
  const res = await fetch(existingDb);
  const data = await res.json();
  const globalMedia = data.globalMedia;
  let newGlobalMedia = [];

  for (let i = 0; i < globalMedia.length; i++) {
    console.log({ i });
    const allLinks = await getAllLinks({ sameLink: globalMedia[i] });
    console.log("allLinks:" + allLinks.length);
    await timeout(1000);
    newGlobalMedia = [...newGlobalMedia, ...allLinks];
    if (i % 100 == 0) {
      newGlobalMedia = [...new Set(newGlobalMedia)];
    }
    console.log("total:" + newGlobalMedia.length);
  }

  // globalMedia.forEach(async (link) => {
  //   const allLinks = await getAllLinks({ sameLink: link });
  //   await timeout(2000);
  //   newGlobalMedia = [...newGlobalMedia, ...allLinks];
  //   console.log(newGlobalMedia.length);
  // });
  newGlobalMedia = [...globalMedia, ...newGlobalMedia];
  newGlobalMedia = [...new Set(newGlobalMedia)];
  fs.writeFileSync(
    "./globalMedia.json",
    JSON.stringify({ globalMedia: newGlobalMedia })
  );
};

init();

