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


@app.route('/budgets', methods=['GET', 'POST', 'PUT', 'DELETE'])
@cross_origin(supports_credentials=True)
def handle_budgets():
    cursor = mydb.cursor(dictionary=True)

    # GET - Fetch budgets of the hardcoded user
    if request.method == 'GET':
        query = "SELECT * FROM Budget WHERE user_id = 1"
        cursor.execute(query)
        budgets = cursor.fetchall()
        return jsonify(budgets)

    # PUT - Add a new budget for the hardcoded user
    elif request.method == 'PUT':
        data = request.json
        query = "INSERT INTO Budget (user_id, start_date, end_date, total_amount) VALUES (1, %s, %s, %s)"
        cursor.execute(query, (data['start_date'], data['end_date'], data['total_amount']))
        mydb.commit()
        return jsonify({"message": "Budget added successfully!"})

    # DELETE - Remove a budget given its ID
    elif request.method == 'DELETE':
        data = request.json
        query = "DELETE FROM Budget WHERE budget_id = %s AND user_id = 1"
        cursor.execute(query, (data['budget_id'],))
        mydb.commit()
        return jsonify({"message": "Budget deleted successfully!"})

    cursor.close()
    return jsonify({"message": "Invalid request method."})

@app.route('/transactions', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def handle_transactions():
    cursor = mydb.cursor(dictionary=True)

    # GET - Fetch transactions of the hardcoded user
    if request.method == 'GET':
        query = "SELECT * FROM Transaction WHERE user_id = 1"
        cursor.execute(query)
        transactions = cursor.fetchall()
        return jsonify(transactions)

    # POST - Update the category_name for a specific transaction given its ID
    elif request.method == 'POST':
        data = request.json
        query = "UPDATE Transaction SET category_name = %s WHERE transaction_id = %s AND user_id = 1"
        cursor.execute(query, (data['category_name'], data['transaction_id']))
        mydb.commit()
        return jsonify({"message": "Transaction updated successfully!"})

    cursor.close()
    return jsonify({"message": "Invalid request method."})
