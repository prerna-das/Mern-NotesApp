import  {PlusIcon} from 'lucide-react';
import { Link } from 'react-router';
import React from 'react'

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10  ">
        <div className="mx-auto p-4 m-0 max-w-6xl">
            <div className='flex justify-between items-center'>
                <h1 className="text-3xl font-bold font-mono text-cyan-500 tracking-tight">ThinkBoard</h1>
                <div className="flex items-center gap-4">
                    <Link to={"/create"} className="btn btn-primary">
                    <PlusIcon className='size-5'/>
                    <span>New Note</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Navbar