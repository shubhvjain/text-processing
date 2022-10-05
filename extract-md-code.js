/**
version 1
this is a simple text  utility that extracts codeblocks from markdown file and generates a code file to run.

this program takes in a markdown file and extracts all code blocks from it. These codeboxes can then be filtered and saved as a file

inputs: 
- files : list of files to be read
- filter: critera to filter code blocks. a regular expression  that will be match with the first curly bracket of the codeblock  
- singleFile: boolean whether to generate a single file with all the codebocks. default : true
- outputPath: the path where the new file must be stored. include the fileNameand extension. if file already exists it will be replaced. 

output: 
saving a file in the given path 

**/

const fs = require("fs/promises");

const getCodeBlocks = (data) => {
  const blocks = data.match(/`{3}([\w]*)\n([\S\s]+?)\n`{3}/gm);
  return blocks || [];
};

const parseCodeBlockString = (block) => {
  if (!block) {
    throw new Error("Block empty");
  }
  const b1 = block.replaceAll("```", "");
  const st2 = b1.substring(0, 1);
  let b2 = b1;
  let filter = "none";
  if (st2 != "\n") {
    const parts = b2.split("\n");
    filter = parts[0];
    b2 = b2.replace(filter, "");
  }
  return { filter: filter, code: b2 };
};

const mdToCode = (blockStrings, options = { filter: "none" }) => {
  let blocks = [];
  blockStrings.map((block) => {
    const rawCodeBlocks = getCodeBlocks(block);
    rawCodeBlocks.map((rBlock) => {
      blocks.push(parseCodeBlockString(rBlock));
    });
  });
  let filteredBlock = blocks.filter((blk) => blk["filter"] == options.filter);
  let blkStrings = filteredBlock.map((blk) => blk["code"]);
  return blkStrings.join("\n");
};

const readMDFile = async (fileName) => {
  //by default files are read from the src folder.
  const data = await fs.readFile(fileName, { encoding: "utf8" });
  return data;
};

const saveToFile = async (fileName, fileContent, folder) => {
  // by default files will be saved in the dist folder
  await fs.writeFile(`${fileName}`, fileContent);
};

const main = async (options) => {
  // options :  { input, filter, output, outputFolder }
  const files = []
  const fileNames = options.input.split(",")
  for(let i=0; i<fileNames.length;i++){
    const fileContent = await readMDFile(fileNames[i]);
    console.log(fileContent.length)
    files.push(fileContent)
  }
  const codeFile = mdToCode(files, { filter: options.filter });
  await saveToFile(options.output, codeFile, options.outputFolder);
};

module.exports = { mdToCode, readMDFile, main };
