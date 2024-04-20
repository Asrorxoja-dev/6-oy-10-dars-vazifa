import { useEffect, useState } from "react"
import RecipiesList from "../components/RecipiesList";


function Home() {
  const [recipies, setResipies] = useState(null)
useEffect(()=>{
  fetch('http://localhost:3000/recipies')
  .then((data)=>{
    return data.json();
  })
  .then((recipies)=>{
    setResipies(recipies);
  })
  .catch((err)=>{
    console.log(err);
  })
},[])

  return (
   <div>
    <h1 className="text-3xl font-bold mb-10">Recipies</h1>
  {recipies && <RecipiesList recipies={recipies}/>}
   </div>
   
   
  )
}

export default Home