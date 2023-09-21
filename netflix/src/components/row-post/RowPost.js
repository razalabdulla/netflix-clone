import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import './RowPost.css'
import Axios from '../../constants/axios'
import { image_url, api_key } from '../../constants/constants'

function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlId, setUrlId] = useState('')
  useEffect(() => {
    Axios.get(props.url).then((res) => {
      console.log(res.data);
      setMovies(res.data.results);
    });
  }, [props.url]); // Include props.url in the dependency array
  
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id) => {
    console.log(id);
    Axios.get(`movie/${id}/videos?api_key=${api_key}&language=en-US`).then((response) => {
      console.log(response.data);
      setUrlId(response.data)
      if(response.data.results.length!==0){
        setUrlId(response.data.results[0])
      }else{
       alert('Trailer Not Available')
      }
    })
  }
  return (
    <div className='row'>
      <h2 className='welcome' data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="750"
     data-aos-offset="0">{props.title}</h2>
      <div className="posters"  data-aos="fade-zoom-in"
     data-aos-easing="ease-in-back"
     data-aos-delay="550"
     data-aos-offset="0">
        {
          movies.map((obj) =>
            <img  onClick={() => handleMovie(obj.id)} className={props.isSmall ? 'small-poster' : 'poster-image' } src={`${image_url + obj.backdrop_path}`} alt="" />
          )
        }
      </div>
      {urlId ?<h2>YouTube Preview</h2>:null}
      {urlId && <Youtube videoId={urlId.key} opts={opts}/>}
      
    </div>
     
  )
}
export default RowPost