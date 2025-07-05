import React from "react";
import "../App.css";

function SavedCities({ cities, onDelete, onCityClick }) {
  return (
    <div className="saved-cities">
      <h3>📍 Saved Cities</h3>
      {cities.length === 0 ? (
        <p>No saved cities yet.</p>
      ) : (
        cities.map((city) => (
          <div key={city._id} className="city-chip">
            <span
              onClick={() => onCityClick(city.name)}
              style={{ cursor: "pointer" }}
            >
              {city.name}
            </span>
            <button onClick={() => onDelete(city.name)}>✖</button>
          </div>
        ))
      )}
    </div>
  );
}

export default SavedCities;
