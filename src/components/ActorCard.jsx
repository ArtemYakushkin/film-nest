import React from "react";
import { Link } from "react-router-dom";

import NoPhoto from "../assets/No photo.jpg";

const ActorCard = ({ id, name, photo }) => {
  return (
    <Link to={`/actor/${id}`} className="actor-card">
      <img src={photo ? `https://image.tmdb.org/t/p/w200${photo}` : `${NoPhoto}`} alt={name} />
      <p>{name}</p>
    </Link>
  );
};

export default ActorCard;
