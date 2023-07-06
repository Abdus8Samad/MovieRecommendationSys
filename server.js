const express = require('express'),
app = express(),
PORT = process.env.PORT || 8080,
path = require('path'),
cors = require('cors'),
morgan = require('morgan'),
fs = require('fs');
require('dotenv/config');

// ML Output Files
let cosine_sim2 = "", indices = "", df2 = "";

app.use(cors());
app.use(morgan('dev'));

app.use(express.static(path.join(process.cwd(), 'build')));

const combineJsonFiles = (directoryPath, outputFile) => {
	let combinedData = "";
	let index = 1;
	console.log(directoryPath);
	console.log(outputFile);
	let file = path.join(directoryPath, `batch_${index}.json`);
	while(fs.existsSync(file)){
		const data = require(file);
		combinedData += data;
		index++;
		file = path.join(directoryPath, `batch_${index}.json`);
	}
	fs.writeFileSync(outputFile, combinedData);
}


const getLocalData = (fileName) => new Promise((resolve, reject) =>{
	const file = path.join(process.cwd(), 'build', fileName);
	if(!fs.existsSync(file + '.json')) combineJsonFiles(file, file + '.json');
	while(!fs.existsSync(file + '.json')){
		
	}
	fs.readFile(file + '.json', 'utf8', (err, data) => {
		if (err) {
			reject(new Error(`Error reading ${fileName}.json`));
		}
		else {
			resolve(JSON.parse(data));
		}
	});
});

app.get('/', (req, res) =>{
   res.sendFile('index.html'); 
});

app.get('/getMovies', (req, res) => {
	const file = path.join(process.cwd(), 'build', 'movies.json');
	fs.readFile(file, 'utf8', (err, data) => {
		if(err){
			console.error(err);
			return res.status(500).json({ error: 'Error reading movies data' });
	  	}
		try {
			const movies = JSON.parse(data);
			return res.json(movies);
	  	} catch (err) {
			console.error(err);
			return res.status(500).json({ error: 'Error parsing movies data' });
	  	}
	});
});

app.get('/getRecommendation/:movie', async (req, res) =>{
	try {
		if(cosine_sim2 == ""){
			cosine_sim2 = await getLocalData('cosine_sim2');
		}			

		if(indices == ""){
			indices = await getLocalData('indices');
		}			

		if(df2 == ""){
			df2 = await getLocalData('df2');
		}
		// const a = {
		// 	name: 'cosine_sim2',
		// 	content: JSON.stringify(cosine_sim2)
		// }
		// const b = {
		// 	name: 'indices',
		// 	content: JSON.stringify(indices)
		// }
		// const c = {
		// 	name: 'df2',
		// 	content: JSON.stringify(df2)
		// }
		// mlFiles.create(a)
		// .then(() => console.log("created a"))
		// .catch((err) => console.log(err, " in creating a"));
		// mlFiles.create(b)
		// .then(() => console.log("created b"))
		// .catch((err) => console.log(err, " in creating b"));
		// mlFiles.create(c)
		// .then(() => console.log("created c"))
		// .catch((err) => console.log(err, " in creating c"));
		// const title = req.params.movie;
		// if(!(title in indices)){
		// 	return res.json({data:"", status: 500, msg: `Movie ${title} Not Found !`});
		// }

		// // Get the index of the movie that matches the title
		const idx = indices[req.params.movie];

		// Get the pairwise similarity scores of all movies with that movie
		const simScores = cosine_sim2[idx];

		// Create an array of objects with movie index and similarity score
		const movieScores = simScores.map((score, index) => [score, index]);

		// Sort the movies based on the similarity scores in descending order
		const sortedScores = movieScores.sort((a, b) => b[0] - a[0]);

		// Get the scores of the 10 most similar movies (excluding the movie itself)
		const topScores = sortedScores.slice(1, 11);

		// Get the movie indices
		const movieIndices = topScores.map((elem) => elem[1]);

		// Get the titles of the top 10 most similar movies
		const movieTitles = movieIndices.map((index) => df2['title'][index]);

		// Return the top 10 most similar movie titles
		return res.json({data: movieTitles, msg: "Successful", status: 200});
	} catch (err) {
		console.error(err);
		res.json({data:"", status: 500, msg: 'Error parsing JSON data'});
	}
});

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));

/* ---------- File Partitioning Code ---------- */

// const fs = require('fs');
// const path = require('path');

// // Split JSON file into smaller files
// function splitJsonFile(inputFilePath, outputDirectoryPath, batchSize) {
//   // Read the input JSON file
//   const data = JSON.stringify(require(inputFilePath));
//   batchSize = Math.floor(data.length / batchSize);
//   // Split the data into batches
//   const batches = [];
//   let stPtr = 0;
//   while (stPtr < data.length) {
//     batches.push(data.slice(stPtr, stPtr + batchSize));
// 	stPtr += batchSize;
//   }

//   // Create the output directory if it doesn't exist
//   if (!fs.existsSync(outputDirectoryPath)) {
//     fs.mkdirSync(outputDirectoryPath);
//   }

//   // Write each batch to a separate file
//   batches.forEach((batch, index) => {
//     const outputFileName = `batch_${index + 1}.json`;
//     const outputFilePath = path.join(outputDirectoryPath, outputFileName);
//     fs.writeFileSync(outputFilePath, JSON.stringify(batch));
//   });
// }

// // Combine JSON files into a single object
// function combineJsonFiles(directoryPath, filename) {
//   let combinedData = "";
//   let index = 1;
//   let file = path.join(process.cwd(), directoryPath, `batch_${index}.json`);
//   while(fs.existsSync(file)){
//     const data = require(file);
//     combinedData += data;
// 	index++;
// 	file = path.join(process.cwd(), directoryPath, `batch_${index}.json`);
//   }
//   fs.writeFileSync(filename, combinedData);
// }

// // Usage example
// const inputFilePath = './build/df.json';
// const outputDirectoryPath = 'cosine_sim2';
// const batchSize = 10;

// // Split JSON file into smaller files
// // splitJsonFile(inputFilePath, outputDirectoryPath, batchSize);

// // Combine JSON files into a single object
// const combinedCosine = combineJsonFiles(outputDirectoryPath);
// // console.log(combinedCosine, 'cosine_sim2.json');
