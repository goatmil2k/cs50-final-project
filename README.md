# Test Your Knowledge.com
#### Video Demo:  <URL https://www.youtube.com/watch?v=RU7EgdklByc>
#### Description:
Test your knowledge.com is a simple web application for answering trivia questions. The website is implemented with python, flask framework and sqlite3 for backend and HTML/CSS and JavaScript for frontend. Since my vision was to make it simple for the first version, there is no login required. The user data will not be stored in this version, though you can get a nice and comprehensive summary of your scores once you are done playing.

Right now there are two types of trivias you can anwswer, presidents and capital cities. All the names of the leaders of each country and capital cities of each country is stored inside sql database, namely final.db for two reasons. It is easily accessible for backend requests and can be quickly updated if there is a change in any of the names.

If you want to try out the website, you can simply click the link provided. There is no prerequisites required. [https://goatmil2k.pythonanywhere.com/]().

**app.py:**
 All the backend requests are made in this file. Those request include ``render_template()``and ``jsonify()``. ``jsonify`` is used for making ajax request from script.js file which is crucial for this website.
> ```python
@app.route('/ajax-request')
def ajax_request():
    combined_data = {
        'dict_p': data_president, 'dict_c': data_cities, 'list_p': other_answers_president, 'list_c': other_answers_cities
        }
    return jsonify(combined_data)
    
The above code snippet is the backbone of this website. What it is doing is getting data from final.db and using it to send to script.js which in turn display it on the template with multiple lines of scripts.

**static/script.js**: In this file, which took most of the time to implement afer css, a lot of challenging steps are overcome. The combination of the functions ``CheckIfClicked()`` ``Clicked()`` and ``Unclicked()`` make sure the scores and background colors of elements are only updated once for every question. A new question is loaded everytime the user starts or next question button is clicked. But the page not reloaded for that. The data sent from the code snippet provided above is used in the funcion ``function ajaxRequest()``.
Take a look at how the data is obtained and used
> ```javascript
function ajaxRequest() {
    $.ajax({
    url: '/ajax-request',
    success: function(response) {
        var dictionaryPr = response.dict_p;
        var listPr = response.list_p;
        var dictionaryCy = response.dict_c;
        var listCy = response.list_c;
        // a value is assigned to the buttons that are meant to call this function.
        // 0 for the presidents and 1 for capital cities.
        // The return values of request changes accordingly
        for (let i = 0; i < ajaxButtons.length; i++) {
            if (ajaxButtons[i].value == 1) {
                    //the dictonary is disparsed and the data is used.
                }
            }
    
Fro every question, a random number is picked to dicide where to put the answer with the code ``if (answers[i].id == randomId)``. The answers button are assigned an id and randomId is generated in **app.py**.

  
**log.sql** :
    A log of sqlite3 commands to create final.db table are documented here for easy access and reusability.

**requirements.txt** :
    In this file, mainly the csv files that are used to populate the data for final.db table are stored. The files were obtained through internet search and the data is inserted into final.db with python script.

**static** :
    This file include all the images, CSS properties and script.js. Script.js was the hardest of all to implement. There is no bootstrap used in this project because I wanted to implement the css my self to get a better understanding of box model.

**final.db**: Since this is a web app for answering trivia questions, I needed a database to store and use all the names of the countries and their capital cities and presidents. So I created final.db even though I am not storing the data from users. The database consists of two tables. "presidents" and "capitals". Four countries are randomly selected from these tables everytime a request is made in app.py.

**Thank you David, Carter, Doug, Brian and all the CS50 staffs for this amazing course. My name is Krishna and this was CS50!**
