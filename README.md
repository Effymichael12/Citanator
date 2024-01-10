# Citanator
A simple but efficient applicaiton that creates citations by scrapping information from the url provided. Included along with that is the article finder and the AI detector. The article finder searches a database of articles, mainly found in Medium.com and returns them to the user. Users can also check the level of AI content in their papers through the AI detector which is built with the help of an AI detection api. 

Here is the demo: https://www.citanatorweb.netlify.app

Images:
![image](https://github.com/Effymichael12/Citanator/assets/122330837/6f4d3962-df87-483f-be4b-b4dd2ae6312f)
![image](https://github.com/Effymichael12/Citanator/assets/122330837/adc03d44-ebc6-45c3-b166-eb20ed86ed37)
![image](https://github.com/Effymichael12/Citanator/assets/122330837/b7d7f17a-f21c-4d48-99ff-c2e9aa41069f)
![image](https://github.com/Effymichael12/Citanator/assets/122330837/b7f0de93-bf0c-4f25-8624-3f3251820d39)
![image](https://github.com/Effymichael12/Citanator/assets/122330837/a48e9ad3-fecf-4bb9-8fc5-d58db3f8e512)
![image](https://github.com/Effymichael12/Citanator/assets/122330837/38e1ebfc-738d-4849-869b-203215fd65a6)

# Custamizing project
If you desire to make some changes to the project and add your own part to it, please feel free to. 
Ensure that you have the following requirements:
1. Node.js
2. React.js
3. Visual Studio Code - IDE
4. Rapid api account - subscribe to API: https://rapidapi.com/pk-ai-pk-ai-default/api/ai-content-detector-gpt3-4-bard-and-llama-2-detector/

Setting up the project:
Download the citanator files first from Github. 
Go into the backend folder, open your terminal and install the dependencies:
<Break/>
<img width="109" alt="image" src="https://github.com/Effymichael12/Citanator/assets/122330837/d064da9c-b36b-48cd-9954-8fa9e880adc6">

Once you have done that go into your server.js file in your backend. 
here the rotues are protected with .env.
You will need to create your own api route here. 
create a new .env file in the root of the backend folder and replace the paths. 
<img width="352" alt="image" src="https://github.com/Effymichael12/Citanator/assets/122330837/b4687761-af96-4109-8996-a3729c161fe4">
You can use whichever port you desire as well. 

Working with the frontend:
create an .env file in the root of the react folder and you will need to replace a few rotues. You will need to proxy the backend to the frotend here and get your own API key for the AI detection API. 
if you are running on localhost your code proxy should look something like this: http://localhost:PORTNUMBER/

To create this proxy go into your package.json and at the very top(above the name), create a proxy like this:  "proxy":"https://localhost:PORT/"
If your frontend is already running ensure that you restart it so that it can connect to the backend. 


You will need to repalce teh following .env keys:

REACT_APP_CITEROTUE = THE ROUTE YOU CREATED IN THE BACKEND

REACT_APP_UPDATEROUTE = THE ROUTE YOU CREATED IN THE BACKEND

REACT_APP_ARTICLEFINDER = THE ROTUE YOU CREATED IN THE BACKEND

REACT_APP_AIURL = API URL FROM RAPID API LINK

REACT_APP_KEY = API KEY FROM RAPID API LINK

REACT_APP_HOST = API HOST KEY FROM RAPID API LINK

Once you have all of this setup run node server.js in the backend and npm start in the frontend. 
















