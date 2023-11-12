from db import db

# user_id and category_id as foreign key
class SubscriptionModel(db.Model):
    # create table call budgets
    __tablename__ = "subscriptions"

    # create following columns
    id = db.Column(db.Integer, primary_key=True)
    icon_path = db.Column(db.String(80), unique=False, nullable=True)
    routine = db.Column(db.String(20), unique=False, nullable=False)
    description = db.Column(db.String(30), unique=False, nullable=False)

    # the backend can look for the latest transaction to get sub_name and price of subscription
    subscription_name = db.Column(db.String(20), unique=False, nullable=False)
    price = db.Column(db.Float(precision=2), unique=False, nullable=False)

    transactions = db.relationship("TransactionModel", back_populates="subscription")
    
   
   