import api from '../lib/axios.js';
import { ArrowLeftIcon } from 'lucide-react';
import React from 'react'
import { useState } from "react"
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(title , content); we dont neeed this we want to have some action
    if(!title.trim() || !content.trim()){
      toast.error("All fields are Required");
    return;
    }
    setLoading(true); // means button becomes creating... and disabled preventing double click
    try{
      await api.post("/notes", {title,content}) // used axios and sent title and content from frontEnd->backEnd(Database)
      toast.success("Note created Successfully");
      // as soon as note is created show homepage using navigate hook and new note appears there
      navigate("/") 
    }
    catch(error){
      console.log("Error creating notes",error)
      // rate limit if there is abuse
      if(error.response.status=== 429){
        toast.error("SLOW DOWN! You're creating notes too fast",{
          duration:4000,
          icon:"🫤",
        })
      }
      else{
        toast.error("Failed to create note");
      }
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto' >
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className='size-5' />
            Back to Notes
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'> Create New Note</h2>

              <form onSubmit={handleSubmit} >
                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text text-lg'>Title</span>
                  </label>
                  <input type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text text-lg'>Content</span>
                  </label>
                  <textarea
                  placeholder="Write your note here..."
                  className='textarea textarea-bordered h-32'
                  value={content}
                  onChange={(e)=>setContent(e.target.value)}
                  />
                </div>
                
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." :"Create Note"}
                  </button> 
                </div>
              </form>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage