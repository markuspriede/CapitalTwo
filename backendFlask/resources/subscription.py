from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from db import db
from models import SubscriptionModel, TransactionModel
from schemas import SubscriptionSchema

blp = Blueprint("Subscriptions", "subscriptions", description="Operations on Subscriptions")

@blp.route("/subscription/<string:subscription_id>")
class Subscription(MethodView):
    @blp.response(200, SubscriptionSchema)
    def get(self, subscription_id):
        subscription = SubscriptionModel.query.get_or_404(subscription_id)
        return subscription

    def delete(self, subscription_id):
        subscription = SubscriptionModel.query.get_or_404(subscription_id)
        transactions_to_update = TransactionModel.query.filter_by(subscription_id=subscription_id).all()
        for transaction in transactions_to_update:
            transaction.isSubscription = False
            transaction.subscription_id = None
       
        db.session.add_all(transactions_to_update)
        db.session.delete(subscription)
        db.session.commit()
        return {"message": "Subscription deleted"}, 200

@blp.route("/subscription")
class SubscriptionList(MethodView):
    @blp.response(200, SubscriptionSchema(many=True))
    def get(self):
        # will return all of the transactions
        return SubscriptionModel.query.all()

    @blp.arguments(SubscriptionSchema)
    @blp.response(201, SubscriptionSchema)
    def post(self, subscription_data):
        subscription = SubscriptionModel(**subscription_data)
        try:
            db.session.add(subscription)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred creating the subscription.")

        return subscription
