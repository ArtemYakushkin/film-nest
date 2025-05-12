import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import ActorPage from "./pages/ActorPage";
import SearchPage from "./pages/SearchPage";
import GenrePage from "./pages/GenrePage";
import TrendingPage from "./pages/TrendingPage";
import TopPage from "./pages/TopPage";
import UpcomingPage from "./pages/UpcomingPage";
import PopularActorsPage from "./pages/PopularActorsPage";
import SavedPage from "./pages/SavedPage";
import NewsPage from "./pages/NewsPage";
import ReleaseCalendarPage from "./pages/ReleaseCalendarPage";

function App() {
  return (
    <Router>
        <div className="container" style={{position: "relative"}}>
          <Sidebar />
        </div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/actor/:id" element={<ActorPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/genre/:genreId" element={<GenrePage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/top-rated" element={<TopPage />} />
          <Route path="/upcoming" element={<UpcomingPage />} />
          <Route path="/popular-actors" element={<PopularActorsPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/calendar" element={<ReleaseCalendarPage />} />
        </Routes>
      </Router>
  );
}

export default App;
