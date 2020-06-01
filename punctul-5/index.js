// for requesting a page and reading it
var request = require("request");
// for adding colors to the console logs
const colors = require("colors");
// for getting the arguments passed to the start script
const yargs = require("yargs").argv;
// regex for validating urls
const urlValidator = /http[s]?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
// function for checking if an url is valid or not
// attention, it only works for http and https urls
const isUrl = url => {
  return urlValidator.test(url);
};
// function that returns all the urls from a string
const getUrls = inputString => {
  return inputString.match(urlValidator) || [];
};
// for downloading the page
// we've wrapped the request in a Promise
// so that we may use async and await
function downloadPage(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (error) reject(error);
      if (response.statusCode != 200) {
        reject("Invalid status code <" + response.statusCode + ">");
      }
      resolve(body);
    });
  });
}

const crawler = async () => {
  // get the passed to url
  // the url from which the crawler will start
  let startUrl = yargs.url;
  // get the number of retries
  let x = yargs.x;
  // get the number of maximum parallel reads
  let y = yargs.y;
  // array for allready parsed urls
  let parsedUrls = [];
  // array for urls that are going to be parsed
  // will act as a que
  let toBeParsedUrls = [startUrl];
  // array that tells how many times an url has been parsed
  // this is for the maximum number of retries
  let howManyTimes = [];
  // check if the startUrl is a valid URL from where we can start our crawler
  if (isUrl(startUrl)) {
    // get all un-crawled/un-marked urls
    
    // if not, throw a nice error stating that the startUrl was wrong
  } else {
    throw new Error(
      "\n\nERROR:".red +
        " the provided url (".yellow +
        url.magenta.underline +
        ") is not valid. Please be sure to pass a valid url into the start script:\n\n"
          .yellow +
        "npm start -- --url $url".bgWhite.black +
        "\n\n"
    );
  }
};

crawler();
