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
  // will be used for adding all the found urls
  // at the begining, there will be only one url,
  // the one that was passed as an argument
  let allUrls = [
    {
      parsed: false,
      url: startUrl
    }
  ];
  // check if the startUrl is a valid URL from where we can start our crawler
  if (isUrl(startUrl)) {
    // get all un-crawled/un-marked urls
    let nextUrls = allUrls.filter(item => !item.parsed);
    while (nextUrls.length !== 0) {
      try {
        // mark the first un-crawled/un-marked url as crawled/marked
        allUrls = allUrls.map(item => {
          if (item.url === nextUrls[0].url) {
            return {
              parsed: true,
              url: item.url
            };
          } else {
            return item;
          }
        });
        let content = "";
        // get the contents given by the first un-crawled/un-marked
        // which now was set as marked
        const page = await new Promise((resolve, reject) => {
          request({ uri: nextUrls[0].url })
            .on("data", chunk => {
              content = content + chunk;
              if (content.length >= 2000) {
                // get all urls found on the contents
                // and add them to the list of all urls
                allUrls = allUrls
                  .concat(
                    // get all urls found on the contents
                    getUrls(content).map(item => {
                      allUrls.forEach(itemAllUrls => {
                        if (itemAllUrls.url === item) {
                          return null;
                        }
                      });
                      return {
                        parsed: false,
                        url: item
                      };
                    })
                  )
                  .filter(item => item !== null);
                content = "";
              }
            })
            .on("end", () => {
              resolve();
            });
        });
        // get all un-crawled/un-marked urls
        nextUrls = allUrls.filter(item => !item.parsed);
      } catch (error) {
        // if there is an error in the Promise, log it
        console.error("ERROR:".red);
        console.error(error.yellow);
      }
    }
    // if there are no more urls to be crawled
    // log a nice message for finished task
    console.log("Crawler has finished.".green);
    console.log(
      "It has crawled ".magenta + (allUrls.length + "").green + " urls".magenta
    );
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
