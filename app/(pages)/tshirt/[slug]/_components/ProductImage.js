"use client";
import ReusableImage from "@/app/_components/ReusableImage";

import { useState } from "react";

export default function ProductImage({ thumbnail, title, gallery }) {
  const [image, setImage] = useState(thumbnail);
  return (
    <div className="w-full md:w-[45%]">
      <ReusableImage
        width={1200}
        height={1200}
        className="w-full  object-cover"
        src={image}
        alt={title}
      />
      {gallery.length > 0 && gallery && (
        <div className="flex items-center gap-2 mt-12">
          <ReusableImage
            customClickHandler={() => setImage(thumbnail)}
            width={80}
            height={80}
            className="cursor-pointer p-[1px] bg-green-500 w-[80px] h-[80px] object-cover"
            src={thumbnail}
            alt={title || ""}
          />
          {gallery.map((galleryItem, index) => (
            <ReusableImage
              customClickHandler={() => setImage(galleryItem)}
              key={index}
              width={80}
              height={80}
              className="cursor-pointer p-[1px] bg-green-500 w-[80px] h-[80px] object-cover"
              src={galleryItem}
              alt={title || ""}
            />
          ))}
        </div>
      )}
    </div>
  );
}
