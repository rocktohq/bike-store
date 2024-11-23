<h1>BikeStore Sever</h1>

<p>BikeStore is a Node.js server app uses Express.js framework, written in typescript, integrated with MongoDB is able to manage invertory systems for bikes. This application's API has some features like add and manage products(bikes) orderring system and revenue generation.</p>

<h2>Table of Contents</h2>

- <a href="#keyFeatures">**Key Features**</a>

- <a href="#technologiesUsed">**Technologies Used**</a>

- <a href="#installationGuide">**Installation Guide**</a>

- <a href="#apiEndpoints">**API Endpoints**</a>

- <a href="#errorHandling">**Error Handling**</a>

<div id="keyFeatures">
<h2>Key Features</h2>

1. **_Secure Inventory Management:_** You can add, view, update and delete bike details from your database securely validating using Zod and MongooseSchema.

2. **_Order and Inventory Updates:_** When user places order, inventory and stocks will be automatically updated.

3. **_Revenue Calculation:_** You can calculate the total revenue in one click.

4. **_Search and Filter Functionality:_** Search bikes by name, brand, or category for easy access to specific products.

</div>

<div id="technologiesUsed">
<h2>Technologies Used:</h2>

- **TypeScript:** We have used typeScript to code this entire application.

- **Express.js:** Express.js is the most popular Node.js framework. So, we have used it for creating the Server.

- **MongoDB:** Integreting with MongoDB Database

- **Mongoose:** Integreting with MongoDB Query

- **Zod:** We have used Zod for validating user input data.

</div>

<div id="installationGuide">
<h2>Installation Guide</h2>

1. First, clone the repository to your local system

```bash
git clone https://github.com/rocktohq/bike-store.git
```

2. Open the project folder in your code editor(ie: VS Code)

```bash
cd bike-store
code .
```

3. Install all dependencies. I'm using npm; you can use yarn or any dependency manager you like

```bash
npm install
```

4. Setup the environment variables. For that, create a file .env

```bash
touch .env
```

5. Fillup with your information

```javascript
PORT=3000 // Port number
DATABASE_URI= // MongoDB URI
```

6. If all the steps above are done, start the server

```bash
npm run dev
```

</div>

<div id="apiEndpoints">
<h2>API Endpoints</h2>

1. **_Add a new Bike:_**  
   Endpoints: `/api/products`  
   Method: `POST`  
   Request Body:

```json
{
  "name": "GSX-R",
  "brand": "SUZUKI",
  "price": 200000,
  "category": "Sports",
  "description": "THE MIGHTY BEAST. The Suzuki GSX-R Dual ABS line had defined sportbike performance for over 30 years, with more than a million sold worldwide.",
  "quantity": 7
}
```

Response:

```json
{
  "message": "Bike created successfully",
  "success": true,
  "data": {
    "name": "GSX-R",
    "brand": "SUZUKI",
    "price": 200000,
    "category": "Sports",
    "description": "THE MIGHTY BEAST. The Suzuki GSX-R Dual ABS line had defined sportbike performance for over 30 years, with more than a million sold worldwide.",
    "quantity": 7,
    "inStock": true,
    "createdAt": "2024-11-22T21:23:16.986Z",
    "updatedAt": "2024-11-22T21:23:16.986Z",
    "_id": "6740f79d04b0d6ab21c86de9",
    "__v": 0
  }
}
```

2. **_Get all Bikes:_**  
   Endpoints: `/api/products`  
   Method: `GET`  
   Response:

```json
{
  "message": "Bikes retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "Casual",
      "bikes": [
        {
          "_id": "6740ea200046f4e65c3fd45a",
          "name": "Xen Xin",
          "brand": "Xen",
          "price": 10000,
          "category": "Casual",
          "description": "Casual bike",
          "quantity": 5,
          "inStock": true,
          "createdAt": "2024-11-22T20:29:05.829Z",
          "updatedAt": "2024-11-22T20:29:05.829Z",
          "__v": 0
        }
      ]
    }
  ]
}
```

- Search for Products:  
  Query: `/api/products?searchTerm=keyWords` keyWords can be product name, brand or category. We have used $regex operator to macth partialy and case-insensitive search.  
  Response:

