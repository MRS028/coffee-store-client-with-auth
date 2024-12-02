import { useLoaderData } from "react-router-dom"
import CoffeeCard from "./components/CoffeeCard";
import { useState } from "react";

function App() {
  const loadedCoffees = useLoaderData();
  const [coffees,setCoffees] = useState(loadedCoffees);


  return (
    <>
     
      <div className="text-center my-10">
      <h1 className="text-5xl">Hot Cold Coffee:{coffees.length}</h1>
      <div className="grid md:grid-cols-2 gap-5   w-11/12 mx-auto my-20">
      {
        coffees.map(coffee =><CoffeeCard key={coffee._id}  coffee={coffee} coffees={coffees} setCoffees = {setCoffees}></CoffeeCard>)
      }
      </div>
      
      </div>
      
    </>
  )
}

export default App
