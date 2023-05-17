import React from 'react';
import Habit from '../Habit/Habit';
import Navigation from '../Navigation/Navigation';
import "./Today.css";

const Today  = () => {

  const habits = [
    { id: 1, title: 'Mental', options: ['Meditate', 'Say Graditudes', 'Practice New Skill', 'Other'] },
    { id: 2, title: 'Exercise', options: ['Take A Walk', 'Go to the Gym', 'Dance', 'Other'] },
    { id: 3, title: 'Nutrition', options: ['Drink Water', 'Eat Your Veggies', 'Treat Yourself', 'Other'] },
    { id: 4, title: 'Entertainment', options: ['Read A Chapter', 'Watch A New Movie', 'Listen to a Podcast', 'Other'] }
  ];

  return (
    <div>
      <Navigation />
      <section className="today-main">
        <div className="today-container">
          {habits.map((habit, index) => (
            <Habit key={index} title={habit.title} options={habit.options} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Today;
