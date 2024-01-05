
// axios and cheerio are requried to do the webscrapping
const axios = require('axios');
const cheerio = require('cheerio');


module.exports.getCitation = async(req,res) =>{
  // get the following elements from the fronten
  const { Url, Format, type} = req.body;
  try{
    // use the Url element to conduct web scrapping
    const response = await axios.get(Url);
    const html = response.data;
    const $ = cheerio.load(html);

    const scriptTagContent = $('script[type="application/ld+json"]').html();
    let datePublished;
    if (scriptTagContent) {
      // convert the date obtained to Month day and year from like this "Dec, 23, 2023"
      try {
        const jsonData = JSON.parse(scriptTagContent);
        function formatJsonData(jsonData){
          const data = new Date(jsonData.datePublished)
          const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
          ];
        
          const formattedDate = `${months[data.getMonth()]} ${String(data.getDate()).padStart(2, '0')} ${data.getFullYear()}`;
          return formattedDate;
        }
        datePublished = formatJsonData(jsonData);
      } catch (error) {
        console.error('Error parsing JSON within script tag:', error);
      }
    }
    // we want to get the title of the article 
    const title = $('h1').first().text();
    // we can get the name of the website in this manner
    const websiteName = $('meta[property="og:site_name"]').attr('content');
    let author;

    // Check different variations of author meta tags
    author = $('meta[name="author"]').attr('content') || 
    $('meta[name="article:author"]').attr('content') || 
    $('meta[name="primaryAuthor:"]').attr('content') || 
    $('meta[name="authorName:"]').attr('content');
    
    // get the current date in this format: "Dec 23 2023"
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const today = new Date();
    const month = months[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();
  
    // Add leading zero to the day if it's a single digit
    const formattedDay = (day < 10) ? '0' + day : day;
  
    // Format: "Dec 29 2023"
    const todayDate = `${month} ${formattedDay} ${year}`;
    

    // Creating response and put it into one array
    const citationInfo = {
      title,
      publishedDate: datePublished,
      websiteName,
      author,
      todayDate
    };
  // create an array to store errors
      const errors = [];
  // create an error if you can't find certain elements
    if (!citationInfo.publishedDate || citationInfo.publishedDate === "" || citationInfo.publishedDate === undefined ) {
      errors.push('Could not find published date');
    }
// error if you can't find author
    if (!citationInfo.author) {
      errors.push('Could not find author');
    }
    // ensure that you send the errors to the frontend for processing
    const citation = [
      citationInfo, {errors:errors}, {format: Format}, {Type: type}, {Link: Url}
    ]
    // Return response with error messages
    if (errors.length > 0) {
      return res.status(200).json({citation});
    }
   // we want to still allow the citation if there are no major errors
    return res.status(200).json({citation});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports.updateCitation = async (req, res) => {
  // obtain all of these from the frontend 
  const { newTitle, newWebsite, newAuthor, newPublishd, newToday, newUrl, errors, format, Type } = req.body;

  try {
    // Assuming the existing citation array is present in req.body.citation
    const existingCitations = req.body.citation || [];

    // Create a new citation object
    const newCitation = {
      title: newTitle || "",
      publishedDate: newPublishd || "",
      websiteName: newWebsite || "",
      author: newAuthor || "",
      todayDate: newToday || "",
    };

    // Create a new errors object, wrapped in an array if errors are present
    const newErrors = errors ? [errors] : [];

    // Create other objects
    const newFormat = { format: format || "" };
    const newType = { Type: Type || "" };
    const newLink = { Link: newUrl || "" };

    // Combine the existing citations with the new citation and other objects
    const updatedCitation = [
      { ...newCitation, errors: newErrors },
      newFormat,
      newType,
      newLink,
      ...existingCitations,
    ];

    // Update the response with the updated citation array
    return res.status(200).json({ citation: updatedCitation });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};






