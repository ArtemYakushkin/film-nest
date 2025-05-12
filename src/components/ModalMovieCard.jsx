import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // только один раз в приложении

const ModalMovieCard = ({ isOpen, onRequestClose, movie }) => {
  if (!movie) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <div className="modal-top">
          <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
          <a href={`/movie/${movie.id}`} className="button-see-more">
            See more
          </a>
        </div>

        <h2>{movie.title}</h2>
        <p>{movie.overview || "Description is missing."}</p>
      </div>
    </Modal>
  );
};

export default ModalMovieCard;
