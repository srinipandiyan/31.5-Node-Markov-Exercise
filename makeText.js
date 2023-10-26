/** Command-line tool to generate Markov text. */

const markov = require("./markov");
const fs = require("fs");
const process = require("process");
const axios = require("axios");


/** Call Markov machine on text and output text onto console */

function generateText(text) {
  let output = new markov.MarkovMachine(text);
  console.log(output.makeText());
}


/** read the file to generate text from or display verbose error message */

function makeText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path} (${err}).`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });

}


/** read and generate text from URL or display verbose error message. */


async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url} (${err}).`);
    process.exit(1);
  }
  generateText(resp.data)
}


/** interpret cmd line arguements to determine function calls. */

let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
