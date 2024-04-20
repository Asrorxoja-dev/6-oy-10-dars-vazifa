import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
function RecipiesList({ recipies}) {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipies);
  }, [recipies]);

  const deleteItem = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:3000/recipies/" + id, {
        method: "DELETE"
      })
        .then((response) => response.json())
        .then(() => {
          setRecipes(prevRecipes => {
            return prevRecipes.filter(recipe => recipe.id !== id);
          });
        })
        .catch((error) => {
          console.log("Error deleting recipe:", error);
        });
    }
  };
  



  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
      {recipies.map((recipie) => {
        return (
          <div key={recipie.id} className="card w-100 bg-base-100 shadow-xl">
            <figure>
              <img src={recipie.Image} className=":md-h-auto h-[200px] w-full object-cover" alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{recipie.title}</h2>
              <p className="line-clamp-3">{recipie.method} </p>
              <div className="card-actions mt-3">
                <Link
                  to={`/singleResipie/${recipie.id}`}
                  className="btn btn-primary w-full max-w-36 "
                >
                  Read More
                </Link>
                
                <button type="button" onClick={() => deleteItem(recipie.id)} className="btn bg-red-500 text-cyan-50 hover:bg-red-600 w-full max-w-36">Delete</button>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RecipiesList;
