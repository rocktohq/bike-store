<h1>BikeStore Sever</h1>

<p>BikeStore is a Node.js server app uses Express.js framework, written in typescript, integrated with MongoDB is able to manage invertory systems for bikes. This application's API has some features like add and manage products(bikes) orderring system and revenue generation.</p>

<h2>Table of Contents</h2>

- <a href="#keyFeatures">Key Features</a>
- <a href="#technologiesUsed">Technologies Used</a>
- <a href="#installationGuide">Installation Guide</a>
- <a href="#apiEndpoints">API Endpoints</a>
- <a href="#errorHandling">Error Handling</a>

<div id="keyFeatures">
<h3>Key Features</h3>
</div>

<div id="technologiesUsed">
<h3>Technologies Used:</h3>

- **TypeScript:** We have uses typeScript to code this entire application.
- **Express.js:** For creating the Server.
- **Mongoose:** Integreting with MongoDB Query
- **MongoDB:** Integreting with MongoDB Database
- **Zod:** We have used Zod for validating user input data.
</div>

<div id="installationGuide">
<h3>Installation Guide</h3>

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
<h3>API Endpoits</h3>
</div>

<div id="errorHandling">
<h3>Error Handling</h3>
</div>
