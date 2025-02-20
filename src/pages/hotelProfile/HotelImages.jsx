import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "lucide-react";
import { useGetHotelById, useUpdateHotel } from "../../api/hotel-api";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  hotelImagesSchema,
  updateHotelImagesSchema,
} from "../../validation-schemas/hotel-schema";
import { useOwnerContext } from "../../context/OwnerContext";

const HotelImages = () => {
  const [selectedImagesPreview, setSelectedImagesPreview] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const fileInputRef = useRef(null); // Reference to the file input
  const { user } = useOwnerContext();

  const { isLoading, isError, hotelData } = useGetHotelById(user?.hotelId);

  const { updateHotel, isLoading: isUpdateHotelLoading } = useUpdateHotel();

  const {
    setValue,
    clearErrors,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    resolver: zodResolver(updateHotelImagesSchema),
  });

  const handleImagesPreview = (files) => {
    const newPreviews = [];

    for (const file of files) {
      const tempPath = URL.createObjectURL(file);
      newPreviews.push({ file, url: tempPath, isOld: false });
    }

    setSelectedImagesPreview((prev) => [...prev, ...newPreviews]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    handleImagesPreview(files);

    setSelectedImages((prev) => {
      const newList = [...prev, ...files];

      if (newList.length >= 2) {
        clearErrors("roomImages");
      }
      setValue("roomImages", newList);
      //   setData({ images: newList });
      return newList;
    });

    // Reset file input value to allow re-selection of the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeletePhoto = (image) => {
    // Remove the image from previews
    setSelectedImagesPreview((prev) => prev.filter((i) => i.url !== image.url));

    // Remove the file from selected images
    if (image.isOld) {
      setOldImages((prev) => {
        const newList = prev.filter((file) => file !== image.url);
        return newList;
      });
    } else {
      setSelectedImages((prev) => {
        const newList = prev.filter((file) => file !== image.file);
        setValue("images", newList);
        //   setData({ images: newList });
        return newList;
      });
    }
  };

  useEffect(() => {
    if (hotelData.hotelImages) {
      //   console.log(hotelData.hotelImages);
      const newPreviews = hotelData.hotelImages.map((image) => ({
        file: image, // Keeping the original file reference
        url: typeof image === "string" ? image : URL.createObjectURL(image),
        isOld: true, // Marking as old to differentiate
      }));
      setSelectedImagesPreview(newPreviews);
      setOldImages(hotelData.hotelImages);
    }
  }, [hotelData]);

  const submitHandler = async (formData) => {
    if (oldImages.length + selectedImages.length < 2) {
      return setError("images", { message: "Please select atleast 2 images" });
    }

    if (selectedImages.some((image) => !image.name.startsWith("/image"))) {
      return setError("images", { message: "Invalid image format" });
    }

    const data = {
      oldImages: oldImages,
      hotelImages: selectedImages,
    };

    await updateHotel({
      hotelId: user?.hotelId,
      data,
      key: "",
    });
  };

  if (isLoading) {
    return <div></div>;
  }

  // console.log(errors);

  return (
    <div>
      <h1 className="text-lg font-bold">Add Hotel Images</h1>
      <div>
        {<p className="text-sm text-red-500">{errors?.images?.message}</p>}
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div
          className="flex flex-wrap gap-5 p-4 my-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
          }}
        >
          {/* Image Input Div */}
          <div className="relative flex flex-col items-center justify-center flex-shrink-0 gap-4 bg-gray-200 border border-gray-500 rounded-lg cursor-pointer size-40">
            <PlusIcon className="text-gray-500" />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef} // Assign reference
              draggable
              multiple
              onChange={handleFileChange}
              className="absolute top-0 left-0 w-full h-full bg-red-500 opacity-0 cursor-pointer"
            />
          </div>

          {/* Images Preview */}
          {selectedImagesPreview.map((image, index) => {
            return (
              <div className="relative flex-shrink-0" key={image.url}>
                <img
                  src={
                    image.isOld
                      ? `${import.meta.env.VITE_BASE_URL_IMAGES}${image.url}`
                      : image.url
                  }
                  alt="image preview"
                  className="object-cover rounded-md size-40"
                />

                <button
                  onClick={() => handleDeletePhoto(image)}
                  className="absolute flex items-center justify-center p-2 bg-red-500 rounded-full cursor-pointer -top-3 -right-3 size-8"
                >
                  <p className="text-white">X</p>
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-5">
          <button
            type="submit"
            disabled={isUpdateHotelLoading}
            className="px-5 py-2 text-white bg-blue-500 rounded-md disabled:cursor-not-allowed disabled:opacity-85"
          >
            {isUpdateHotelLoading ? "Loading...." : "Update Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelImages;

// D:\INTERSHIP_CODE_CRUSH\cc_hotel\uploads\hotels\1736333282167-362908124.PNG

// http:\\localhost:3000\uploads\hotels\1736333282167-362908124.PNG
