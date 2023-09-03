const express = require('express')
const app = express()

app.use(express.json()); // --> Midleware
//app.use(express.static(__dirname+ '/CRUD-NODE'));  // --> Agregando ruta para conectar con el frontend

// Enable CORS for all routes
const cors = require('cors');
app.use(cors({ orgin: "*"}));

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
	const {name, username} = request.body;

	_id += 1;
	const newUser = { id: _id, name: name, username: username}
	users.push(newUser);
	response.json(newUser);
	//console.log(newUser);
});

//Implement PUT request
app.put('/users',(request, response) => {
	const userToEdit = request.query.id;
  const {name} = request.body;
  let userEdited = users.find(user =>  parseInt(user.id) == parseInt(userToEdit));
 
  
  if(!users.some(user => user.id == userToEdit)) {
    response.json("No found");
  } else {
    userEdited.name = name;
    users = users.filter(user => parseInt(user.id) !== parseInt(userToEdit));
    users.push(userEdited);   
    response.json("ok");
  }

});

//Implement DELETE  request
app.delete('/users', (request, response) => {
	const deleteToUser = request.query.id;
  
	if(!users.some(userResult => userResult.id == deleteToUser)) {
		response.json("No found");
	} else {
    
		users = users.filter(userResult => parseInt(userResult.id) !== parseInt(deleteToUser));
		response.json("The user was successfully deleted")
	}
});

const port = 3000;
app.listen(port, () => {
	console.log(`Servidor escuchando en el puerto ${port}`);
});
