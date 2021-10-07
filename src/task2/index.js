import csv from 'csvtojson';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';

const inputPath = './src/task2/csv/input.csv';
const outputPath = './src/task2/output.txt';

const readStream = createReadStream(inputPath);
const writeStream = createWriteStream(outputPath);

const convertedStream = csv({
  ignoreColumns: /(amount)/,
})
  .preFileLine((fileLineString, lineIdx) => {
    return lineIdx === 0 ? fileLineString.toLowerCase() : fileLineString;
  })
  .fromStream(readStream);

pipeline(convertedStream, writeStream, (error) => {
  if (error) {
    console.log(`Error: ${error.message}`);
  } else {
    console.log('Finished successfully');
  }
});
