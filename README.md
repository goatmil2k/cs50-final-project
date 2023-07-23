# Test Your Knowledge
#### Video Demo:  <URL https://www.youtube.com/watch?v=RU7EgdklByc>
#### Description:
My final project is a simple web application built using python, flask and sqlite3 for backend and HTML/CSS and Javascript for frontend.
##### app.py:
All the backend requests are made in this file. All the routes to index.html and others are defined here. The final.db file is also opened in this file to use the data stored inside it. The data from final.db are sent to the script.js via ajaxrequest route. Aside from rendering templates and getting data from final.db and sending them through an ajax request, nothing much is going on in this file.
##### templates:
All the templates for my project are stored in this file.
##### log.sql:
A log of sqlite3 commands to create final.db table are documented here for easy access and reusability.
##### requirements.txt:
In this file, mainly the csv files that are used to populate the data for final.db table are stored. The files were obtained through internet search and the data is inserted into final.db with python script.
##### static:
This file include all the images, css properties and script.js. Script.js was the hardest of all to implement. The challenges include making sure the answers buttons are only clicked once for each question. This problem is solved by having multiple functions which check the values of button elements and changing them accordingly when they are clicked. Another challenge was to reload the question and answers without reloading the whole template. This problem is overcome with using AJAX. A function is implemented to make the ajax request which request data from app.py everytime a button is clicked. 