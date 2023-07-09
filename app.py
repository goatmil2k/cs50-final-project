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
       
        
@app.route('/ajax-president')
def jason_president():
    
    #get a random id for questions
    id = random.randint(1, 163)
    
    #get a random number between 0 and 3 to determine where to put the answer
    answer_id = random.randint(0, 3)
    
    #creater a list to store all the id numbers of presidents table
    id_population = []
    id_s = db.execute("SELECT id FROM presidents")
    for dict in id_s:
        id_population.append(dict["id"])
        
    #randomly select more ids to fill out other answers
    other_answers = []
    #randomly select 3 more ids to fill other answers
    k = 4
    random_selection = random.choices(id_population, k=k)
    
    for num in random_selection:
        others = db.execute("SELECT president FROM presidents WHERE id = ?", num)
        other_answers.append(others[0]["president"])
        
    
    answer_data = db.execute("SELECT country, president FROM presidents WHERE id = ?", id)
    country = answer_data[0]["country"]
    president = answer_data[0]["president"]
    other_president1 = other_answers[0]
    other_president2 = other_answers[0]
    other_president3 = other_answers[0]
    data = {
        'country': answer_data[0]["country"],
        'president': answer_data[0]["president"],
        'answer_id': answer_id
    }
    combined_data = {'dictionary': data, 'list': other_answers}
    return jsonify(combined_data)
    

        
    
    
        
 
    



