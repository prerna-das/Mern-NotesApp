import Navbar from '../component/Navbar.jsx'
import RateLimitedUI  from '../component/RateLimitedUI';
import { useState,useEffect } from 'react';
import api from "../lib/axios.js"
import { toast } from 'react-hot-toast';
import NoteCard from '../component/NoteCard.jsx';
import NotesNotFound from '../component/NotesNotFound.jsx';

const Homepage = () => {
  const [isRateLimited,setIsRateLimited] = useState(false);// boolean 
  const [notes,setNotes]=useState([]);// to store notes
  const [loading,setLoading]=useState(true); // to show if req is already sent or not

  useEffect(()=>{
    async function fetchNotes(){
      try{
        const res= await api.get("/notes");
        console.log(res.data); // .data is the attribute that stores the notes we want in res object
        setNotes(res.data);// stores notes in state
        setIsRateLimited(false);
      }
      catch(error){
        console.log("Error fetching notes");
        console.log(error);
        if(error.response?.status === 429)
        {
          setIsRateLimited(true);// rate limit reached
        }
        else{
          toast.error("Failed to load notes")
        }
        }
        finally{
          setLoading(false);// runs for all cases (success or error
        }
      }
    fetchNotes();
  },[])


  return (
    <div className="min-h-screen">
      <Navbar/>

      {isRateLimited && <RateLimitedUI/>} 
      {/* if rate limited then show rate limites ui */}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className='text-center text-cyan-500 py-10'>Loading notes...</div>}
        {notes.length === 0 && !isRateLimited && <NotesNotFound/>}
        {notes.length>0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note)=>(
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          
          
          </div> 
        )} 
      </div>
    </div>
  )
}

export default Homepage