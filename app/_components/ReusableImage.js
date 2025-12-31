"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Default fallback image - you can replace this with your actual fallback
const FALLBACK_IMAGE = "/images/placeholder-image.svg";

// Generate a simple blur data URL
const generateBlurDataURL = (width = 40, height = 40) => {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <rect x="25%" y="25%" width="50%" height="50%" fill="#2a2a2a" opacity="0.5"/>
    </svg>`
  ).toString("base64")}`;
};

export default function ReusableImage({
  src,
  alt,
  href,
  width = 1200,
  height = 1200,
  className = "w-full md:w-[40%]",
  imageClassName = "w-full h-full object-cover",
  containerClassName = "block relative overflow-hidden  bg-secondary shadow-2xl hover:shadow-white/10 transition-all duration-500 group-hover:scale-[1.02]",
  aspectRatio = "aspect-square",
  priority = true,
  quality = 100,
  sizes = "(max-width: 768px) 100vw, 40vw",
  showZoomIndicator = true,
  enableHover = true,
  customClickHandler = () => {},
}) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const imageSrc = imageError ? FALLBACK_IMAGE : src || FALLBACK_IMAGE;
  const imageAlt = alt || "Image";

  const handleImageError = () => {
    console.error(`Failed to load image: ${src}`);
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Image content
  const ImageContent = () => (
    <>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-gray-900 animate-pulse ">
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* Main image */}
      <div
        onClick={customClickHandler}
        className={`relative ${aspectRatio} overflow-hidden `}
      >
        <Image
          width={width}
          height={height}
          src={imageSrc}
          alt={imageAlt}
          priority={priority}
          quality={quality}
          sizes={sizes}
          className={`
            ${imageClassName} transition-all duration-700
            ${isLoading ? "scale-110 blur-sm" : "scale-100 blur-0"}
            ${enableHover ? "group-hover:scale-105" : ""}
          `}
          placeholder="blur"
          blurDataURL={generateBlurDataURL()}
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{
            objectPosition: "center",
          }}
        />

        {/* Overlay gradient */}
        {enableHover && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        )}

        {/* Hover effect overlay */}
        {enableHover && (
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl"></div>
        )}
      </div>

      {/* Subtle border */}
      <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none group-hover:border-white/20 transition-colors duration-300"></div>

      {/* Error state indicator (only visible in development) */}
      {imageError && process.env.NODE_ENV === "development" && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          Fallback
        </div>
      )}
    </>
  );

  return (
    <div className={`relative group ${className}`}>
      {href ? (
        <Link
          href={href}
          className={containerClassName}
          aria-label={`View details for ${alt || "this image"}`}
        >
          <ImageContent />
        </Link>
      ) : (
        <div className={containerClassName}>
          <ImageContent />
        </div>
      )}
    </div>
  );
}
