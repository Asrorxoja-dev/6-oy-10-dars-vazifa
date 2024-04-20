import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function SingleResipie() {
  const {id} = useParams();

  const [recipie, setResipie] = useState()
  useEffect(()=>{
    fetch(`http://localhost:3000/recipies/${id}`)
    .then((data)=>{
      return data.json();
    })
    .then((recipies)=>{
      setResipie(recipies);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[id])

  return (
    <div>
     {recipie && (
      <div className="object-cover rounded bg-slate-100 p-5 mb-10">
        <img src={recipie.Image} alt="" className="w-full h-80 object-cover rounded mb-5" />
        <h1 className="text-4xl mb-5">Nomi: {recipie.title}</h1>
        <h2 className="mb-5 text-2xl letter">Tarkibi: {recipie.ingredients} </h2>
        <h3 className="text-2xl mb-5">Pishirilish vaqti: {recipie.cookingTime}</h3>
        <h3 className="text-2xl mb-5">Bajarilishi: {recipie.method}</h3>
        <Link className="bg-red-500 p-2  text-white flex justify-center mx-auto w-20 rounded px-4" to={'/'}>Back</Link>
      </div>
     )}
      
    </div>
  )
}

export default SingleResipie