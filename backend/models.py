from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey, Numeric

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True)
    hashed_password = Column(String)

class Budget(Base):
    __tablename__ = 'budget'

    budget_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    start_date = Column(Date)
    end_date = Column(Date)
    total_amount = Column(Numeric(precision=10, scale=2))
