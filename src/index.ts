// ==========================
// Created by: Rok Komatar
// ==========================

// Require file stream api to read csv files

import fs = require('fs');

export class CSVParser {
  protected parsedData: any;
  // Initialize dilimeter and headers option in constructor

  constructor(public csvFile: string, public options: { delimiter: '-'; headers: false }) {
    this.csvFile = csvFile;
    this.options = options;
    this.parsedData = [];
  }

  // Read and parse the csv file and return final data.
  protected parseCSV() {
    // Return a new promise to make sure all the file is loaded
    return new Promise((resolve: any, reject: any) => {
      fs.readFile(this.csvFile, (err: any, fileData: any) => {
        // Throws error if not exists
        if (err) {
          throw err;
        }
        // Separate all lines
        const data = fileData.toString().split('\n');

        // Check if headers available generate array of objects else generate array of arrays
        if (this.options.headers) {
          // Get headers from first row
          const headers: string[] = data[0].trim().split(this.options.delimiter);
          // Remove headers from the data
          data.shift();
          // Create json
          this.parsedData = this.createJson(headers, this.createArray(data));
        } else {
          // Create an array of arrays
          this.parsedData = this.createArray(data);
        }
        resolve(this.parsedData);
      });
    });
  }

  // Create an a rray of arrays
  protected createArray(data: any) {
    // Split all lines by the delimiter and create an array with row values

    const finalData: string[] = [];
    for (const row of data) {
      finalData.push(row.trim().split(this.options.delimiter));
    }

    return finalData;
  }

  // Generate array of objects, using the first row as keys

  protected createJson(headers: string[], data: any) {
    const finalJson: any = [];

    for (const [i, value] of data.entries()) {
      const obj: any = {};

      for (const [j] of value.entries()) {
        obj[headers[j]] = data[i][j];
      }
      finalJson.push(obj);
    }
    return finalJson;
  }
}

module.exports = CSVParser;
