"use client";

import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FormErrors } from "./form-errors";
import { defaultImages } from "@/constants/images";
interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const { pending } = useFormStatus();
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (res && res.response) {
          console.log(res.response);
          const result = res.response as Array<Record<string, any>>;
          setImages(result);
          setSelectedImageId(result[0].id);
        } else {
          console.log("Failed to get images from unsplash");
        }
      } catch (err) {
        console.log(err);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className=" h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted ",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImageId === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              src={image.urls.thumb}
              alt="Unsplash Image"
              className="object-cover rounded-sm"
              fill
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 h-full w-full  bg-black/30 flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
              href={image.links.html}
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
