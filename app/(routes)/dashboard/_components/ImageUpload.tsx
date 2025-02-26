"use client";
import { CloudUpload, X } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

function ImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const OnImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      console.log(files[0]);
      const imageUrl = URL.createObjectURL(files[0]);
      setPreviewUrl(imageUrl);
    }
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Upload Section */}
        <div>
          {!previewUrl ? (
            <div className="p-7 border border-dashed rounded-md shadow-md flex flex-col items-center justify-center">
              <CloudUpload className="h-10 w-10" />
              <h2>Upload Image</h2>

              <p className="text-gray-400 mt-3">
                Click on select button to upload image
              </p>

              <div className="p-5 border w-full flex mt-7 justify-center">
                <label htmlFor="imageselect" className="cursor-pointer">
                  <h2 className="p-2 bg-primary text-white rounded-md px-5">
                    Select Image
                  </h2>
                </label>
              </div>

              <input
                type="file"
                id="imageselect"
                className="hidden"
                multiple={false}
                onChange={OnImageSelect}
              />
            </div>
          ) : (
            <div className="p-5 border border-dashed relative">
              <button
                onClick={() => setPreviewUrl(null)}
                className="absolute top-2 right-2 bg-gray-200 rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
              <Image
                src={previewUrl}
                alt="preview"
                width={500}
                height={500}
                className="w-full h-[300px] object-contain"
              />
            </div>
          )}
        </div>

        {/* User Input Textarea Section */}
        <div>
          User input text area
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
