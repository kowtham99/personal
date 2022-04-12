import classes from "./Avalaible.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import React, { useState, useEffect } from "react";

const Avalaible = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);

  const fetchMealsHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://foodorder-5c7d1-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      const loadedMeals = [];

      for (const meal in data) {
        loadedMeals.push({
          id: meal,
          description: data[meal].description,
          name: data[meal].name,
          price: data[meal].price,
        });
      }
      setError(false);
      setMeals(loadedMeals);
      console.log(loadedMeals);
    } catch (err) {
      setError(err.message || " Something Went Wrong !");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchMealsHandler();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && !error && <ul>{mealsList}</ul>}
        {isLoading && <h3>Loading...</h3>}
        {error && <p>{error}</p>}
      </Card>
    </section>
  );
};

export default Avalaible;
