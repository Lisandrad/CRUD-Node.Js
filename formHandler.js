const urlApiBase = 'http://localhost:3000/users';
const tbody = document.getElementById('body');
const txtName = document.getElementById('txtName');
const txtUsername = document.getElementById('txtUsername');

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let toEditId = 0;

async function getAll() {
  const response = await fetch(urlApiBase);
  const data = await response.json();
  let index = 0;
  tbody.innerHTML = '';

  data.forEach((user) => {
    index += 1;
    const row = { index, ...user };
    addRow(row);
  });
}

function addRow(user) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td> ${user.index} </td>
    <td> ${user.name}  </td>
    <td> ${user.username}  </td>
    <td> <button onclick="delUser(${user.id})"> X </button> </td>
    <td> <button onclick="getValueForEditing(${user.id}, '${user.name}')"> Edit </button> </td>
  `;
  tbody.appendChild(tr);
}

async function registrar() {
  const newUser = {
    name: txtName.value,
    username: txtUsername.value
  };

  const newUserJson = JSON.stringify(newUser);

  const requestOptions = {
    method: 'POST',
    body: newUserJson,
    headers: myHeaders
  };

  try {
    const response = await fetch(urlApiBase, requestOptions);
    const data = await response.json();
    getAll();
  } catch (ex) {
    console.log(ex);
  }
}

async function delUser(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders
  };

  const endPoint = `${urlApiBase}/${id}`;

  try {
    const response = await fetch(endPoint, requestOptions);
    const jsonData = await response.json();
    getAll();
  } catch (ex) {
    console.log(ex);
  }
}

function getValueForEditing(id, name) {
  txtName.value = name;
  toEditId = id;
}

async function saveEditing() {
  const userData = {
    name: txtName.value
  };

  const jsonbody = JSON.stringify(userData);

  const requestOptions = {
    method: 'PUT',
    body: jsonbody,
    headers: myHeaders
  };

  const endPoint = `${urlApiBase}/${toEditId}`;

  try {
    const response = await fetch(endPoint, requestOptions);
    const jsonData = await response.json();
    clearInputs();
    getAll();
  } catch (ex) {
    console.log(ex);
    alert('Ocurrió un error inesperado');
  }
}

function clearInputs() {
  txtName.value = '';
}

getAll();
