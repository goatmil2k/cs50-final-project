from flask import Flask, render_template, redirect, request, jsonify
from cs50 import SQL
import random

db = SQL("sqlite:///final.db")

app = Flask(__name__, static_folder='static')
app.debug = True  # Enable debug mode

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
        

@app.route('/presidents', methods=['GET','POST'])
def presidents():
    if request.method == 'GET':
        return render_template('presidents.html')


@app.route('/cities', methods=["GET", "POST"])
def cities():
    if request.method == 'GET':
        return render_template("city.html")
    
@app.route('/quit', methods=['GET'])
def quit():
    return render_template("quit.html")

       
    
@app.route('/ajax-request')
def ajax_request():
    
    #get a random id for questions for presidents template.
    id_president = random.randint(1, 163)
    
    #get a random id for questions for cities template
    id_cities = random.randint(1, 190)
    
    #get a random number between 0 and 3 to determine where to put the answer
    #can be used for both templates
    answer_id = random.randint(0, 3)
    
    #creater a list to store all the id numbers of presidents table
    id_population_president = []
    id_s = db.execute("SELECT id FROM presidents")
    for dict in id_s:
        id_population_president.append(dict["id"])
        
    #randomly select more ids to fill out other answers
    other_answers_president = []
    #randomly select 3 more ids to fill other answers
    k = 4
    random_selection = random.choices(id_population_president, k=k)
    
    for num in random_selection:
        others = db.execute("SELECT president FROM presidents WHERE id = ?", num)
        other_answers_president.append(others[0]["president"])
        
        
    #doing the same for cities template
    id_population_cities = []
    temp = db.execute("SELECT id FROM capitals")
    for dict in temp:
        id_population_cities.append(dict["id"])
    other_answers_cities = []
    l = 4
    random_selection1 = random.choices(id_population_cities, k=l)
    for num in random_selection:
        dict = db.execute("SELECT city FROM capitals WHERE id = ?", num)
        other_answers_cities.append(dict[0]["city"])
        
    answer_data_president = db.execute("SELECT country, president FROM presidents WHERE id = ?", id_president)
    data_president = {
        'country': answer_data_president[0]["country"],
        'president': answer_data_president[0]["president"],
        'answer_id': answer_id
    }
    
    answer_data_cities = db.execute("SELECT country, city FROM capitals WHERE id = ?", id_cities)
    data_cities = {
        'country': answer_data_cities[0]["country"],
        'city': answer_data_cities[0]['city'],
        'answer_id': answer_id
    }
    
    #combining all data to send
    combined_data = {
        'dict_p': data_president, 'dict_c': data_cities, 'list_p': other_answers_president, 'list_c': other_answers_cities
        }
    return jsonify(combined_data)
        

    

        
    
    
        
 
    



