import React from 'react';
import Habit from '../Habit/Habit';
import Navigation from '../Navigation/Navigation';
import "./Today.css";

const Today  = () => {

  const habits = [
    { id: 1, title: 'Mental' },
    { id: 2, title: 'Exercise' },
    { id: 3, title: 'Nutrition' },
    { id: 4, title: 'Entertainment' }
  ];

  return (
    <div>
      <Navigation />
      <section className="today-main">
        <div className="today-container">
          {habits.map((habit, index) => (
            <Habit key={index} {...habit} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Today;
