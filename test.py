from flask import Flask, render_template, redirect, request
from cs50 import SQL
import random
import csv



db = SQL("sqlite:///final.db")


with open('requirements.txt/country.csv', 'r') as file:
    reader = csv.DictReader(file)
    
    for row in reader:
        db.execute("INSERT INTO capitals (country, city, continent) VALUES (?, ?, ?)", row["country"], row["capital"], row["continent"])


            
            
        