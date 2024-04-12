import Logo from '../movie.jpg'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='flex border space-x-8 items-center pl-3'>
        <img className='w-[50px]' src={Logo} alt="" />
        <Link to="/" className='text-blue-400 text-2xl'>Movies</Link>
        <Link to="/watchlist" className='text-blue-400 text-2xl'>Watchlist</Link>
    </div>
  )
}

export default Navbar
