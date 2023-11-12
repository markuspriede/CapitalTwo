from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from db import db
from models import SubscriptionModel, TransactionModel
from schemas import SubscriptionSchema, TransactionSchema

blp = Blueprint("Subscriptions", "subscriptions", description="Operations on subscriptions")

@blp.route("/transactions/subscriptions/<int:subscription_id>")
class Subscription(MethodView):
    @blp.response(200, SubscriptionSchema)
    def get(self, subscription_id):
        subscription = SubscriptionModel.query.get_or_404(subscription_id)
        return subscription

    def delete(self, subscription_id):
        subscription = SubscriptionModel.query.get_or_404(subscription_id)
        db.session.delete(subscription)
        db.session.commit()
        return {"message": "Subscription deleted"}, 200

@blp.route("/transactions/subscriptions")
class SubscriptionList(MethodView):
    @blp.response(200, SubscriptionSchema(many=True))
    def get(self):
        return SubscriptionModel.query.all()

    @blp.arguments(SubscriptionSchema)
    @blp.response(201, SubscriptionSchema)
    def post(self, subscription_data):
        subscription = SubscriptionModel(**subscription_data)

        for transaction_data in subscription_data.get('transactions', []):
            transaction = TransactionModel(**transaction_data)
            subscription.transactions.append(transaction)

        try:
            db.session.add(subscription)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred creating the subscription.")

        return subscription
