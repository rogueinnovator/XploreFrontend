import { useState, useEffect } from "react";

const HotelPhotos = ({
  formData,
  setFormData,
  register,
  errors,
  setValue,
  isUpdate = false,
}) => {
  const [selectedImagesPreview, setSelectedImagesPreview] = useState([]);

  useEffect(() => {
    if (isUpdate && formData.oldPhotos && formData.oldPhotos.length > 0) {
      setSelectedImagesPreview(
        formData.oldPhotos.map((photo) => ({ url: photo, isOld: true }))
      );
    }
  }, [formData.oldPhotos, isUpdate]);

  const handleImagesPreview = (files) => {
    const newPreviews = [];
    for (const file of files) {
      const tempPath = URL.createObjectURL(file);
      newPreviews.push({ file, url: tempPath, isOld: false });
    }
    setSelectedImagesPreview((prev) => [...prev, ...newPreviews]);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files) return;

    // Update previews
    handleImagesPreview(files);

    // Update form data
    setFormData((prev) => {
      const updatedList = [...prev.photos, ...files];
      setValue("photos", updatedList);
      return {
        ...prev,
        photos: updatedList,
      };
    });
  };

  const handleDeletePhoto = (image) => {
    setSelectedImagesPreview((prev) => prev.filter((i) => i.url !== image.url));

    if (image.isOld) {
      // Remove old photo from form data
      setFormData((prev) => ({
        ...prev,
        oldPhotos: prev.oldPhotos.filter((photo) => photo !== image.url),
      }));
    } else {
      // Remove new photo from form data
      setFormData((prev) => ({
        ...prev,
        photos: prev.photos.filter((photo) => photo !== image.file),
      }));
    }
  };

  return (
    <div className="flex flex-col w-11/12 gap-2">
      <h2 className="text-xl font-bold text-start">Photos of your hotel</h2>
      <div className="relative w-full h-36 border-2 border-dashed border-gray-500 rounded-lg bg-gray-200 flex flex-col gap-4 justify-center items-center cursor-pointer">
        <p className="font-bold">Drag and Drop or</p>
        <div className="border border-blue-500 text-blue-500 py-2 px-4 rounded-md max-w-fit">
          Upload Photos
        </div>
        <input
          type="file"
          draggable
          multiple
          onChange={handleFileChange}
          className="bg-red-500 absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
        />
      </div>
      {errors?.photos?.message && (
        <p className="text-red-500 text-sm">{errors.photos.message}</p>
      )}
      <div className="flex flex-wrap mt-5 gap-4">
        {selectedImagesPreview.map((image) => (
          <div className="relative" key={image.url}>
            <img
              src={image.url}
              alt="image preview"
              className="w-60 rounded-md"
            />
            <button
              onClick={() => handleDeletePhoto(image)}
              className="absolute -top-3 -right-3 size-8 rounded-full p-2 bg-red-500 flex justify-center items-center cursor-pointer"
            >
              <p className="text-white">X</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelPhotos;
