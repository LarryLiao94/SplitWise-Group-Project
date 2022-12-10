import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { getFriends } from "../../store/friend";
import './Search.css'

function Search() {
  const dispatch = useDispatch();
  const [ search, setSearch ] = useState('')
  const [ filteredData, setFilteredData ] = useState([])
  const friendState = useSelector((state) => state.friends);
  const friends = Object.values(friendState);
  // console.log(friends,'FRIENDS')
  
  const handleFilter = (e) => {
    const searchRes = e.target.value
    setSearch(searchRes)
    const newFilter = friends.filter((friend) => {
      return friend.toLowerCase().includes(searchRes.toLowerCase())
    });

    if (searchRes === '') {
      setFilteredData([])
    } else {
      setFilteredData(newFilter)
    }
  }

  const clearInput = () => {
    setFilteredData([])
    setSearch('')
  }

  // useEffect(() => {
  //   const myFriends = async () => {
  //     await dispatch(getFriends(search));
  //   };
  //   myFriends();
  // }, [dispatch, search]);


  // const filtered = useMemo(() => {
  //   return friends.filter(friend => {
  //     return friend.toLowerCase().includes(search.toLowerCase())
  //   })
  // }, [friends, search])

  return (
    <div className='search'>
      <div className='search-input-div'>
        <div className='search-icon'>
          {filteredData.length === 0 ? (
            <i className="fa-solid fa-magnifying-glass"></i>
          ) : 
            <i className="fa-solid fa-x" onClick={clearInput}></i>
          }
        </div>
        <input 
        className='search-input'
        type='text' 
        placeholder="Filter by name" 
        value={search}
        onChange={handleFilter}
        />
      </div>

      { filteredData.length != 0 && (
        <div className='data-result'>
          {filteredData.slice(0, 15).map((friend, key) => {
            return (
               <NavLink className='data-item'> 
                <p>
                  {friend} 
                </p>
               </NavLink>
            )
          })}
        </div>
      )}
    </div>

    // <div className='search-header'>
    //     <i className="fa-solid fa-magnifying-glass"></i>
    //   <input
    //     className='search-input'
    //     placeholder="Filter by name"
    //     type='search'
    //     value={search}
    //     onChange={e => setSearch(e.target.value)}
    //   />
    //   <div className='search-friend-list'>
    //     {filtered.map(friend => (
    //       <div>{friend}</div>
    //       ))}
    //   </div>
    // </div>

  )
}

export default Search;