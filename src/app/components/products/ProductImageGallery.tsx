"use client";

import { ArrowLeft, ArrowRight } from "@/assets/svgs";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductDisplayProps {
  images: string[];
}

export const ProductImageGallery: React.FC<ProductDisplayProps> = ({
  images,
}) => {
  const [currentImage, setCurrentImage] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const visibleThumbnails = 4; // Number of thumbnails shown at a time

  // Handle thumbnail click
  const handleThumbnailClick = (image: string) => {
    setCurrentImage(image);
  };

  // Slide thumbnails left
  const slideLeft = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  // Slide thumbnails right
  const slideRight = () => {
    if (startIndex < images.length - visibleThumbnails) {
      setStartIndex(startIndex + 1);
    }
  };

  useEffect(() => {
    if (images.length) {
      setCurrentImage(images[0]);
    }
  }, [images]);

  return (
    <div className="productDisplay">
      {/* Main Product Image */}
      <div className="productDisplay__mainImage">
        {currentImage ? (
          <Image
            src={currentImage}
            alt="Product"
            className="main-image"
            width={500}
            height={500}
          />
        ) : null}
      </div>

      {/* Thumbnails Slider */}
      <div className="productDisplay__thumbnailSlider">
        {/* Left Arrow */}
        {images.length < visibleThumbnails ? null : (
          <button
            className="productDisplay__arrow left"
            onClick={slideLeft}
            disabled={startIndex === 0}
          >
            <ArrowLeft />
          </button>
        )}

        <div className="productDisplay__thumbnails">
          {images
            .slice(startIndex, startIndex + visibleThumbnails)
            .map((image, index) => (
              <button
                type="button"
                className={`productDisplay__thumbnailButton ${
                  currentImage === image ? "active" : ""
                }`}
                onClick={() => handleThumbnailClick(image)}
                key={image}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  width={300}
                  height={300}
                />
              </button>
            ))}
        </div>

        {/* Right Arrow */}
        {images.length < visibleThumbnails ? null : (
          <button
            className="productDisplay__arrow right"
            onClick={slideRight}
            disabled={startIndex >= images.length - visibleThumbnails}
            type="button"
          >
            <ArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};
