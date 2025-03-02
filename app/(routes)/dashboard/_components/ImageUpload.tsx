
"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, Sparkles, SparklesIcon, X } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";


function ImageUpload() {
  const AimodelList = [
    {
      name : 'Gemini Google',
      icon : '/google.png'
    },
    {
      name : 'llama By Meta',
      icon : '/meta.png'
    },
    {
      name : 'Deepseek',
      icon : '/deepseek.png'
    }
  ]
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<any>();
  const [model,setModel] = useState<string>();
  const [description,setDescription] = useState<string>();


  const OnImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      console.log(files[0]);
      const imageUrl = URL.createObjectURL(files[0]);
      setFile(files[0]);
      setPreviewUrl(imageUrl);
    }
  };

  const OnConvertToCodeButtonClick= async()=>{
    if(!file || !model ||!description){
      console.log("select all fields");
      return;
    }
    const fileName = Date.now() + 'png';
    const imageRef = ref(storage, "Vision2Code/"+ fileName);
    await uploadBytes(imageRef,file).then( resp => {
      console.log("Image Uploaded.....")
    });

    const imageUrl = await getDownloadURL(imageRef);
    console.log(imageUrl);
  }

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Upload Section */}
        <div>
          {!previewUrl ? (
            <div className="p-7 border border-dashed rounded-md shadow-md flex flex-col items-center justify-center">
              <CloudUpload className="h-10 w-10 text-primary" />
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
        <div className="p-7 border shadow-md rounded">

         <h2 className="font-bold text-lg "> Select AI Model</h2>
          <h2 className="mt-4"></h2>
          <Select onValueChange={(value) => setModel(value)}>
            <SelectTrigger className="w-full">
             <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent>
              {AimodelList.map((model,index) => (
                <SelectItem value={model.name} key={index}>
                  <div className="flex items-center gap-2">
                    <Image src={model.icon} alt={model.name} width={25} height={35} />
                    <h2> {model.name} </h2>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <h2 className="font-bold text-lg mt-5"> Enter the description about your webpage </h2>
          <Textarea 
          onChange={(event)=> setDescription(event?.target.value)}
          className="mt-4 h-[100px]" placeholder='write about your webpage'/>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center">
        <Button onClick={OnConvertToCodeButtonClick}> <SparklesIcon /> Convert to Code</Button>
      </div>
    </div>
  );
}

export default ImageUpload;