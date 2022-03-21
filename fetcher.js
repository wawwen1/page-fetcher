let request = require('request');
let fs = require('fs');
let args = process.argv.slice(2);
let url = args[0];
let filePath = args[1];

const print = (path) => {
  fs.stat(path, (err, stats) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log(`Downloaded and saved ${stats.size} bytes to ${path}`);
  });
};

const writeToFile = (content, path) => {
  fs.writeFile(path, content, err => {
    if (err) {
      console.log(err);
      return err;
    }
    print(path);
  });
};

const fetcher = (data, path) => {
  request(data, (err, response, body) => {
    if (err) {
      console.log(err);
      return err;
    }
    writeToFile(body, path);
  });
};

fetcher(url, filePath);