import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'
import Login from "./components/Login";
import Week from "./components/Week";
import Header from "./components/Header";
import Footer from "./components/Footer";
//import Dashboard from "./components/Dashboard/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
})

function App() {
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
