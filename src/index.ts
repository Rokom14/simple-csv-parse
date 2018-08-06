
// ==========================
// Created by: Rok Komatar
// ==========================

// Require file stream api to read csv files
let fs = require('fs');

class CSVParser {
    parsedData: any;
	// Initialize dilimeter and headers option in constructor

	constructor(public csvFile: string, public options : {delimiter: "-", headers: false}) {
		this.csvFile = csvFile;
		this.options = options;
		this.parsedData = [];
    }
 
	// Read and parse the csv file and return final data.
	parseCSV() {
        // Return a new promise to make sure all the file is loaded
        
		return new Promise((resolve: any, reject: any) => {
		    fs.readFile(this.csvFile, (err: any, fileData: any) => {
		    	// Throws error if not exists
		        if (err) {
		        	console.error(err);
		            throw err;
		        }
		        // Separate all lines
				let data = fileData.toString().split('\n');
				
				if(data.length === 1)
					throw this.parsedData;

		        // Check if headers available generate array of objects else generate array of arrays
		        if (this.options.headers) {
					
					// Get headers from first row
					
					
					let headers:string[] = data[0].trim().split(this.options.delimiter);
					
					
		        	data.shift();
		        	// Create json 
		        	this.parsedData = this.createJson(headers, this.createArray(data));
		        } else {
		        	// Create an array of arrays
		        	this.parsedData = this.createArray(data);
		        }
		        resolve(this.parsedData);
		    });		
		})
	}

	// Create an a rray of arrays
	createArray(data: any) {
		// Split all lines by the delimiter and create an array with row values
		for (let i = 0; i < data.length; i++) {
			data[i] = data[i].trim().split(this.options.delimiter);
		}
		return data;
	}

    // Generate array of objects, using the first row as keys
    
	createJson(headers: any, data: any) {
		let finalJson = [];
		
		for (let i:number = 0; i < data.length; i++) {
			let obj:any = {};
			
			for (let j:number= 0; j < data[i].length;j++) {
				obj[headers[j]] = data[i][j];
			}
			finalJson.push(obj);
		}
		
		return finalJson;
    }
    
}

module.exports = CSVParser;
