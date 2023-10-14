from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, Path
from starlette import status
from models import Budget
from database import SessionLocal
from .auth import get_current_user
from schemas.budget_schema import BudgetRequest

router = APIRouter(
    prefix='/budget',
    tags=['budget']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

## Get all of the budgets to user that is logged in
@router.get("/", status_code=status.HTTP_200_OK)
async def get_allBudget(user: user_dependency, db: db_dependency):
    return db.query(Budget).filter(Budget.user_id == user.get('id')).all()


## Get a specific budget information using id
@router.get("/{budget_id}", status_code=status.HTTP_200_OK)
async def get_specificBudget(user: user_dependency, db: db_dependency, budget_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')

    budget_model = db.query(Budget).filter(Budget.budget_id == budget_id)\
        .filter(Budget.user_id == user.get('id')).first()

    if budget_model is not None:
        return budget_model

    raise HTTPException(status_code=404, detail='Budget not found.')

## Create a budget
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_budget(user: user_dependency, db: db_dependency,
                      budget_request: BudgetRequest):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    budget_model = Budget(**budget_request.model_dump(), user_id=user.get('id'))

    db.add(budget_model)
    db.commit()
    return {"message": "Budget successfully created"}

## Update a budget
@router.put("/{budget_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_budget(user: user_dependency, db: db_dependency,
                      budget_request: BudgetRequest,
                      budget_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')

    budget_model = db.query(Budget).filter(Budget.budget_id == budget_id)\
        .filter(Budget.user_id == user.get('id')).first()
    if budget_model is None:
        raise HTTPException(status_code=404, detail='Budget not found.')

    budget_model.start_date = budget_request.start_date
    budget_model.end_date = budget_request.end_date
    budget_model.total_amount = budget_request.total_amount

    db.add(budget_model)
    db.commit()
    return {"message": "Budget successfully updated"}

## Delete a budget
@router.delete("/{budget_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_todo(user: user_dependency, db: db_dependency, budget_id: int = Path(gt=0)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')

    todo_model = db.query(Budget).filter(Budget.budget_id == budget_id)\
        .filter(Budget.user_id == user.get('id')).first()
    if todo_model is None:
        raise HTTPException(status_code=404, detail='Budget not found.')
    db.query(Budget).filter(Budget.budget_id == budget_id).filter(Budget.user_id == user.get('id')).delete()
    db.commit()
    return {"message": "Budget successfully deleted"}
