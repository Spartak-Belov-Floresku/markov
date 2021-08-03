/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
        this.makeChains();
  }

  /*
   * build object strings 
   * for text of "the cat in the hat", chains will be
   * {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} 
   */

  makeChains() {

    let objStrings = this.words.reduce((obj, next) => {

      if(!obj[next]){
        obj[next] = []
      }

      return obj

    }, {});


    this.words.forEach((el, inx) => {
          
      let temp_arr = objStrings[el]
        temp_arr.push(this.words[inx+1] || null)
          objStrings[el] = temp_arr

    });

    this.objStrings = objStrings
  }

  /** return random key-word from array */

  returnWord(arr_keys){
    return arr_keys[Math.floor(Math.random() * arr_keys.length)]
  }

  /** return random text from chains */

  makeText(numWords = 100) {

    let keys = Object.keys(this.objStrings)
      let key = this.returnWord(keys)
        let wordsArray = []

    while(wordsArray.length < numWords && key != null){

      wordsArray.push(key)
        let arr_keys = this.objStrings[key]
          key = this.returnWord(arr_keys)

    }

    return wordsArray.join(" ")

  }

}


module.exports = {
  MarkovMachine,
}