// import "./index";
// import { csrfFetch } from '../../store/csrf.js'
// import { getFriends } from "../../store/friend";

// const result = document.getElementById('result')
// const filter = document.getElementById('filter')
// const listItems = []

// getFriends()

// filter.addEventListener('input', (e) => filterData(e.target.value))

// async function getData() {
//   const res = await csrfFetch(`/api/friends/`)
//   console.log(res, 'here')
  
//   const { results } = await res.json()
  
//   // Clear result
//   result.innerHTML = ''
//   results.forEach(user => {
//   const li = document.createElement('li')
//   listItems.push(li)

//   li.innerHTML = 
//   `
//   <img src="${user.picture.large}" alt="${user.name.first}">
//   <div class="user-info">
//     <h4>${user.name.first} ${user.name.last}</h4>
//   </div>
//   `

//   result.appendChild(li)
//   })
// }

// function filterData(searchTerm) {
//   listItems.forEach(item => {
//     if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
//       item.classList.remove('hide')
//     } else {
//       item.classList.add('hide')
// }})
// }