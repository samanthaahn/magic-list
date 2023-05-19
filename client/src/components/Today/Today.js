import React, { useState, useEffect } from 'react';
import Habit from '../Habit/Habit';
import Navigation from '../Navigation/Navigation';
import "./Today.css";
import { QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_HABIT } from '../../utils/mutations';

const Today = () => {
  const [habits, setHabits] = useState([
    { id: 1, title: 'Mental', options: ['Meditate', 'Say Gratitude', 'Practice New Skill', 'Other'] },
    { id: 2, title: 'Exercise', options: ['Take A Walk', 'Go to the Gym', 'Dance', 'Other'] },
    { id: 3, title: 'Nutrition', options: ['Drink Water', 'Eat Your Veggies', 'Treat Yourself', 'Other'] },
    { id: 4, title: 'Entertainment', options: ['Read A Chapter', 'Watch A New Movie', 'Listen to a Podcast', 'Other'] }
  ]);

  // Query call here
  const { loading, data } = useQuery(QUERY_ME);
  const habitsData = data?.me.habits || [];

  // Mutation example
  const [updateHabitMutation] = useMutation(ADD_HABIT);

  // Take habits array and add the property of habitText
  useEffect(() => {
    if (habitsData.length) {
      setHabits(prevHabits =>
        prevHabits.map(habit => {
          const habitData = habitsData.find(item => item.category === habit.title);
          return habitData ? { ...habit, habitText: habitData.habitText } : habit;
        })
      );
    }
  }, [habitsData]);

  return (
    <div>
      <Navigation />
      <section className="today-main">
        <div className="today-container">
          {loading ? (
            <div>Loading...</div>
          ) : (
            habits.map((habit, index) => (
              // Pass another prop for habitText 
              <Habit
                key={index}
                title={habit.title}
                options={habit.options}
                habitText={habit.habitText}
                updateHabit={updateHabitMutation} // Pass the mutation function as a prop
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Today;
