from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from db import db
from models import TransactionModel, BudgetModel
from schemas import TransactionSchema, UpdateTransactionSchema


blp = Blueprint("Transactions", "transactions", description="Operations on transactions")

@blp.route("/transaction/<string:transaction_id>")
class Transaction(MethodView):
    """
    Class-based view handling the transaction-related operations.
    Flask MethodView is used to create RESTful APIs by defining methods for HTTP verbs.
    """

    @blp.response(200, TransactionSchema)
    def get(self, transaction_id):
        """
        Retrieves a specific transaction by its unique ID.
        Uses SQLAlchemy ORM to query the database.
        Return a serialized transaction object conforming to TransactionSchema.
        """
        transaction = TransactionModel.query.get_or_404(transaction_id)
        return transaction

    def delete(self, transaction_id):
        """
        Deletes a transaction based on the provided transaction ID.
        SQLAlchemy session is used for database operations.
        Commits the changes to the database after deletion.
        """
        transaction = TransactionModel.query.get_or_404(transaction_id)
        db.session.delete(transaction)
        db.session.commit()
        return {"message": "Transaction deleted"}, 200
    
    @blp.arguments(UpdateTransactionSchema)
    @blp.response(200, TransactionSchema)
    def put(self, transaction_data, transaction_id):
        """
        Updates an existing transaction.
        Accepts transaction data validated against UpdateTransactionSchema.
        Handles conditional updates based on the provided fields.
        Performs database updates in a transaction-safe manner using SQLAlchemy.
        """
        transaction = TransactionModel.query.get(transaction_id)

        # Handle subscription-related updates.
        if "isSubscription" in transaction_data:
            allTransactions = TransactionModel.query.all()
            for trans in allTransactions:
                if trans.alias == transaction.alias:
                    trans.isSubscription = transaction_data["isSubscription"]
                    if "subscription_id" in transaction_data:
                        trans.subscription_id = transaction_data["subscription_id"] if transaction_data["subscription_id"] not in [-1, ""] else None
                db.session.add(trans)

        # Budget-related updates to adjust the budget allocations.
        if "budget_id" in transaction_data:
            budget = BudgetModel.query.get(transaction.budget_id)
            if budget:
                budget.amount_avaiable += transaction.amount
                budget.amount_spent -= transaction.amount

            transaction.budget_id = transaction_data["budget_id"] if transaction_data["budget_id"] not in [-1, ""] else None
            if transaction.budget_id:
                budget = BudgetModel.query.get_or_404(transaction_data["budget_id"])
                budget.amount_spent += transaction.amount
                budget.amount_avaiable -= transaction.amount
            db.session.add(budget)

        # Commit transaction updates to the database.
        try:
            db.session.add(transaction)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="Unable to update the transaction.")
        
        return transaction

@blp.route("/transaction")
class TransactionList(MethodView):
    """
    Class-based view for handling operations on the list of transactions.
    """

    @blp.response(200, TransactionSchema(many=True))
    def get(self):
        """
        Retrieves all transactions from the database.
        Uses SQLAlchemy to query and serialize the data.
        """
        return TransactionModel.query.all()

    @blp.arguments(TransactionSchema)
    @blp.response(201, TransactionSchema)
    def post(self, transaction_data):
        """
        Creates a new transaction.
        Accepts and validates data against TransactionSchema.
        Handles budget and subscription associations.
        Commits the new transaction to the database.
        """
        budget_id = transaction_data.get("budget_id", None)
        if budget_id in ["", -1]:
            budget_id = None
        else:
            budget = BudgetModel.query.get_or_404(transaction_data["budget_id"])
            budget.amount_spent += transaction_data["amount"]
            budget.amount_avaiable -= transaction_data["amount"]
            db.session.add(budget)

        subscription_id = transaction_data.get("subscription_id", None)
        if subscription_id in ["", -1] or not transaction_data["isSubscription"]:
            subscription_id = None

        transaction = TransactionModel(
            alias = transaction_data["alias"],
            isSubscription = transaction_data["isSubscription"],
            date = transaction_data["date"],
            amount = transaction_data["amount"],
            description = transaction_data["description"],
            budget_id = budget_id,
            subscription_id=subscription_id)
        
        try:
            db.session.add(transaction)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred creating the transaction.")

        return transaction
