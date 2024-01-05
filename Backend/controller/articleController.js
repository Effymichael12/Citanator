// reuqurie fs as the app is dealing with a local JSON database
const fs = require('fs');
// path function to help isolate the path 
const path = require('path');
// the file should be in a folder kown as data - Protect the route with env
const dataFilePath = path.join(__dirname, process.env.DATAPATH);

module.exports.getSearch = async (req,res) =>{
  // get the "search" data from the frontend through req.body 
const {search} = req.body;
// function allows for the json data to be read properly
const rawData = fs.readFileSync(dataFilePath);
// parse the data so that it is readable in the frontend 
const data = JSON.parse(rawData);
// if there is no data associated with the search element return a error statement
if(!search){
  return res.status(400).json({ error: 'Search parameter is required.' });

}
// if the search element is found then filter through it for particular items
const result = await data.filter(item =>{
  // search for the title and subtitle in the database to see if it matches
  return (
    // make them all to lowercase so that they can match better
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(search.toLowerCase())
  )
})
// if there are no results similar to the search then return the error
if(result.length === 0 || result === null){
 return res.status(400).json({error:'Could not find any articles'})
}
// if fouund return the message that articles are found 
  return res.status(200).json({result, message:'Found Articles'})



}