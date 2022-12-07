import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../store/friend";
import './Search.css'

function Search() {
  const [ search, setSearch ] = useState('')
  const friendState = useSelector((state) => state.friends);
  const friends = Object.values(friendState);

  const filtered = useMemo(() => {
    return friends.filter(friend => {
      return friend.toLowerCase().includes(search.toLowerCase())
    })
  }, [friends, search])

  return (
    <div className='search-header'>
        <i className="fa-solid fa-magnifying-glass"></i>
      <input
        className='search-input'
        placeholder="Filter by name"
        type='search'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className='search-friend-list'>
        {filtered.map(friend => (
          <div>{friend}</div>
          ))}
      </div>
    </div>
  )
}

export default Search;