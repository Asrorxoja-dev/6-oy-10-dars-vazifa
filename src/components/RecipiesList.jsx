import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function RecipiesList({ recipies }) {
  const [recipes, setRecipes] = useState(recipies);

  useEffect(() => {
    setRecipes(recipies);
  }, [recipies]);

  const deleteItem = (id) => {
    if (window.confirm("Do you want to delete this recipe ?")) {
      fetch("http://localhost:3000/recipies/" + id, {
        method: "DELETE",
      })
        .then(() => {
          // Yangilangan recipes ro'yxatini o'rnatish
          setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
        })
        .catch((error) => {
          console.error("Error deleting recipe:", error);
        });
    }
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card w-100 bg-base-100 shadow-xl">
          <figure>
            <img
              src={recipe.Image}
              className=":md-h-auto h-[200px] w-full object-cover"
              alt="food image"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{recipe.title}</h2>
            <p className="line-clamp-3">{recipe.method}</p>
            <div className="card-actions mt-3">
              <Link
                to={`/singleResipie/${recipe.id}`}
                className="btn btn-primary w-full max-w-36"
              >
                Read More
              </Link>

              <button
                type="button"
                onClick={() => deleteItem(recipe.id)}
                className="btn bg-red-500 text-cyan-50 hover:bg-red-600 w-full max-w-36"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipiesList;
