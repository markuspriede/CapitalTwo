from pydantic import BaseModel, Field
from datetime import date

class BudgetRequest(BaseModel):
    start_date : date
    end_date : date
    total_amount : float = Field(gte=0)

    # @field_validator('start_date', 'end_date')
    # def date_range_check(cls, values):
    #     start_date = values.get('start_date')
    #     end_date = values.get('end_date')
    #     if start_date and end_date and start_date >= end_date:
    #         raise ValueError('Start date must be earlier than end date')
    #     return values

