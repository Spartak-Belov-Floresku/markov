const{ MarkovMachine } = require("./markov")
const functionsTest = require("./makeText")

describe("running test for MarkovMachine", () => {

    let markovObj;

    beforeEach( () => {
        
        markovObj = new MarkovMachine("I usually prefer chicken soup for lunch but today I and my friends have ordered chicken wings not soup")
    
    });
    
    test('create object of Strings', () => {
        
        expect(markovObj.objStrings).toHaveProperty("soup")
   
    });

    test('check output String', () => {
       
        expect(markovObj.makeText(10)).toEqual(expect.any(String));
    
    });


});

describe("running test for makeText", () => {

    test('create object of Strings in generateTextFromString', () => {

        expect(functionsTest.forTest.generateTextFromString("I usually prefer chicken soup")).toEqual(expect.any(String));
    
    });

    test('try to create object of Strings in generateTextFromString using numbers', () => {

        expect(functionsTest.forTest.generateTextFromString(10000)).toEqual(false);
    
    });
    
    test('generated text from URL using readWeb function expecting return true', async () => {

        const result = await functionsTest.forTest.readWeb("http://www.gutenberg.org/files/11/11-0.txt")
        expect(result).toEqual(true);
    
    });


});