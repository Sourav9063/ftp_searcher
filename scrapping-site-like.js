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
  let zeros = [];

  for (let i = 0; i < globalMedia.length; i++) {
    console.log({ i });
    const allLinks = await getAllLinks({ sameLink: globalMedia[i] });
    if (allLinks.length == 0) {
      zeros.push(globalMedia[i]);
    }
    console.log("allLinks:" + allLinks.length);
    await timeout(5000);
    newGlobalMedia = [...newGlobalMedia, ...allLinks];
    if (i % 100 == 0) {
      newGlobalMedia = [...globalMedia, ...newGlobalMedia];
      newGlobalMedia = [...new Set(newGlobalMedia)];
      fs.writeFileSync(
        "./globalMedia-new.json",
        JSON.stringify({ globalMedia: newGlobalMedia, zeros: zeros })
      );
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
    "./globalMedia-new.json",
    JSON.stringify({ globalMedia: newGlobalMedia, zeros: zeros })
  );
};

const zeros = async () => {
  // const res = await fetch(existingDb);
  // const data = await res.json();
  const data = fs.readFileSync("./globalMedia-new2.json");
  const all = JSON.parse(data);
  const globalMedia = all.zeros;

  let newGlobalMedia = all.globalMedia;
  let zeros = [];

  for (let i = 0; i < globalMedia.length; i++) {
    console.log({ i });
    const allLinks = await getAllLinks({ sameLink: globalMedia[i] });
    if (allLinks.length == 0) {
      zeros.push(globalMedia[i]);
    }
    console.log("allLinks:" + allLinks.length);
    await timeout(5000);
    newGlobalMedia = [...newGlobalMedia, ...allLinks];
    if (i % 100 == 0) {
      newGlobalMedia = [...globalMedia, ...newGlobalMedia];
      newGlobalMedia = [...new Set(newGlobalMedia)];
      fs.writeFileSync(
        "./globalMedia-new2.json",
        JSON.stringify({ globalMedia: newGlobalMedia, zeros: zeros })
      );
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
    "./globalMedia-new3.json",
    JSON.stringify({ globalMedia: newGlobalMedia, zeros: zeros })
  );
};

// zeros();
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

async function clean({ type }) {
  const res = fs.readFileSync("./clean.json");

  const data = JSON.parse(res);
  const subData = data[type];
  for (let rmURL of data?.removed) {
    const rm = await getAllLinks({ sameLink: rmURL });
    console.log(rm);
    console.log(rm.length);
    shuffleArray(subData);
    console.log(subData.length);
    for (let url of rm) {
      subData.splice(subData.indexOf(url), 1);
    }
    console.log(subData.length);
    fs.writeFileSync(
      "./clean.json",
      JSON.stringify({
        [type]: [...subData],
        removed: [...rm, ...data?.removed],
      })
    );
    await timeout(5000);
  }
}

async function newAdd({ type }) {
  const res = fs.readFileSync("./new.json");

  const data = JSON.parse(res);
  let subData = data[type];
  const done = data?.done;
  for (let rmURL of subData) {
    if (
      done.includes(rmURL) ||
      rmURL.includes("facebook") ||
      rmURL.includes("blog") ||
      rmURL.includes("youtube") ||
      rmURL.includes("yts") ||
      rmURL.includes("uwatchfree") ||
      !rmURL.includes("fbox")
    ) {
      console.log("skipped");
      continue;
    }
    done.push(rmURL);
    const rm = await getAllLinks({ sameLink: rmURL });
    console.log(rm);
    console.log(rm.length);
    // shuffleArray(subData);
    console.log(subData.length);
    let count = 0;
    for (let url of rm) {
      if (!subData.includes(url)) {
        subData = [url, ...subData];
        count++;
      }
      if (count == 10) {
        break;
      }
    }
    console.log(subData.length);
    fs.writeFileSync(
      "./new.json",
      JSON.stringify({
        [type]: [...subData],
        done: [...done],
      })
    );
    await timeout(5000);
  }
}
newAdd({ type: "globalMedia" });

//(.)*anix|cartoon|watch|movie|tv|film|cine|show|serie|soap|bflix|flix|anim|1hd|m4u|stream|media|drama|zoro|goku|putlocker(.)*

const htmlParse = async ({ site, querySelectorAll }) => {
  const res = await fetch(site);
  console.log(res);
  const data = await res.text();
  console.log(data.length);
  const dom = parser.parse(data);
  const elements = dom.querySelectorAll(querySelectorAll);
  console.log(elements.length);
  return elements;
};
// htmlParse({
//   site: "https://fmoviesz.to",
//   querySelectorAll: "*",
// });
