const express = require('express')
const app = express()

app.use(express.json()); // --> Midleware
app.use(express.static(__dirname, '/CRUD-NODE'));  // --> Agregando ruta para conectar con el frontend

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
let users=[];
let _id = 0;

app.post('/users',(request, response) => {
	const {user, username} = request.body;

	_id += 1;
	const newUser = { id: _id, user: user, username: username}
	users.push(newUser);
	response.json(newUser);
	//console.log(newUser);
});

//Implement PUT request
app.put('/users',(request, response) => {
	const userId = request.query.id;

	const userToUpdate = users.find(userResult => userResult.id == userId);

	if(userToUpdate) {
		response.send(`The user ${userId} was updated successfully`);
	} else {
		response.status(404).send(`User with ID ${userId} not found`)
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

const port = 3000;
app.listen(port => {
	console.log(`Servidor escuchando en el puerto ${port}`);
});
