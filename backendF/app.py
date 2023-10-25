import json
from flask import Flask, render_template, request, jsonify
# from flask_mysqldb import MySQL
from flaskext.mysql import MySQL
from flask_cors import CORS, cross_origin
import mysql.connector



app = Flask(__name__)
CORS(app, support_credentials=True)

# Connect to database
mydb = mysql.connector.connect(
  host="",  # Fill in the fields - Reference MySQL Workbench
  user="",  # Fill in the fields - Reference MySQL Workbench
  password="",  # Fill in the fields - Reference MySQL Workbench
  database="capital_one" # Fill in the fields - Reference MySQL Workbench
)

mysql = MySQL(app)

# Utility functions for Budget operations
def get_budgets(user_id):
    cursor = mydb.cursor(dictionary=True)
    query = "SELECT * FROM Budget WHERE user_id = %s"
    cursor.execute(query, (user_id,))
    budgets = cursor.fetchall()
    cursor.close()
    return budgets


def add_budget(user_id, start_date, end_date, total_amount):
    cursor = mydb.cursor()
    query = "INSERT INTO Budget (user_id, start_date, end_date, total_amount) VALUES (%s, %s, %s, %s)"
    cursor.execute(query, (user_id, start_date, end_date, total_amount))
    mydb.commit()
    cursor.close()


def delete_budget(user_id, budget_id):
    cursor = mydb.cursor()
    query = "DELETE FROM Budget WHERE budget_id = %s AND user_id = %s"
    cursor.execute(query, (budget_id, user_id))
    mydb.commit()
    cursor.close()


# Utility functions for Transaction operations
def get_transactions(user_id):
    cursor = mydb.cursor(dictionary=True)
    query = "SELECT * FROM Transaction WHERE user_id = %s"
    cursor.execute(query, (user_id,))
    transactions = cursor.fetchall()
    cursor.close()
    return transactions


def update_transaction_category(user_id, transaction_id, category_name):
    cursor = mydb.cursor()
    query = "UPDATE Transaction SET category_name = %s WHERE transaction_id = %s AND user_id = %s"
    cursor.execute(query, (category_name, transaction_id, user_id))
    mydb.commit()
    cursor.close()


# Routes using utility functions
@app.route('/budgets', methods=['GET', 'POST', 'PUT', 'DELETE'])
@cross_origin(supports_credentials=True)
def handle_budgets():
    user_id = request.json.get('user_id')

    if request.method == 'GET':
        return jsonify(get_budgets(user_id))
    elif request.method == 'PUT':
        data = request.json
        add_budget(user_id, data['start_date'], data['end_date'], data['total_amount'])
        return jsonify({"message": "Budget added successfully!"})
    elif request.method == 'DELETE':
        data = request.json
        delete_budget(user_id, data['budget_id'])
        return jsonify({"message": "Budget deleted successfully!"})
    return jsonify({"message": "Invalid request method."})


@app.route('/transactions', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def handle_transactions():
    user_id = request.json.get('user_id')

    if request.method == 'GET':
        return jsonify(get_transactions(user_id))
    elif request.method == 'POST':
        data = request.json
        update_transaction_category(user_id, data['transaction_id'], data['category_name'])
        return jsonify({"message": "Transaction updated successfully!"})
    return jsonify({"message": "Invalid request method."})