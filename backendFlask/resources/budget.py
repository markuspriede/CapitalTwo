from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from datetime import timedelta

from db import db
from models import BudgetModel
from schemas import BudgetSchema, UpdateBudgetSchema

# Blueprint for handling operations related to budgets.
blp = Blueprint("Budgets", "budgets", description="Operation on budgets")

@blp.route("/budget/<string:budget_id>")
class Budget(MethodView):

    # GET method to retrieve a specific budget using its ID.
    # Returns the budget details if found, else returns a 404 error.
    @blp.response(200, BudgetSchema)
    def get(self, budget_id):
        return BudgetModel.query.get_or_404(budget_id)

    # DELETE method to remove a specific budget using its ID.
    # Deletes the budget from the database and returns a confirmation message.
    def delete(self, budget_id):
        budget = BudgetModel.query.get_or_404(budget_id)
        db.session.delete(budget)
        db.session.commit()
        return {"message": "Budget deleted."}

    # PUT method to update a budget using its ID.
    # If the budget exists, it updates its details; otherwise, it creates a new budget.
    # The method uses the UpdateBudgetSchema to validate and deserialize the input data.
    @blp.arguments(UpdateBudgetSchema)
    @blp.response(200, BudgetSchema)
    def put(self, budget_data, budget_id):
        budget = BudgetModel.query.get(budget_id)

        if budget:  # Update existing budget
            budget.start_date = budget_data["start_date"]
            budget.end_date = budget_data["start_date"] + timedelta(days=30)
            budget.category_name = budget_data["category_name"]
            budget.budget_amount = budget_data["budget_amount"]
            budget.amount_avaiable = budget_data["budget_amount"] - budget.amount_avaiable
        else:  # Create new budget
            budget = BudgetModel(id=budget_id, 
                                 end_date=budget_data["start_date"] + timedelta(days=30),
                                 amount_avaiable=budget_data["budget_amount"] - budget.amount_avaiable,
                                 **budget_data)
        db.session.add(budget)
        db.session.commit()

        return budget

@blp.route("/budget")
class BudgetList(MethodView):

    # GET method to retrieve all budgets in the system.
    # Returns a list of all budgets.
    @blp.response(200, BudgetSchema(many=True))
    def get(self):
        return BudgetModel.query.all()

    # POST method to create a new budget.
    # Accepts budget details, validates them using UpdateBudgetSchema, and inserts the new budget into the database.
    @blp.arguments(UpdateBudgetSchema)
    @blp.response(201, BudgetSchema)
    def post(self, budget_data):
        budget = BudgetModel(end_date=budget_data["start_date"] + timedelta(days=30), 
                             amount_avaiable=budget_data["budget_amount"]-budget_data["amount_spent"],
                             **budget_data)

        try:
            db.session.add(budget)
            db.session.commit()
        except SQLAlchemyError:
            # Handle any database-related errors that may occur during the insertion process.
            abort(500, message="An error occurred while inserting the budget.")

        return budget
