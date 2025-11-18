const listaUsuarios = document.getElementById("listaUsuarios")

function getUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => {
    if(!response.ok) {
      throw new Error(`No ha sido posible realizar la consulta. Error: ${response.status}`)
    }
    return response.json()
  })
  .then(data => {
    const users = data.map((user, i) => {
      return {...user,
        age: randomAge(18, 65),
        img: `../assets/img/${user.id}.jpeg`,
        address: `${user.address.street}, ${user.address.suite}, ${user.address.city}`
      }
    }).map(user => {
      const { name, username, age, img, phone, email, company: {name: companyName}, address } = user
      const template = `
      <li>
      <div class="container-user">      
        <div class="info-user">
          <h2><strong>Nombre:</strong> ${name}</h2>
          <p><strong>Edad:</strong> ${age}</p>
          <p><strong>Nick:</strong> ${username}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>
        <div class="img-user">
          <img src="${img}" alt="${name}" />
        </div>
      </div>
        <div class="company-user">
          <p><strong>Comapañía:</strong> ${companyName}</p>
          <p><strong>Dirección:</strong> ${address}</p>
        </div>
      </li>
      `
      return template
    }
  ).join("")
  listaUsuarios.innerHTML = users
  })
  .catch(err => console.log(err))
}


function randomAge(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

getUsers()
