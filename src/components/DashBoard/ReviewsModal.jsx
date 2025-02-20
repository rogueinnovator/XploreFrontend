import React from "react";
import { Star } from "lucide-react"; // Using Lucide for star icons

const ReviewsModal = ({ isOpen, onClose, review }) => {
  if (!isOpen) return null; // Prevent rendering when modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[720px] bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#3d425a]">
            Reply to Review
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <hr className="my-4 border-[#e4e4e4]" />

        <div className="p-4 bg-white shadow-md rounded-xl">
          <div className="flex justify-between">
            <div className="w-[330px]">
              {/* Star Rating */}
              <div className="flex gap-2">
                {[...Array(5)].map((_, index) => {
                  const fillPercentage = Math.max(
                    0,
                    Math.min(1, review.rating - index)
                  ); // Fill percentage (0-1)
                  return (
                    <div
                      key={index}
                      className="relative"
                      style={{ width: 20, height: 20 }}
                    >
                      <Star
                        size={20}
                        className="absolute top-0 left-0 text-[#e4e4e4]"
                        fill="none"
                        stroke="#e4e4e4"
                      />
                      <div
                        className="absolute top-0 left-0 overflow-hidden"
                        style={{
                          width: `${fillPercentage * 100}%`,
                          height: "100%",
                        }}
                      >
                        <Star
                          size={20}
                          className="text-[#08a5dc]"
                          fill="#08a5dc"
                          stroke="#08a5dc"
                        />
                      </div>
                    </div>
                  );
                })}
                <span className="text-lg font-bold text-[#1e1e1e] ml-2">
                  {review.rating}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-[#1e1e1e] text-lg">{review.reviewText}</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="object-cover w-20 h-20 rounded-xl"
                src={review.profileImage}
                alt="User"
              />
              <span className="text-lg font-bold text-[#1e1e1e]">
                {review.userName}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold text-[#3d425a]">
            Reply to the review
          </label>
          <textarea
            className="w-full h-20 p-2 bg-[#f2f6ff] rounded-lg border text-[#a1a1a1] text-base mt-2"
            placeholder="Thank you for your feedback! We appreciate your thoughts and are always striving to improve your experience."
          />
        </div>

        <hr className="my-4 border-[#e4e4e4]" />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border rounded-lg text-[#3d425a] shadow"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#08a5dc] text-white rounded-lg shadow">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
