const csv = require("csvtojson");
const fs = require("fs");

const csvToJSON = async () => {
  const inputFile = "netflix_titles.csv";
    const outputFile = "netflix_titles.json";
  
    try {
        const jsonArray = await csv().fromFile(inputFile);
        fs.writeFileSync(outputFile, JSON.stringify(jsonArray, null, 2));
        console.log(`Converted ${inputFile} to ${outputFile}`);
    } catch (error) {
        console.error(error.message);
    }
}

csvToJSON();

