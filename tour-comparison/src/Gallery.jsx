import React, { useState, useEffect } from "react";

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://course-api.com/react-tours-project");
      if (!response.ok) throw new Error("Failed to fetch tours.");
      const data = await response.json();
      setTours(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  const toggleReadMore = (id) => {
    setTours((prevTours) =>
      prevTours.map((tour) =>
        tour.id === id ? { ...tour, showMore: !tour.showMore } : tour
      )
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (tours.length === 0)
    return (
      <div>
        <h2>No Tours Left</h2>
        <button onClick={fetchTours}>Refresh</button>
      </div>
    );

  return (
    <div className="gallery">
      {tours.map((tour) => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} />
          <div className="tour-info">
            <h2>{tour.name}</h2>
            <p className="tour-price">${tour.price}</p>
            <p className="tour-description">
              {tour.showMore ? tour.info : `${tour.info.substring(0, 100)}...`}
              <button onClick={() => toggleReadMore(tour.id)}>
                {tour.showMore ? "Show Less" : "Read More"}
              </button>
            </p>
            <button onClick={() => removeTour(tour.id)} className="not-interested">
              Not Interested
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;