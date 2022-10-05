const ec = require('../extract-md-code')
// note : run this file from the test folder 

const test1 = async () => {
  await ec.main({
    input: "sample1.md",
    output: "./output/test1.js",
    filter: "js",
  });
  console.log(" js file done!");
};

const test2 = async () => {
  await ec.main({
    input: "sample1.md",
    output: "./output/test2.py",
    filter: "python",
  });
  console.log(" python file done!");
};


const test3 = async () => {
  await ec.main({
    input: "sample1.md",
    output: "./output/test3.md",
    filter: "none",
  });
  console.log(" unfiltered done!");
};

const main = async () => {
  await test1()
  await test2()
  await test3()

};

main()
  .then((data) => {})
  .catch((err) => {
    console.log(err);
  });



