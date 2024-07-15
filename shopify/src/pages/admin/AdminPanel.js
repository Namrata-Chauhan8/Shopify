import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import "../../App.css";
import { Link, Outlet } from 'react-router-dom';

const AdminPanel = () => {
    const user = useSelector((state) => state?.user?.user);

    const [menuDisplay, setMenuDisplay] = useState(false);

  return (
    <div className='min-h-[calc(100vh-200px)] lg:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
            <div className='h-32 flex justify-center items-center flex-col'>
                <div className='text-5xl cursor-pointer relative flex justify-center' onClick={()=>{
                    setMenuDisplay((prev) => !prev)
                }}>
                    {user?.profilePhoto ? (
                        <img
                            src={user?.profilePhoto}
                            alt="profile"
                            className="h-10 w-10 rounded-full"
                        />
                    ):(
                        <FaUserCircle />
                    )}
                </div>
            <p className='capitalize text-lg font-semibold'>{user?.username}</p>
            <p className='capitalize text-md'>{user?.role}</p>
            </div>
            <div>
                <nav className='grid p-4'>
                    <Link to={'allUsers'} className="px-2 py-1 hover:bg-slate-100">All Users</Link>
                    <Link to={'uploadProducts'} className="px-2 py-1 hover:bg-slate-100">Upload Products</Link>
                </nav>
            </div>
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet />
        </main>
    </div>
  )
}

export default AdminPanel
