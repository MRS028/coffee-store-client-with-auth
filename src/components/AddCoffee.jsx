import React from "react";
import Swal from 'sweetalert2'
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
const AddCoffee = () => {

    const handleAddCoffe= e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const price = form.price.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photourl = form.photourl.value;

        const newCoffee = {name,quantity,supplier,taste,category,details,photourl};

        // console.log(newCoffee)

        // Send data to the server
        fetch('http://localhost:5000/coffee',{
            method:'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(newCoffee)
        })
        .then(res=> res.json())
        .then(data =>{
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: 'Coffee Added Succesfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })

                  e.target.reset();

            }
        })


        
    
      }


  return (
    <div className="min-h-screen  flex items-center justify-center p-5 ">
      <div className=" shadow-lg rounded-lg p-5 max-w-3xl w-full bg-[#F4F3F0]">
        <Link to="/" className="text-xl font-semibold mb-4 flex ">
        <FaArrowLeft className="my-[.4rem]" /> Back to home
        </Link>
        <h2 className="text-3xl font-bold text-center mb-4 ">Add New Coffee</h2>
        <p className="text-gray-600 text-center mb-6 opacity-70">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here.
        </p>
        
        <form onSubmit={handleAddCoffe} className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5">
          {/* Coffee Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter coffee name"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="chef">
            Price
            </label>
            <input
              id="chef"
              name="price"
              type="text"
              placeholder="Enter quantity"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Supplier */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="supplier"
            >
              Supplier
            </label>
            <input
            name="supplier"
              id="supplier"
              type="text"
              placeholder="Enter coffee supplier"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Taste */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="taste"
            >
              Taste
            </label>
            <input
            name="taste"
              id="taste"
              type="text"
              placeholder="Enter coffee taste"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Category */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="category"
            >
              Category
            </label>
            <input
            name="category"
              id="category"
              type="text"
              placeholder="Enter coffee category"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Details */}
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="details"
            >
              Details
            </label>
            <input
            name="details"
              id="details"
              type="text"
              placeholder="Enter coffee details"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Photo URL */}
          <div className="col-span-1 md:col-span-2">
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="photo"
            >
              Photo
            </label>
            <input
            name="photourl"
              id="photo"
              type="text"
              placeholder="Enter photo URL"
              className="w-full border-2 rounded-md shadow-sm p-2"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-[#331A15] text-white py-2 rounded-md hover:bg-yellow-600 transition"
            >
              Add Coffee
            </button>
          </div>
        </form>

        
      </div>
    </div>
  );
};

export default AddCoffee;
