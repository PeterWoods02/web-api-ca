import React from 'react';

const UserRatingsList = ({ ratings }) => {
  // Ensure ratings is always an array (even if it's undefined or null)
  const safeRatings = Array.isArray(ratings) ? ratings : [];

  return (
    <div>
      {safeRatings.length === 0 ? (
        <p>No ratings available.</p>
      ) : (
        safeRatings.map((rating) => (
          <div key={rating._id}>
            {/* Render rating details here */}
            <p>Rating: {rating.rating}</p>
            <p>Review: {rating.review}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default UserRatingsList;
