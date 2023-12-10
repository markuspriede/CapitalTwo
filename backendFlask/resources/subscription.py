from flask.views import MethodView
from flask_smorest import Blueprint, abort
from sqlalchemy.exc import SQLAlchemyError
from db import db
from models import SubscriptionModel, TransactionModel
from schemas import SubscriptionSchema, UpdateSubscriptionSchema

# Setting up a Flask Blueprint for handling subscription-related API routes.
# This organizes our code related to subscription operations under a single blueprint.
blp = Blueprint("Subscriptions", "subscriptions", description="Operations on Subscriptions")

@blp.route("/subscription/<string:subscription_id>")
class Subscription(MethodView):

    @blp.response(200, SubscriptionSchema)
    def get(self, subscription_id):
        # GET method to retrieve a specific subscription by its ID.
        # Utilizes SQLAlchemy's 'get_or_404' to automatically handle cases where the subscription is not found.
        subscription = SubscriptionModel.query.get_or_404(subscription_id)
        return subscription

    def delete(self, subscription_id):
        # DELETE method to remove a subscription and update related transactions.
        # This ensures that deleting a subscription also removes its association from all related transactions.
        subscription = SubscriptionModel.query.get_or_404(subscription_id)
        transactions_to_update = TransactionModel.query.filter_by(subscription_id=subscription_id).all()
        
        # Loop through each associated transaction and update its status and subscription reference.
        for transaction in transactions_to_update:
            transaction.isSubscription = False
            transaction.subscription_id = None
       
        # Commit the transaction updates and delete the subscription in one database transaction for consistency.
        db.session.add_all(transactions_to_update)
        db.session.delete(subscription)
        db.session.commit()
        return {"message": "Subscription deleted"}, 200
    
    @blp.arguments(UpdateSubscriptionSchema)
    @blp.response(200, SubscriptionSchema)
    def put(self, subscription_data, subscription_id):
        # PUT method to update specific properties of a subscription, like 'icon_path'.
        # This allows partial updates to a subscription without needing to provide all details.
        subscription = SubscriptionModel.query.get(subscription_id)

        if subscription:  
            # Only update the 'icon_path' if the subscription exists to avoid null reference errors.
            subscription.icon_path = subscription_data["icon_path"]
            
        db.session.add(subscription)
        db.session.commit()

        return subscription


@blp.route("/subscription")
class SubscriptionList(MethodView):
    
    @blp.response(200, SubscriptionSchema(many=True))
    def get(self):
        # GET method for retrieving a list of all subscriptions.
        # Useful for displaying all subscriptions in a UI or for admin purposes.
        return SubscriptionModel.query.all()

    @blp.arguments(SubscriptionSchema)
    @blp.response(201, SubscriptionSchema)
    def post(self, subscription_data):
        # POST method to create a new subscription.
        # Takes data validated against 'SubscriptionSchema' to ensure data integrity.
        subscription = SubscriptionModel(**subscription_data)
        try:
            # Attempt to save the new subscription to the database.
            db.session.add(subscription)
            db.session.commit()
        except SQLAlchemyError:
            # Provide error handling for database issues, maintaining robustness of the API.
            abort(500, message="An error occurred creating the subscription.")

        return subscription
