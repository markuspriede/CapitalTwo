from marshmallow import Schema, fields

# budget schema
# amount_spent need to be calculated by amount from transactionschema
class PlainBudgetSchema(Schema):
    id = fields.Int(dump_only=True)
    category_name = fields.Str(required=True)
    start_date = fields.Date(required=True)
    end_date = fields.Date(required=True)
    budget_amount = fields.Float(required=True)
    amount_spent = fields.Float()
    amount_avaiable = fields.Float()

class PlainSubscriptionSchema(Schema):
    id = fields.Int(dump_only=True)
    icon_path = fields.Str(required=False)
    recurring = fields.Boolean(required=True)
    start_date = fields.Date(required=False)
    end_date = fields.Date(required=False)
    subscription_name = fields.Str(required=True)
    price = fields.Float(required=True)

# need to add user_id 
class PlainTransactionSchema(Schema):
    id = fields.Int(dump_only=True)
    alias = fields.Str(required=True)
    isSubscription = fields.Boolean(required=True)
    date = fields.Date(required=True)
    amount = fields.Float(required=True)
    description = fields.Str()
   
class UpdateBudgetSchema(Schema):
    start_date = fields.Date()
    category_name = fields.Str()
    budget_amount = fields.Float()
    amount_spent = fields.Float()
    
class TransactionSchema(PlainTransactionSchema):
    budget_id = fields.Int(required=True, load_only=True)
    budget =  fields.Nested(PlainBudgetSchema(), dump_only=True) # use only for returning not when receiving
    subscription_id = fields.Int(required=False, load_only=True)
    subscription = fields.Nested(PlainSubscriptionSchema(), dump_only=True)

# this will include schema where we can see all of related transactions
class BudgetSchema(PlainBudgetSchema):
    transactions = fields.List(fields.Nested(PlainTransactionSchema()), dump_only=True) # get the budget associated with this transaction

class SubscriptionSchema(PlainSubscriptionSchema):
    transactions = fields.List(fields.Nested(PlainTransactionSchema()), dump_only=True) # get the budget associated with this transaction






