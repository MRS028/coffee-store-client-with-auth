import React, { useRef, useState } from 'react';
import Swal from 'sweetalert2';

import { Link, useNavigate, useLoaderData, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const UpdateCoffee = () => {
  // Get coffee data from loader
  const coffee = useLoaderData();
  const { id } = useParams(); // Get dynamic ID from URL
  const formRef = useRef(null); // Form reference
  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation

  const { _id, name, quantity, supplier, taste, category, details, photourl } = coffee;

  const [loading, setLoading] = useState(false);

  const handleUpdateCoffee = (event) => {
    event.preventDefault();
    setLoading(true);

    const newCoffee = {
      name: event.target.name.value,
      quantity: event.target.quantity.value,
      supplier: event.target.supplier.value,
      taste: event.target.taste.value,
      category: event.target.category.value,
      details: event.target.details.value,
      photourl: event.target.photourl.value,
    };

    fetch(`http://localhost:5000/coffee/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Coffee updated successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
          navigate("/"); // Programmatically navigate to home
        } else {
          Swal.fire("No update happened");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error updating the coffee.',
          icon: 'error',
          confirmButtonText: 'Okay',
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="shadow-lg rounded-lg p-5 max-w-3xl w-full bg-[#F4F3F0]">
        <Link to="/" className="text-xl font-semibold mb-4 flex">
          <FaArrowLeft className="my-[.4rem]" /> Back to home
        </Link>
        <h2 className="text-3xl font-bold text-center mb-4">Update Coffee</h2>
        <form ref={formRef} onSubmit={handleUpdateCoffee} className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5">
          {/* Coffee Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              defaultValue={name}
              type="text"
              name="name"
              placeholder="Enter coffee name"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="quantity">
              Quantity
            </label>
            <input
              id="quantity"
              name="quantity"
              defaultValue={quantity}
              type="text"
              placeholder="Enter quantity"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Supplier */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="supplier">
              Supplier
            </label>
            <input
              id="supplier"
              name="supplier"
              defaultValue={supplier}
              type="text"
              placeholder="Enter coffee supplier"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Taste */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="taste">
              Taste
            </label>
            <input
              id="taste"
              name="taste"
              defaultValue={taste}
              type="text"
              placeholder="Enter coffee taste"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="category">
              Category
            </label>
            <input
              id="category"
              name="category"
              defaultValue={category}
              type="text"
              placeholder="Enter coffee category"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="details">
              Details
            </label>
            <input
              id="details"
              name="details"
              defaultValue={details}
              type="text"
              placeholder="Enter coffee details"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Photo URL */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1" htmlFor="photourl">
              Photo URL
            </label>
            <input
              id="photourl"
              name="photourl"
              defaultValue={photourl}
              type="text"
              placeholder="Enter coffee photo URL"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-[#331A15] text-white py-2 rounded-md hover:bg-yellow-600 transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Coffee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoffee;
