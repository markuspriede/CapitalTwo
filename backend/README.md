## Getting Started

First, create a virtual environment and activate it using the following commands:

```bash
python3 -m venv fastapienv
source fastapienv/bin/activate
```

Afterward, download the required libraries to run this app from requirements.txt

```bash
pip install -r requirements.txt
```

Then run the following command to start the server:
```bash
uvicorn main:app --reload
```

Go to "http://127.0.0.1:8000/docs" to interact with the endpoints (this will take you to Swagger UI)

Make sure to create account first then log in by using "Authorize" at top right hand of the Swagger UI.

This will authorize your account to use budget endpoints

## Cleaning Up

Please deactivate the virtual environment by typing "deactivate" at the console.

Afterwards, please make sure to delete sqlite database (capitalOne.db) and virtual environment folder before merging into the main branch

If you installed any new libraries, please use "pip freeze > requirements.txt" to edit to requirements.txt file. 
