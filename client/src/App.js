import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Week from "./components/Week/Week.js";
import Today from "./components/Today/Today.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Diary from "./components/Diary";
import MyCalendar from "./components/calendar/calendar";
// import Today from "./components/today";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [route, setRoute] = React.useState(window.location.pathname);
  const httpLink = createHttpLink({
    uri: '/graphql',
  });
  
  // Construct request middleware that will attach the JWT token to every request as an `authorization` header
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  const client = new ApolloClient({
    // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  React.useEffect(() => {
    const handleRouteChange = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <ApolloProvider client={client}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/diary" element={<Diary />} />
              <Route path="/week" element={<Week />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/today" element={<Today />} />
              <Route path="/calendar" element={<MyCalendar />} />
            </Routes>
          </Router>
        </ApolloProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
