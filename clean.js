const fs = require("fs");

const init = async () => {
  const data = fs.readFileSync("./globalMedia-clean.json");
  const { globalMedia } = JSON.parse(data);
  console.log(globalMedia);
  let newGlobalMedia = [];

  for (let i = 0; i < globalMedia.length; i++) {
    if (globalMedia[i].includes("bbc")) {
      console.log(globalMedia[i]);
      if (
        globalMedia[i].includes("stream") ||
        globalMedia[i].includes("watch") ||
        globalMedia[i].includes("live") ||
        globalMedia[i].includes("tv") ||
        globalMedia[i].includes("movie") ||
        globalMedia[i].includes("show")
      ) {
      } else {
        continue;
      }
    }
    newGlobalMedia.push(globalMedia[i]);
  }
  console.log(newGlobalMedia.length);
  console.log(globalMedia.length);
  newGlobalMedia = [...new Set(newGlobalMedia)];
  fs.writeFileSync(
    "./globalMedia-clean.json",
    JSON.stringify({ globalMedia: newGlobalMedia, oldGlobalMedia: globalMedia })
  );
};

const revert = () => {
  const data = fs.readFileSync("./globalMedia-clean.json");
  const { globalMedia, oldGlobalMedia } = JSON.parse(data);
  fs.writeFileSync(
    "./globalMedia-clean.json",
    JSON.stringify({
      globalMedia: oldGlobalMedia,
      oldGlobalMedia: oldGlobalMedia,
    })
  );
};

init();
