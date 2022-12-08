import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../store/friend";
import './Search.css'

function Search() {
  const dispatch = useDispatch();
  const [ search, setSearch ] = useState('')
  const friendState = useSelector((state) => state.friends);
  const friends = Object.values(friendState);

  useEffect(() => {
    const myFriends = async () => {
      await dispatch(getFriends(search));
    };
    myFriends();
  }, [dispatch, search]);


  // const filtered = useMemo(() => {
  //   return friends.filter(friend => {
  //     return friend.toLowerCase().includes(search.toLowerCase())
  //   })
  // }, [friends, search])

  return (
      <div className='search-container'>
        <div className='search-input-div'>  
          <input 
            type='search'
            placeholder="Filter by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='search-input'/>
        </div>

        <div className='search-results'>
          {
            friends.map((friend) => {
              return (
                {friend}
              )
          })
          }
        </div>
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