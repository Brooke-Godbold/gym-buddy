import fs from "fs";

export const postGym = () =>
  JSON.parse(
    fs.readFileSync(new URL("./../../data/test/postGym.json", import.meta.url))
  );
