from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from db import db
from models import TransactionModel, BudgetModel
from schemas import TransactionSchema

blp = Blueprint("Transactions", "transactions", description="Operations on transactions")

@blp.route("/transaction/<string:transaction_id>")
class Transaction(MethodView):
    @blp.response(200, TransactionSchema)
    def get(self, transaction_id):
        transaction = TransactionModel.query.get_or_404(transaction_id)
        return transaction

    def delete(self, transaction_id):
        transaction = TransactionModel.query.get_or_404(transaction_id)
        db.session.delete(transaction)
        db.session.commit()
        return {"message": "Transaction deleted"}, 200

@blp.route("/transaction")
class TransactionList(MethodView):
    @blp.response(200, TransactionSchema(many=True))
    def get(self):
        # will return all of the transactions
        return TransactionModel.query.all()

    @blp.arguments(TransactionSchema)
    @blp.response(201, TransactionSchema)
    def post(self, transaction_data):
        budget = BudgetModel.query.get_or_404(transaction_data["budget_id"])
        budget.amount_spent += transaction_data["amount"] 
        budget.amount_avaiable -= transaction_data["amount"]

        subscription_id = transaction_data.get("subscription_id", None)
        if subscription_id == "" or subscription_id == 0 or (transaction_data["isSubscription"] == False):
            subscription_id = None

        transaction = TransactionModel(
            alias = transaction_data["alias"],
            isSubscription = transaction_data["isSubscription"],
            date = transaction_data["date"],
            amount = transaction_data["amount"],
            description = transaction_data["description"],
            budget_id = transaction_data["budget_id"],
            subscription_id=subscription_id)
        
        try:
            db.session.add(transaction)
            db.session.add(budget)
            db.session.commit()
        except SQLAlchemyError as e:
            abort(500, message="An error occurred creating the transaction.")

        return transaction