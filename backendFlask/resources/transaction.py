from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from db import db
from models import TransactionModel, BudgetModel
from schemas import TransactionSchema, UpdateTransactionSchema

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
    
    @blp.arguments(UpdateTransactionSchema)
    @blp.response(200, TransactionSchema)
    def put(self, transaction_data, transaction_id):
        transaction = TransactionModel.query.get(transaction_id)

        if "isSubscription" in transaction_data: # Update existing budget
            allTransactions = TransactionModel.query.all()
            for trans in allTransactions:
                if trans.alias == transaction.alias:
                    trans.isSubscription = transaction_data["isSubscription"]
                    if "subscription_id" in transaction_data:
                        if transaction_data["subscription_id"] == -1 or transaction_data["subscription_id"] == "":
                            newId = None
                            trans.subscription_id = newId
                        else:
                            trans.subscription_id = transaction_data["subscription_id"]
                db.session.add(trans)

        if "budget_id" in transaction_data:
            ## First update the current budget associated to current transaction 
            budget = BudgetModel.query.get(transaction.budget_id)
            if budget != None:
                ## Need to subtract from amount_spent, add to amount_avaiable since it's no longer asscoiated with current budget
                budget.amount_avaiable += transaction.amount
                budget.amount_spent -= transaction.amount

            if transaction_data["budget_id"] == -1 or transaction_data["budget_id"] == "":
                newId = None
                transaction.budget_id = newId
            else:
                # Transition to a new budget
                transaction.budget_id = transaction_data["budget_id"]
                budget = BudgetModel.query.get_or_404(transaction_data["budget_id"])
                budget.amount_spent += transaction.amount
                budget.amount_avaiable -= transaction.amount
            db.session.add(budget)

        try:
            db.session.add(transaction)
            db.session.commit()
        except SQLAlchemyError as e:
            abort(500, message="Unable to update the transaction.")
        
        return transaction

@blp.route("/transaction")
class TransactionList(MethodView):
    @blp.response(200, TransactionSchema(many=True))
    def get(self):
        # will return all of the transactions
        return TransactionModel.query.all()

    @blp.arguments(TransactionSchema)
    @blp.response(201, TransactionSchema)
    def post(self, transaction_data):

        budget_id =  transaction_data.get("budget_id", None)
        if budget_id == "" or budget_id == -1:
            # case for not associating with budget
            budget_id = None
        else:
            # case when associating with budget
            budget = BudgetModel.query.get_or_404(transaction_data["budget_id"])
            budget.amount_spent += transaction_data["amount"] 
            budget.amount_avaiable -= transaction_data["amount"]
            db.session.add(budget)

        subscription_id = transaction_data.get("subscription_id", None)
        if subscription_id == "" or subscription_id == -1 or (transaction_data["isSubscription"] == False):
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
        except SQLAlchemyError as e:
            abort(500, message="An error occurred creating the transaction.")

        return transaction