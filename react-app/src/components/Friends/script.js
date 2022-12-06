import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriends } from "../../store/friend";

function Search() {
  const dispatch = useDispatch();
  const res = useSelector((state) => Object.values(state.users.res));  

  const [ search, setSearch ] = useState('')
  const inputRef = useRef()
  const friends = {getFriends}
  
  const onChange = (e) => {
    setSearch(friends => {
      return friends.filter()
    });
  };

  useEffect(() => {
    let timeout;
    (async () => {
      try {
        await dispatch(search)
      } catch (err) {

      }
    })
  })
  return (
    <div className='search-div'>
      <div className='search-header'>
        <h2>Search</h2>
        <div className='search-input-div'>
          <input
            className='search-input'
            type="search"
            placeholder="Search"
            value={search}
            onChange={onChange}
          />
          {/* {loaded ? ( */}
            <span
              onClick={() => setSearch("")}
              className='search-cancel'>
              Cancel
            </span>
          {/* ) : (
            <div className={styles.loadingCancelSpinner}>
              <LoadingSpinner />
            </div>
          )} */}
        </div>
      </div>
      <div className='friends'>
        {/* {loaded ? ( */}
          {res.map((friend) => <SearchUser user={friend} />)}
        {/* // ) : (
        //   <div className={styles.loadingSpinner}>
        //     <LoadingSpinner />
        //   </div>
        // )} */}
      </div>
    </div>
  );
}

export default Search

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