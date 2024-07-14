import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import './App.css';

const App = () => {
  const [dishes, setDishes] = useState([]);
  const [highlightedDish, setHighlightedDish] = useState(null);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dishes');
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishes();

    const socket = io('http://localhost:5000');

    socket.on('updateDish', (updatedDish) => {
      console.log(`Dish updated: ${JSON.stringify(updatedDish)}`);
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === updatedDish.dishId ? updatedDish : dish
        )
      );
      setHighlightedDish(updatedDish.dishId);
      setTimeout(() => setHighlightedDish(null), 2000);
    });

    socket.on('newDish', (newDish) => {
      console.log(`New dish added: ${JSON.stringify(newDish)}`);
      setDishes((prevDishes) => [...prevDishes, newDish]);
      setHighlightedDish(newDish.dishId);
      setTimeout(() => setHighlightedDish(null), 2000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const togglePublished = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5000/api/dishes/${id}/toggle`);
      console.log(`Toggled dish: ${JSON.stringify(response.data)}`);
      setDishes((prevDishes) =>
        prevDishes.map((dish) =>
          dish.dishId === response.data.dishId ? response.data : dish
        )
      );
    } catch (error) {
      console.error('Error toggling published status:', error);
    }
  };

  return (
    <div>
      <header>
        <h1>Dishes Dashboard</h1>
      </header>
      <main>
        <div className="dishes-container">
          {dishes.map((dish) => (
            <div
              key={dish.dishId}
              className={`dish-card ${highlightedDish === dish.dishId ? 'highlight' : ''}`}
            >
              <img src={dish.imageUrl} alt={dish.dishName} />
              <h2>{dish.dishName}</h2>
              <p>Published: {dish.isPublished.toString()}</p>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={dish.isPublished}
                  onChange={() => togglePublished(dish.dishId)}
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
