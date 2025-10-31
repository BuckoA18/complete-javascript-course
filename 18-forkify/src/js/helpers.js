import { TIMEOUT_SEC } from "./config";

const timeout = (s) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Reguest took too long.. Timout after ${s} seconds`));
    }, 1000 * s);
  });
};

export const getJSON = async (url) => {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    return data;
  } catch (err) {
    console.error(err);
  }
};
