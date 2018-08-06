# Serverless Todo Application
This is a simple Todo Application example built upon [Serverless](https://serverless.com/) to illustrate how to use [Type Dynamo](https://github.com/lucasmafra/type-dynamo) in your projects.
It exposes a set of simple REST endpoints that query and write data into DynamoDB.

## Running
To run this project, make sure you have the Serverless library globally installed. If you don't, you can run:
```sh
yarn global add serverless # or npm install -g serverless
```

Clone the project, open a terminal in the project root folder and run:
```sh
yarn install # or npm install
serverless dynamodb install # this allows you to run DynamoDB locally
serverless offline start
```

## Demo
You can find a demo web application in [here](https://type-dynamo.lucasmafra.io). It is just a simple React interface that consumes the endpoints provided by this project. If you're curious about the front-end implementation, you can check the code [here](https://github.com/lucasmafra/todo-application) (it's not the focus of this example though).  
