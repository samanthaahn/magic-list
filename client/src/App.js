import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Login from "./components/Login";
import Today from "./components/Today/Today.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [route, setRoute] = React.useState(window.location.pathname);
  const client = new ApolloClient({
    uri: "/graphql",
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
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/week" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/today" element={<Today />} />
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;