```json
{
  "message": "Bikes retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "6740ea030046f4e65c3fd452",
      "name": "Gonda Z",
      "brand": "Gonda",
      "price": 10000,
      "category": "Sports",
      "description": "A lightweight road bike designed for speed and performance.",
      "quantity": 5,
      "inStock": true,
      "createdAt": "2024-11-22T20:29:05.829Z",
      "updatedAt": "2024-11-22T20:29:05.829Z",
      "__v": 0
    },
    {
      "_id": "6740ea090046f4e65c3fd454",
      "name": "Gonda Y",
      "brand": "Gonda",
      "price": 10000,
      "category": "Sports",
      "description": "A lightweight road bike designed for speed and performance.",
      "quantity": 5,
      "inStock": true,
      "createdAt": "2024-11-22T20:29:05.829Z",
      "updatedAt": "2024-11-22T20:29:05.829Z",
      "__v": 0
    }

    // ...rest data will be here
  ]
}
```

3. **_Get a Single Bike:_**  
    Endpoints: `/api/products/productId`  
    Method: `GET`
   Response:

```json
{
  "message": "Bike retrieved successfully",
  "status": true,
  "data": {
    "_id": "6740b1ba9d1c3f2d2a486452",
    "name": "Pakizum 500",
    "brand": "Pakizum",
    "price": 10000,
    "category": "Road Bike",
    "description": "A lightweight road bike designed for speed and performance.",
    "quantity": 9,
    "inStock": true,
    "createdAt": "2024-11-22T16:30:15.177Z",
    "updatedAt": "2024-11-22T17:19:02.305Z",
    "__v": 0
  }
}
```

4. **_Update a Bike:_**  
   Endpoints: `/api/products/productId`  
   Method: `PUT`
   Request Body:

```json
{
  //* Properties to update
  "name": "Honada X"
}
```

Response:

```json
{
  "message": "Bike updated successfully",
  "status": true,
  "data": {
    "_id": "6740b1ba9d1c3f2d2a486452",
    //* Updated name
    "name": "Honda X",
    "brand": "Pakizum",
    "price": 10000,
    "category": "Road Bike",
    "description": "Meet the revolutionary Honda X Dual ABS with the best power-to-weight ratio and acceleration in the 147.3 cm3 class.",
    "quantity": 10,
    "inStock": true,
    "createdAt": "2024-11-22T16:30:15.177Z",
    "updatedAt": "2024-11-22T21:24:04.946Z",
    "__v": 0
  }
}
```

5. **_Delete a Bike:_**  
   Endpoints: `/api/products/productId`  
   Method: `DELETE`  
   Response:

```json
{
  "message": "Bike deleted successfully",
  "status": true,
  "data": {
    "_id": "6740b1ba9d1c3f2d2a486452",
    "name": "Honda X",
    "brand": "Pakizum",
    "price": 10000,
    "category": "Road Bike",
    "description": "A lightweight road bike designed for speed and performance.",
    "quantity": 10,
    "inStock": true,
    "createdAt": "2024-11-22T16:30:15.177Z",
    "updatedAt": "2024-11-22T21:24:08.881Z",
    "__v": 0
  }
}
```

6. **_Place an Order:_**  
   Endpoints: `/api/orders`  
   Method: `POST`
   Request Body:

```json
{
  "email": "test@gmail.com",
  "product": "6740b1ba9d1c3f2d2a486452",
  "quantity": 1,
  "totalPrice": 150000
}
```

Response:

```json
{
  "message": "Order created successfully",
  "status": true,
  "data": {
    "_id": "6740918f51ff7c69eeb13a0a",
    "email": "test@gmail.com",
    "product": "6740b1ba9d1c3f2d2a486452",
    "quantity": 1,
    "totalPrice": 150000,
    "createdAt": "2024-11-22T16:39:41.050Z",
    "updatedAt": "2024-11-22T16:39:41.050Z"
  }
}
```

7. **_Revenue Calculation:_**  
   Endpoints: `/api/orders/revenue`  
   Method: `GET`  
   Response:

```json
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 3600
  }
}
```

</div>

<div id="errorHandling">
<h2>Error Handling</h2>
<p>For input data validation we have used Zod and some custom mongoose validations too.</p>
Example of error message:

```json
{
  "message": "Price must be positive number!",
  "success": false,
  "error": {
    "name": "ZodError",
    "errors": {
      "code": "too_small",
      "minimum": 0,
      "type": "number",
      "inclusive": false,
      "exact": false,
      "message": "Price must be positive number!",
      "path": ["price"]
    }
  },
  "stack": "ZodError:..."
}
```

Another example:

```json
{
  "message": "Bike not found",
  "success": false,
  "error": {
    "name": "Bike not found",
    "errors": {}
  },
  "stack": ""
}
```

</div>
