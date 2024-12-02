import React, { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const Users = () => {
    const loadedUsers = useLoaderData();
    const [users,setUsers] = useState(loadedUsers);

    const handleUserDlete = id =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              
            //   deleted from database
            fetch(`http://localhost:5000/users/${id}`,{
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data=>{
                if(data.deletedCount){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                      const remainingUsers = users.filter(user =>user._id !== id);
                      setUsers(remainingUsers);
                }
                console.log('Delete successful',data);
            })




            }
          });

    } 

    return (
        <div className='text-center my-5 w-11/12 mx-auto '>
            <h2 className='text-2xl font-semibold underline '>Total Users: {users.length}</h2>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr className='font-semibold text-xl'>
        <th>No</th>
        <th>Name</th>
        <th>Email</th>
        <th>Created Time</th>
        <th>Last Login</th>
        <th>  <span className='px-6'>Action</span></th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        users.map((user,index)=>
        <tr key={user._id}>
        <th>{index+1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {
            user && user?.createdAt ? <td>{user.createdAt}</td> : <td> None </td>
        }
        <td>{user.lastSignInTime}</td>
        <td >
            <div className='flex gap-2'>
            <button className='btn'><FaPen size={16} /></button>
            <button
            onClick={(id)=>handleUserDlete(user._id)}
             className='btn'><FaTrash size={16} /></button>

            </div>
            
        </td>
        
      </tr>
        )
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Users;