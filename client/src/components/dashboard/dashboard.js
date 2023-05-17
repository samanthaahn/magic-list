import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Project from './Project/Project.js';
import prj1 from '../../images/calendar1.png';
import prj2 from '../../images/today3.png';
import prj3 from '../../images/week4.png';
import prj4 from '../../images/diary3.jpg';
import './dashboard.css'; // import the CSS file

const Dashboard = () => {
  const projects = [
    { title: 'Calendar', imageUrl: prj1, route: "/calendar" },
    { title: 'Daily Goals', imageUrl: prj2, route: "/today" },
    { title: 'This Week', imageUrl: prj3, route: "/week" },
    { title: 'Diary', imageUrl: prj4, route: "/diary" },
  ];

  return (
    <div className="dashboard">
      <Navigation />
      <section className="portfolio container text-center">
        <h2>Welcome to the Dashboard!</h2>
        <div className="projects-container container grid grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <Link to={project.route} key={index}>
              <Project title={project.title} imageUrl={project.imageUrl} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
