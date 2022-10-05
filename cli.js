const ec = require('./extract-md-code')




// console.log(process.argv)

const main = async ()=>{
 //console.log(process.argv)
 const progs = {
  'extract-md-code':async ()=>{
     const inputPath = process.argv[3]
     if(!inputPath){throw new Error("Provide input file path")}
     const outputPath = process.argv[4]
     if(!outputPath){throw new Error("Provide output path file")}
     const filter  = process.argv[5] || 'none'
     await ec.main({
       input: inputPath,
       output: outputPath,
       filter: filter,
      });
  }
 }


 const cmdName = process.argv[2]
 await  progs[cmdName]()

}


main()
.then(data=>{
if(data){console.log(data)}
}).catch(error=>{
console.error(error)
})


