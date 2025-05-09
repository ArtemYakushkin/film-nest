import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useActorStore } from "../store/actorStore";

import Spinner from "../components/Spinner";
import ButtonMore from "../components/ButtonMore";
import MovieCard from "../components/MovieCard";

const ActorPage = () => {
  const { id } = useParams();
  const { actor, credits, fetchActorData } = useActorStore();

  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchActorData(id);
    setVisibleCount(10);
  }, [id, fetchActorData]);

  if (!actor) return <Spinner />;

  const visibleCredits = credits.slice(0, visibleCount);
  const handleLoadMore = () => setVisibleCount((prev) => prev + 10);

  return (
    <div className="section">
      <div className="container">
        <div className="wrapp">
          <div className="actor-frame">
            <img
              className="actor-poster"
              src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
              alt={actor.name}
            />
            <div className="actor-info">
              <h1 className="actor-title">{actor.name}</h1>

              {actor.birthday && (
                <p className="actor-text">
                  <span>Birthday: </span> {actor.birthday.split("-").reverse().join(".")}
                </p>
              )}

              {actor.place_of_birth && (
                <p className="actor-text">
                  <span>Place of Birth: </span> {actor.place_of_birth}
                </p>
              )}
              <p className="actor-text">
                <span>Known for: </span> {actor.known_for_department}
              </p>
              <p className="actor-text">{actor.biography || "No biography available."}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="gorizontal-line">
        <div></div>
      </div>

      <div className="container">
        <div className="wrapp">
          <div className="actor-credits">
            <h2 className="subtitle">Known For</h2>
            <div className="grid-list">
              {visibleCredits.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  posterPath={movie.poster_path}
                  rating={movie.vote_average}
                />
              ))}
            </div>
            <div className="actor-btn-more">
              {visibleCount < credits.length && <ButtonMore onClick={handleLoadMore} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActorPage;
