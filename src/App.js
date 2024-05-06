import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
import "./App.css";
import "./reset.css";
import "./style.css";
import MainPage from "./Pages/Main";
import WatchList from "./Pages/WatchList";
import DetailsPage from "./Pages/Details";
import Header from "./components/Header";
import SearchPage from "./Pages/Search";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/my-watch-list" element={<WatchList />} />
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
