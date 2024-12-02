import React from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa"; 
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee,coffees,setCoffees }) => {
    const { _id, name, quantity, supplier, photourl } = coffee;

    const handleDelete = (_id) => {
        // console.log("Deleting ID:", _id); // Debug log
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/coffee/${_id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log("Delete Response:", data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Coffee has been deleted.",
                                icon: "success",
                            })
                            const remaining = coffees.filter(cof => cof._id !== _id);
                            setCoffees(remaining);
                        } else {
                            Swal.fire("Error", "Failed to delete the item", "error");
                        }
                    })
                    .catch((err) => console.error("Error:", err));
            }
        });
    };

    return (
        <div className="card card-side shadow-xl p-4 bg-[#F5F4F1]">
            <figure>
                <img
                    src={photourl}
                    alt={name}
                    className="rounded-lg object-cover"
                />
            </figure>

            {/* Coffee Details */}
            <div className="flex justify-between w-full my-10">
                <div className="pt-6">
                    <h3 className="card-title text-lg font-semibold text-gray-800">
                        Name: {name}
                    </h3>
                    <p className="text-gray-600">Chef: {supplier}</p>
                    <p className="text-gray-600">Price: {quantity} Taka</p>
                </div>

                {/* Action Buttons */}
                <div className="join join-vertical space-y-4">
                    <button
                        className="bg-yellow-400 join-item hover:bg-yellow-500 text-white btn"
                        title="View"
                    >
                        <FaEye size={16} />
                    </button>
                    <Link to={`updateCoffee/${_id}`}>
                    <button
                        className="bg-gray-600 join-item hover:bg-gray-700 text-white btn"
                        title="Edit"
                    >
                        <FaPen size={16} />
                    </button>
                    </Link>
                    <button
                        onClick={() => handleDelete(_id)}
                        className="bg-red-500 join-item hover:bg-red-600 text-white btn"
                        title="Delete"
                    >
                        <FaTrash size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeCard;
