import React from 'react';
import Habit from '../Habit/Habit';
import Navigation from '../Navigation/Navigation';
import "./Today.css";

const Today  = () => {

  const habits = [
    { id: 1, title: 'Habit 1' },
    { id: 2, title: 'Habit 2' },
    { id: 3, title: 'Habit 3' },
    { id: 3, title: 'Habit 3' }
  ];

  return (
    <div>
      <Navigation />
      <section className="portfolio">
        <div className="projects-container">
          {habits.map((habit, index) => (
            <Habit key={index} {...habit} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Today;