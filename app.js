const express = require('express')
const app = express()

app.use(express.json()); // --> Midleware
app.use(express.static( __dirname, '/CRUD-NODE.JS')); // --> Agregando ruta para conectar con el frontend

let users=[];
let _id = 0;

//endPoint
app.get('/users',(request, response) => {
  response.json(users);
});

//Search users by id
app.get('/users', (request, response) => {
  const {id} = request.params;
  let userResult = users.find((u) => u.id == id)

  if (userResult !== undefined) {
     response.json(userResult)
  } else {
    response.send("No found")
  }
});

//Implement POST request
app.post('/users',(request, response) => {
	const {user, username} = request.body;

	_id += 1;
	const newUser = { id: id, name: name, username: username}
	users.push(newUser);

});

//Implement PUT request
app.put('/users/:id', (request, response) => {
	const userId = request.body;

	if( users. filter(userResult => userResult.id == userId)) {
		response.send(`The user ${userId}was updated successfully`)
	}
});

//Implement DELETE  request
app.delete('/users', (request, response) => {
	const deleteToUser = request.query["id"];

	if(!users.some(userResult => userResult.id == deleteToUser)) {
		response.send("No found");
	} else {
		users = users.filter(userResult => parseInt(userResult.id) !== parseInt(deleteToUser))
		response.send("The user was successfully deleted")
	}
});

app.listen(3000);
