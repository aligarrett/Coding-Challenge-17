// Task 2: Tour List Component

import React, { useState, useEffect } from "react";

const Gallery = () => {
  const [tours, setTours] = useState([]); // State to store the list of tours
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to store error messages

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch("/api/react-tours-project"); // Proxy the request to bypass CORS issues
        if (!response.ok) {
          throw new Error("Failed to fetch tours"); // Error handling for failed responses
        }
        const data = await response.json(); // Parse the JSON response
        setTours(data); // Update state with the fetched tour data
        setLoading(false); // Turn off the loading indicator
      } catch (err) {
        setError(err.message); // Save the error message in state
        setLoading(false); // Ensure loading is turned off even after failure
      }
    };

    fetchTours(); // Trigger the async fetch function
  }, []); // Dependency array ensures this only runs once on mount

  const removeTour = (id) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id)); // Remove the tour with the specified ID
  };

  if (loading) return <p>Loading...</p>; // Show a loading message while fetching
  if (error) return <p>Error: {error}</p>; // Show an error message if fetching fails

  return (
    <div className="gallery">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} removeTour={removeTour} /> // Render individual tour cards
      ))}
    </div>
  );
};

const TourCard = ({ tour, removeTour }) => {
  const [showMore, setShowMore] = useState(false); // Toggle for showing more/less of the description

  return (
    <div className="tour-card">
      <img src={tour.image} alt={tour.name} />
      <h2>{tour.name}</h2>
      <p className="tour-price">${tour.price}</p>
      <p className="tour-description">
        {showMore ? tour.info : `${tour.info.substring(0, 100)}...`} {/* Show truncated or full description */}
        <button
          className="read-more"
          onClick={() => setShowMore((prev) => !prev)} // Toggle the state to show more or less
        >
          {showMore ? "Show Less" : "Read More"}
        </button>
      </p>
      <button
        className="not-interested"
        onClick={() => removeTour(tour.id)} // Call removeTour with the tour ID
      >
        Not Interested
      </button>
    </div>
  );
};

export default Gallery; // Export the Gallery component as default