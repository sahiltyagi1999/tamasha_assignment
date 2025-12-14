📝 Backend Assignment – Product & Order Management API
1. Project Overview

This project is a production-style backend system built using Node.js, TypeScript, Express, and MongoDB.
It provides APIs to manage:

Products

Orders

Dynamic pricing

Inventory updates

Order lifecycle

Pagination & sorting

User-based order fetching

The system uses a layered architecture (routes → controllers → services → repositories → models) for clean maintainability and scalability.

2. Tech Stack Used

Node.js

TypeScript

Express.js

MongoDB

Mongoose

ts-node / ts-node-dev (for direct TS execution)

dotenv (environment variables)

3. Folder Structure Explanation
backend/
│ package.json
│ tsconfig.json
│ README.md
│ .env
│
└── src/
    ├── app.ts               # Express app setup
    ├── server.ts            # Server + DB initialization
    │
    ├── models/              # Mongoose schemas
    ├── controllers/         # Request handlers
    ├── services/            # Business logic
    ├── repositories/        # Database operations
    ├── routes/              # Route definitions
    ├── constants/           # Constants (if needed)
    ├── utils/               # Helper utilities
    ├── middleware/
    │     └── errorHandler.ts

Why this structure?

✔ Clear separation of concerns
✔ Scalable for real production apps
✔ Easy to maintain and onboard new developers

4. Environment Setup Instructions

Create a .env file in the project root:

PORT=5000
MONGO_URI=mongodb://localhost:27017/assignment2


Install dependencies:

npm install

5. Steps to Run the Project on Localhost
Development Mode (recommended)
npm start


This runs:

ts-node src/server.ts


No build required.

If using ts-node-dev (auto reload):
npm install -D ts-node-dev
npm run dev

6. Sample Variables

.env file:

PORT=5000
MONGO_URI=mongodb://localhost:27017/assignment2


You may adjust DB name as needed.

7. Database Schema / Models
Product Model
name: string
category: string
basePrice: number
stock: number
sku: string (unique)
isDeleted: boolean (soft delete)
timestamps: true

Order Model
userId: string
items: [
  {
    product: ObjectId (ref: Product),
    quantity: number,
    appliedPrice: number
  }
]
totalAmount: number
status: PLACED | PACKED | SHIPPED | DELIVERED | CANCELLED
timestamps: true

8. All API Endpoints
Product APIs
Method	Endpoint	Description
POST	/api/products	Create a new product
GET	/api/products	List products with pagination & sorting
PUT	/api/products/:id	Update a product
DELETE	/api/products/:id	Soft delete a product
Order APIs
Method	Endpoint	Description
POST	/api/orders	Create an order (with dynamic pricing + inventory updates)
GET	/api/orders/:id	Get order details
PATCH	/api/orders/:id/status	Update order status
GET	/api/orders?userId=123	Get orders by user with pagination & sorting
9. Postman Collection OR cURL Commands
Create Product
curl -X POST http://localhost:5000/api/products \
-H "Content-Type: application/json" \
-d '{"name":"Laptop","category":"electronics","basePrice":50000,"stock":10,"sku":"LP-123"}'

List Products (with pagination & sorting)
curl -X GET "http://localhost:5000/api/products?page=1&limit=10&sortBy=name&order=asc"

Update Product
curl -X PUT http://localhost:5000/api/products/PRODUCT_ID \
-H "Content-Type: application/json" \
-d '{"stock": 25}'

Delete Product
curl -X DELETE http://localhost:5000/api/products/PRODUCT_ID

Create Order
curl -X POST http://localhost:5000/api/orders \
-H "Content-Type: application/json" \
-d '{
  "userId": "123",
  "items": [
    { "productId": "PRODUCT_ID_1", "quantity": 3 },
    { "productId": "PRODUCT_ID_2", "quantity": 12 }
  ]
}'

Get Order by ID
curl -X GET http://localhost:5000/api/orders/ORDER_ID

Update Order Status
curl -X PATCH http://localhost:5000/api/orders/ORDER_ID/status \
-H "Content-Type: application/json" \
-d '{"status":"SHIPPED"}'

Get Orders by User (with pagination)
curl -X GET "http://localhost:5000/api/orders?userId=123&page=1&limit=5&sortBy=createdAt&order=desc"

10. Assumptions & Limitations
✔ Assumptions

Order creation always includes a valid userId

All product SKUs are unique

Soft delete is used for products (isDeleted = true)

All stock updates occur within MongoDB transactions

Default sorting is createdAt desc

❗ Limitations

No authentication system implemented (out of scope)

No role-based access control

No rate limiting / caching layer

Dynamic pricing rules are simple and hardcoded as per assignment

No Swagger documentation provided (can be added if needed)