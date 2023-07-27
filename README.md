# e-commerce
E-commerce backend

# Steps to run this project:
1. Clone the repo
2. switch to master branch
3. Run `npm insall` command to install all the dependencies
4. To run the server run (node server.js / npm start)
5. Now everything is done and ready to go.

# Api end points
post("/api/products/") // Create a Product

delete("/api/products/:id") // Delete a Product

put("/api/products/:id") // Update a Product

get("/api/products/") // get all Product

get("/api/products/:id") // get specific Product

get("/api/products/search") //serach product by name , description, variants names

# Architectural decisions
The APIs are designed using REST principles with MongoDB as the database for flexibility. 
Variants are embedded within the Product schema for a natural representation. 
Basic data validation and error handling ensure data integrity. 
Automated tests with Chai validate functionality. 
The search endpoint enhances user experience.
The architecture focuses on modularity, maintainability, and adherence to best practices.

# Author - Piyush Kumar
