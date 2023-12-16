# CS 639 README file

#### Partner: Capital One
#### Team Name: Capital Two
#### Team Member: Amy Wang, Markus Priede, Simar Singh, Spandan Jadhav, Tanay Reddy Kondammagari, Wai Zin Linn

#### Link to repository
https://github.com/markuspriede/CapitalTwo

### Set-up steps: 
Clone the repository
Navigate to the frontend directory
Run `npm install`
Run `npm run build`
Run `npm run start`
In your web browser, go to http://localhost:3000, where the frontend application is hosted. The backend is already running on AWS at http://3.84.112.106/swagger-ui 

**Note**: To setup and run everything locally, there is a docker-compose.yml file in the root directory which sets up everything locally by running `docker compose up`. You would need to create your own database as well, and create a environment file with the url to the database in the backend directory

### Overview of how the code works
By running the commands from the setup steps, it will run the NextJS server on localhost port 3000. The frontend is responsible for displaying all of the information about the account, including transactions, budgets, and subscriptions. In order to retrieve and store data, the frontend communicates with our backend server, which is hosted on AWS. This backend server is connected to our database which is able to store all of the necessary information for the users. 
As was shown in the demo, the user is able to view all of their transactions, and assign them to budgets that they had created before. The user is also able to create and customize their own budgets. Users may also assign different transactions to subscriptions, which helps them better keep track of the type of transactions they have. 

### What works 
- Managing transactions
- Selecting and deselecting subscriptions
- Categorizing budgets
- Adding, editing and deleting budgets
- Overview of spending analytics from graphs, updated corresponding to changes
- Interacting with all endpoints in the backend

### What doesn’t work
- Authentication
- Endpoints are not protected
- Icons do not display in subscriptions, unless creating subscription group directly from API
- Fetching data for all users in backend, not per user

### What we would work on next
If we had more time for this project, we would complete the authentication aspect of the application. After that, we would try to integrate the AI chatbot that we originally wanted to include in the project. This task would require us to host the AI model, and have it interact with the user to help automate tasks, as well as provide the user with helpful tips about how they may be able to stay with their budgets, provide information about subscriptions, and any other useful financial tips. 
