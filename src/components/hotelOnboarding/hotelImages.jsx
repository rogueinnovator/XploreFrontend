import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "lucide-react";

const HotelImages = ({
  data,
  setData,
  control,
  errors,
  setValue,
  clearErrors,
}) => {
  const [selectedImagesPreview, setSelectedImagesPreview] = useState([]);
  const [selectedImages, setSelectedImages] = useState(data.images || []);
  const fileInputRef = useRef(null); // Reference to the file input

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
        clearErrors("images");
      }
      setValue("images", newList);
      setData({ images: newList });
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
    setSelectedImages((prev) => {
      const newList = prev.filter((file) => file !== image.file);
      setValue("images", newList);
      setData({ images: newList });
      return newList;
    });
  };

  useEffect(() => {
    if (data.images) {
      const newPreviews = data.images.map((image) => ({
        file: image, // Keeping the original file reference
        url: typeof image === "string" ? image : URL.createObjectURL(image),
        isOld: true, // Marking as old to differentiate
      }));
      setSelectedImagesPreview(newPreviews);
    }
  }, [data.images]);

  return (
    <div>
      <h1 className="text-lg font-bold">Add Hotel Images</h1>
      <div>
        <p className="text-sm text-red-500">{errors?.images?.message}</p>
      </div>
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
            ref={fileInputRef} // Assign reference
            draggable
            multiple
            accept="image/*" // Only accept images
            onChange={handleFileChange}
            className="absolute top-0 left-0 w-full h-full bg-red-500 opacity-0 cursor-pointer"
          />
        </div>
        {/* Images Preview */}
        {selectedImagesPreview.map((image, index) => (
          <div className="relative flex-shrink-0" key={image.url}>
            <img
              src={image.url}
              alt="image preview"
              className="object-fill rounded-md size-40"
            />
            <p className="text-sm text-red-500">
              {errors?.images?.at(index)?.message}
            </p>
            <button
              onClick={() => handleDeletePhoto(image)}
              className="absolute flex items-center justify-center p-2 bg-red-500 rounded-full cursor-pointer -top-3 -right-3 size-8"
            >
              <p className="text-white">X</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelImages;
