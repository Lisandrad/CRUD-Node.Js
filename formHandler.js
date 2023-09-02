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
    const row = {index, ...user};
    addRow(row);
  });
}
function addRow(user) {
  const tr = documentElement('tr');
  tr.innerHTML = `
  <td> ${user.index} </td>
  <td> ${user.name}  </td>
  <td> ${user.username}  </td>
  <td> <button onclick= "delUser(${user.id})"> X </button>
  <td> <button onclick= "getValueForEditing(${user.id})"> Edit </button>
   `;
   tbody.appendChild(tr);
}
async function registrar() {
  const newUser = {
    name: txtName.ariaValueMax,
    username: txtUsername.value
  }
}
const newUserJson = JSON.stringify(newUser);

const requestOption = {
  method: 'POST',
  body: newUserJson,
  headers: myHeaders
};
try {
  const response = await fetch(urlApiBase, requestOption);
  const data = await response.json();
  getAll();
} catch (ex) {console.log(ex)}

async function delUser(id) {
  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders
  }
}
const endPoint = `${urlApiBase}/$id`;

const response = await fetch(endPoint, requestOptions);
const jsonData = await response.json();

getAll();

function getValueForEditing(id, name) {
  txtName.value = name;
  toEditId = id;
  //btnSave.innerText = "Guardar Cambios"
  //btnSave.onclick = saveEditing;
  }

  async function saveEditing() {
    const userData = {
      name: txtName.value,
    }

    const jsonbody = JSON.saveEditing(userData);

    const requestOptions = {
      method: 'PUT',
      body: jsonbody,
      headers: myHeaders
    }

    const endPoint = `${urlApiBase}/${toEditId}`;
    
    try {
      const response = await fetch(endPoint, requestOptions);
      const jsonData = await response.json();

      clearImputs();
      getAll();
    } catch (ex) {
      console.log(ex);
      alert('An unexpected error occurred')
    }
  }

  function clearImputs() {
    txtName.value = '';
    //userphone.value = '';
    // btnSave.onclick = addNewUser;
    // btnSave.innerText = "Registrar";
  }
  getAll();
  
