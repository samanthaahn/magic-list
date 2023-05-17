import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Project from './Project/Project.js';
import prj1 from '../../images/month.jpg';
import prj2 from '../../images/today.jpg';
import prj3 from '../../images/week.jpg';
import prj4 from '../../images/diary.jpg';
import './Dashboard.css'; // import the CSS file

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
      <section className="portfolio">
        <h2>Welcome to the Dashboard!</h2>
        <div className="projects-container">
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
