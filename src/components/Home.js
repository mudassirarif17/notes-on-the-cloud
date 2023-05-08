import React , {useEffect} from 'react'
import Addnote from "../components/Addnote"
import Notes from "../components/Notes"
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate ();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/');
    }
    else{
      navigate('/signin');
    }
  })

  return (
    <div>
      <Addnote/>
      <Notes/>
    </div>
  )
}

export default Home
