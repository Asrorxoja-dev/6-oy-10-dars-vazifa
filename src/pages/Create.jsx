import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Create() {
  const navigate = useNavigate()
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [Image, setImage] = useState('')


  const addIngredient = (e)=>{
   
  if(ingredient.trim()){
    if(!ingredients.includes(ingredient)){
      setIngredients((prev)=>{
       return [...prev, ingredient]
      })
      toast.success("Item added Successfully")

       }else{
         toast.error("This item already added")
       }
  }else{
    toast.error("please write something")
  }


    setIngredient('')
  }

  const handleSubmit = (e) =>{
  e.preventDefault();


  const newRecipe = {
    title,
    cookingTime: `${cookingTime} minutes`,
    method,
    Image,
    ingredients: `${ingredients}`
  };

  fetch("http://localhost:3000/recipies", {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipe),
  })
  .then(()=>navigate("/"))
  
 .catch((error)=>{
  console.log(error);
 })
  

  }


  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-10 ">
        Create New Recipies
      </h1>

      <form  className="flex items-center flex-col gap-5">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Ingredients</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e)=> setIngredient(e.target.value)}
              value={ingredient}
            />
            <button type="button" onClick={addIngredient} className="btn btn-secondary">Add</button>
          </div>
          <div className="mt-1">
            <p>Ingredients: {""}
            {ingredients.map((ing)=>{
           return <span key={ing}>{ing} {" "} </span>
            })}
            </p>
           </div>
        </label>
        

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Cooking time</span>
          </div>
          <input
            type="number"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={cookingTime}
            onChange={(e)=>setCookingTime(e.target.value)}
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Image URL:</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={Image}
            onChange={(e)=>setImage(e.target.value)}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Method</span>
          </div>
          <textarea
            className="textarea textarea-bordered w-80 h-24"
            placeholder="Bio"
            value={method}
            onChange={(e)=>setMethod(e.target.value)}
          ></textarea>
        </label>

        <button onClick={handleSubmit} type="button" className="btn btn-primary w-full max-w-xs mb-10">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
