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

// XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX XXX 

// import React, { useEffect, useState } from 'react';
// import './Today.css';
// import Navigation from '../Navigation/Navigation';
// import Habit from '../Habit/Habit';
// import { useMutation, useQuery } from '@apollo/client';
// import { QUERY_ME } from '../../utils/queries';
// import { ADD_HABIT } from '../../utils/mutations';

// const Today = () => {
//   const habits = [
//     { id: 1, title: 'Mental', options: ['Meditate', 'Say Gratitude', 'Practice New Skill', 'Other'] },
//     { id: 2, title: 'Exercise', options: ['Take A Walk', 'Go to the Gym', 'Dance', 'Other'] },
//     { id: 3, title: 'Nutrition', options: ['Drink Water', 'Eat Your Veggies', 'Treat Yourself', 'Other'] },
//     { id: 4, title: 'Entertainment', options: ['Read A Chapter', 'Watch A New Movie', 'Listen to a Podcast', 'Other'] }
//   ];

//   const [habitText, setHabitText] = useState('');

//   const { loading, data } = useQuery(QUERY_ME);
//   const habitsData = data?.me || {};

//   const [addHabit] = useMutation(ADD_HABIT);

//   useEffect(() => {
//     console.log(habitsData);
//   }, [data]);

//   const handleHabitSubmit = (e) => {
//     e.preventDefault();
//     if (habitText.trim() === '') {
//       return;
//     }

//     addHabit({
//       variables: { habitText },
//     });

//     setHabitText('');
//   };

//   const storeEntry = async () => {
//     try {
//       const { data } = await addHabit({
//         variables: { habitText },
//       });
//       window.location.reload();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <Navigation />
//       <section className="today-main">
//         <div className="today-container">
//           {habits.map((habit) => (
//             <Habit key={habit.id} title={habit.title} options={habit.options} />
//           ))}
//           <form className="habit-form" onSubmit={handleHabitSubmit}>
//             <input
//               type="text"
//               placeholder="Add Custom Habit"
//               value={habitText}
//               onChange={(e) => setHabitText(e.target.value)}
//             />
//             <button type="submit">Add</button>
//           </form>
//           {loading && <p>Loading...</p>}
//           <button onClick={storeEntry}>Store Entry</button>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Today;
