const fs = require("fs");

const init = async () => {
  const data = fs.readFileSync("./globalMedia-clean.json");
  const { globalMedia } = JSON.parse(data);
  console.log(globalMedia);
  let newGlobalMedia = [];

  for (let i = 0; i < 10; i++) {
    try {
      const res = await fetch(globalMedia[i]);
      const data = await res.text();
      if (res.ok && data) {
        newGlobalMedia.push(globalMedia[i]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // await globalMedia.forEach(async (link) => {
  //   try {
  //     const res = await fetch(link);
  //     const data = await res.text();
  //     if (data) {
  //       newGlobalMedia.push(link);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
  fs.writeFileSync(
    "./globalMedia-clean.json",
    JSON.stringify({ globalMedia: globalMedia, newGlobalMedia: newGlobalMedia })
  );
};

init();
