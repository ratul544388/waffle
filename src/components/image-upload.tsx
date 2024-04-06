"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Image } from "./image";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface ImageUploadProps {
  onChange: (value: string) => void;
  disabled?: boolean;
  value?: string;
  isUploadingImage: boolean;
  onChangeUploadingImage: (value: boolean) => void;
}

export const ImageUpload = ({
  onChange,
  disabled,
  value,
  isUploadingImage,
  onChangeUploadingImage,
}: ImageUploadProps) => {
  const [previewImage, setPreviewImage] = useState(value);
  const [uploadProgress, setUploadProgress] = useState(0);
  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeUploadingImage(true);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      setPreviewImage(result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "food-delivery");
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      const response = await axios.post(url, formData, {
        onUploadProgress: ({ total, loaded }) => {
          if (total) {
            setUploadProgress((loaded / total) * 100);
          }
        },
      });
      setUploadProgress(0);
      onChange(response.data.secure_url);
    } catch (error) {
      console.log(error);
    } finally {
      onChangeUploadingImage(false);
    }
  };

  return (
    <div className="relative size-28 border rounded-md">
      <input
        id="file"
        type="file"
        className="size-0 pointer-events-none opacity-0"
        onChange={onSelectFile}
      />
      {previewImage && (
        <Image
          src={previewImage}
          alt="Preview image"
          className={cn(
            "absolute top-0 left-0 size-full pointer-events-none opacity-80",
            uploadProgress && "opacity-30"
          )}
        />
      )}
      <Button
        disabled={disabled || isUploadingImage}
        size="icon"
        variant="ghost"
        className="rounded-full bg-black/40 hover:bg-black/60 abs_center"
      >
        <Label htmlFor="file" className="cursor-pointer">
          <ImagePlus className="size-6" />
        </Label>
      </Button>
      {!!uploadProgress && (
        <CircularProgressbar
          value={uploadProgress}
          className="size-12 abs_center"
          styles={buildStyles({
            pathColor: "#EA580C",
          })}
        />
      )}
    </div>
  );
};
