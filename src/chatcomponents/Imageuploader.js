import React, { useEffect, useState } from 'react'
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from 'react-icons/fi';
import { useRef } from 'react';

export default function Imageuploader({ label,register,setValue,viewData = null}){

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(
        viewData!==null ? viewData  : ""
    )
    const inputRef = useRef(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
          previewFile(file)
          setSelectedFile(file)
        }
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 
          { "image/*": [".jpeg", ".jpg", ".png"] },
        
        onDrop,
    });

    const previewFile = (file) => {
        // console.log(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setPreviewSource(reader.result)
        }
    }

    useEffect(() => {
        register("Media")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register])

    useEffect(() => {
        setValue("Media", selectedFile)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile, setValue])
    

  return (
    <div className="flex flex-col space-y-2 h-[220px]">
    <label className="text-sm text-richblack-5 text-left pl-7 pt-2 font-semibold" htmlFor="Media">
      {label} 
    </label>
    <div
      className={`${
        isDragActive ? "bg-richblack-600" : "bg-richblack-700"
      } flex w-[150px]   cursor-pointer outline outline-gray-500 items-center justify-center rounded-full border-2 border-dotted border-richblack-500`}
    >
      {previewSource ? (
        <div className="flex w-[150px] h-[150px] flex-col p-1">
          {(
            <img
              src={previewSource}
              alt="Preview"
              className="h-[150px] w-[150px] aspect-square rounded-full object-cover"
            />
          )}
          {!viewData && (
            <button
              type="button"
              onClick={() => {
                setPreviewSource("")
                setSelectedFile(null)
                setValue("Media", null)
              }}
              className="mt-3 text-richblack-400 underline "
            >
              Cancel
            </button>
          )}
        </div>
      ) : (
        <div
          className="flex max-w-[150px] h-[150px] flex-col items-center p-6"
          {...getRootProps()}
        >
          <input {...getInputProps()} ref={inputRef} />
          <div className="grid aspect-square w-10 place-items-center rounded-full bg-pure-greys-800">
            <FiUploadCloud className="text-2xl text-yellow-500" />
          </div>
          <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
            Drag and drop an image or click to{" "}
            <span className="font-semibold text-yellow-500">Browse</span> a
            file
          </p>
          
        </div>
      )}
    </div>
  
  </div>
  )
}
