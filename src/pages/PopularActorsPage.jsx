import React, { useEffect } from "react";

import { useActorStore } from "../store/actorStore";

import Spinner from "../components/Spinner";
import ActorCard from "../components/ActorCard";

const PopularActorsPage = () => {
  const { popularActors, fetchPopularActors, loading, error } = useActorStore();

  useEffect(() => {
    fetchPopularActors();
  }, [fetchPopularActors]);

  if (loading) return <Spinner />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!Array.isArray(popularActors)) return null;

  return (
    <div className="section">
      <div className="container">
        <div className="wrapp">
          <h2 className="subtitle">Popular Actors</h2>
          <ul className="actor-list">
            {popularActors.map((actor) => (
              <ActorCard
                key={actor.id}
                id={actor.id}
                name={actor.name}
                photo={actor.profile_path}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PopularActorsPage;
