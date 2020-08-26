import React from "react";
import PropTypes from "prop-types";

const PostImages = ({ images }) => {
  return <div>이미지들</div>;
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object)
};

export default PostImages;
