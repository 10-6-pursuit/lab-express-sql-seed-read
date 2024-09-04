import {useState, useEffect} from 'react'

export default function Home () {
    const [allSongs, setAllSongs] = useState([]);
    const API = import.meta.env.VITE_API_URL;
    useEffect(() => {
        console.log(API)
        fetch(`${API}/songs`)
        .then(res => res.json())
        .then(resJSON => setAllSongs(resJSON))
        .catch(error => console.error(error))
    }, [])

    return (
        <>
           {
            allSongs.map(song => {
                return (
                    <di>
                        <p>Song: {song.name}</p>
                        <p>Artist: {song.artist}</p>
                        <p>Album: {song.album}</p>
                        <p>Duration: {song.time}</p>
                        <div>
                            
                        </div>
                    </di>
                )
            })
           }
        </>
    )
}