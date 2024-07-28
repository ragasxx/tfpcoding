import React from 'react';
import Masonry from 'react-masonry-css';
import './MasonryLayout.css';

const MasonryLayout = ({ testimonials }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="card"
          style={{ backgroundColor: testimonial.color }}
        >
          <p>{testimonial.text}</p>
          <span>{testimonial.author}</span>
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
