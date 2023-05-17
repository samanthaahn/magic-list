import React from 'react';
import Habit from '../Habit/Habit';
import Navigation from '../Navigation/Navigation';
import "./Week.css";

const Week  = () => {

  const habits = [
    { id: 1, title: 'What is your goal for this week?', options: ['Mental', 'Excercise', 'Nutritional', 'Enterainment', 'Other'] },
    { id: 2, title: 'Would you like to add a second goal?', options: ['Mental', 'Excercise', 'Nutritional', 'Enterainment', 'Other'] }
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

export default Week;
