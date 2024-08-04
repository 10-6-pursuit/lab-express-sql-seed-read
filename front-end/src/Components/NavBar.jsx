import { Link } from 'react-router-dom'
export default function NavBar () {
    
    return (
        <>
            <Link to='/'><p>All Songs</p></Link>
            <Link to='/favsongs'><p>Fav Songs</p></Link>
        </>
    )
}