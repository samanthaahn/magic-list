import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Login from "./components/Login";
import Week from "./components/Week";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [route, setRoute] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handleRouteChange = () => {
      setRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);

    const client = new ApolloClient({
      uri: "/graphql",
      cache: new InMemoryCache(),
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/week" element={<Week />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
