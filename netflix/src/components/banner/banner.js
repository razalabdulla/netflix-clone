import React, { useEffect, useState } from 'react'
import './banner.css'
import axios from '../../constants/axios'
import { api_key, image_url } from '../../constants/constants'
import Youtube from 'react-youtube'
import AOS from "aos";
import "aos/dist/aos.css";

function Banner(props) {
  const [movie, setMovie] = useState()
  const [urlId, setUrlid] = useState('')

  useEffect(() => {
  axios.get(`trending/all/week?api_key=${api_key}&with_genres=28`).then((response) => {
      const randomIndex = Math.floor(Math.random() * response.data.results.length);
      const randomMovie = response.data.results[randomIndex]
      setMovie(randomMovie)
    })
    AOS.init();
    AOS.refresh();
  }, [])
  const play = (id) => {
    console.log(id);
    axios.get(`movie/${id}/videos?api_key=${api_key}&language=en-US`).then((response)=>{
      console.log(response.data);
    if(response.data.results!==0){
      setUrlid(response.data.results[0])
    }
     else{
      console.log('illaaaa');
     }
      
    })
  }
  const handleList=()=>{
    alert('List option is coming soon')
  }
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };


  return (

    <div className=''>
      <div data-aos="fade-up"
     data-aos-duration="3000" className="content" style={{  backgroundImage: `url(${movie ? image_url + movie.backdrop_path : ''})` }}>


        <div className="banner-buttons">
          <h1 className='title' data-aos="fade-up"
     data-aos-duration="3000">{movie ? movie.title : ''}</h1>
          <button className='button fa-solid fa-play' onClick={()=>play(movie.id)} >play</button>
       
  <button className='button fa-solid fa-list' onClick={handleList}>List</button>

         
          <h1 className='descrption'>{movie ? movie.overview : ''}</h1>
          <div className="fade-bottom"></div>

        </div>

        
      </div>
      {urlId ?<h2 className='preview'>{props.title}</h2>:null}
      
      {urlId && <Youtube opts={opts} videoId={urlId.key} className='yt'/>}
    
      
    </div>
    
    
        
   
    
 
    
   
    
    
    



  )
}

export default Banner