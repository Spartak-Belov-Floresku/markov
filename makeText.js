const fs = require("fs")
const markov = require("./markov");
const axios = require("axios")
const argv = process.argv

const generateTextFromString = (texts) => {

    let text  = false

    if(Array.isArray(texts)){

        texts.forEach(val => { 
            
            if(!val.includes("/") && !val.includes("http:") && !val.includes(".txt") && !val.includes("file")){ 
                text = val
            }
        });

    }else if(typeof texts == "string"){
        
        if(!texts.includes("/") && !texts.includes("http:") && !texts.includes(".txt")){ 
            text = texts
        }

    }

    if(text){

        let markovObj = new markov.MarkovMachine(text);
        let returnString = markovObj.makeText(10)

        console.log(returnString);
        return returnString

    }

    return false

}

const readFile = async (paths) => {

    let path = false

    if(Array.isArray(paths)){

        paths.forEach(val => { 
            
            if(!val.includes("/") && !val.includes("http:") && val.includes(".txt")){ 
                path = val
            }
        });

    }else if(typeof paths == "string"){

        if(paths.includes(".txt") && !paths.includes("http:")){ 
            path = paths
        }

    }

    let printText = false

    if(path){

        fs.readFile(path, `utf8`, (err, data) => {

            if(err){

                console.log(`Error : ${err}`)
                process.exit(1)

            }

            console.log(data)
            return true

        });

    }else{

        return printText
        
    }
    
}

const readWeb = async (urls) => {

    let url = false


    if(Array.isArray(urls)){

        urls.forEach(val => { 
            
            if(val.includes("http:")){ 
                url = val
            }
        });

    }else if(typeof urls == "string"){

        if(urls.includes("http:") ){ 
            url = urls
        }

    }

    if(url){

        try{

            let result = await axios.get(url)
            console.log(result)
            return true

        }catch(err){
            
            console.log(err)
            return false

        } 

    }else{

        return false
        
    }
}


module.exports = {
    generateText: generateTextFromString(argv),
    readFile: readFile(argv),
    readWeb: readWeb(argv),
    forTest: {generateTextFromString, readFile, readWeb}
  }