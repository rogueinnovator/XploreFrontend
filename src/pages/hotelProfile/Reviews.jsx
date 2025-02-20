import React, { useState } from "react";
import { Star } from "lucide-react";
import ReviewsModal from "../../components/DashBoard/ReviewsModal";
const reviewsData = [
  {
    rating: 5,
    reviewText: "Great product, very satisfied with the quality!",
    userName: "John Doe",
    profileImage: "/public/review-profile.png",
    reviewDate: "2025-01-10",
    reviewCount: 578,
  },
  {
    rating: 4.5,
    reviewText: "Pretty good, could be better in terms of durability.",
    userName: "Maxin Will",
    profileImage: "/public/review-profile.png",
    reviewDate: "2025-01-12",
    reviewCount: 150,
  },
];

const Reviews = () => {
  const [reviews] = useState(reviewsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const openModal = (review) => {
    setSelectedReview(review); // Set the selected review for the modal
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedReview(null); // Clear the selected review
  };

  // Calculate average rating
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Calculate total reviews
  const totalReviews = reviews.length;

  // Calculate star counts dynamically from reviewsData
  const starCounts = [1, 2, 3, 4, 5].reduce((acc, star) => {
    acc[`${star} stars`] = reviews.filter(
      (review) => Math.floor(review.rating) === star
    ).length;
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4">
      <div className="w-[1174px] h-[492.07px] p-4 bg-white rounded-xl shadow-sm border-b flex-col gap-3.5 overflow-hidden">
        <div className="self-stretch h-[188.07px] p-6 bg-white rounded-2xl shadow-sm flex flex-col gap-6">
          <div className="flex items-start justify-between w-full">
            <div>
              <div className="text-sm font-medium text-[#0d0c22] font-['Poppins']">
                Customers Reviews
              </div>
              <div className="text-[40px] font-bold text-black leading-tight">
                {averageRating.toFixed(1)}
              </div>

              {/* Stars */}
              <div className="flex gap-2">
                {[...Array(5)].map((_, index) => {
                  const fillPercentage = Math.max(
                    0,
                    Math.min(1, averageRating - index)
                  ); // Fill percentage for this star (0 to 1)
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
              </div>

              <div className="text-xs font-medium text-[#848484] font-['Poppins'] mt-3">
                ({totalReviews} Reviews)
              </div>
            </div>

            {/* Star ratings with bars */}
            <div className="flex flex-col gap-4">
              {Object.entries(starCounts).map(([text, count], index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-[10px] font-medium text-black font-['Poppins']">
                    {text}
                  </div>
                  <div className="w-[351px] h-1.5 rounded-lg bg-[#f2f6fb] overflow-hidden relative">
                    <div
                      className="absolute top-0 left-0 h-full"
                      style={{
                        width: `${(count / totalReviews) * 100}%`,
                        backgroundColor: "#08a5dc",
                      }}
                    />
                  </div>
                  <div className="text-[10px] font-medium text-[#0d0c22] leading-[18px] font-['Poppins']">
                    {count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="flex gap-6">
          {reviews.slice(0, 2).map((review, index) => (
            <div
              key={index}
              className="flex flex-col gap-6 p-6 bg-white shadow-sm grow rounded-2xl"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-6">
                  <div className="text-lg font-bold text-[#1e1e1e] font-['Inter']">
                    {review.rating}/5
                  </div>
                  <div className="text-lg font-normal text-[#1e1e1e] font-['Inter'] leading-normal">
                    {review.reviewText}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-6">
                  <div className="w-[82px] h-[86px] rounded-xl bg-[#d9d9d9] overflow-hidden relative">
                    <img
                      className="absolute w-full h-full"
                      src="/public/review-profile.png" // Use dynamic profile image path
                      alt="Profile"
                    />
                  </div>
                  <div className="text-lg font-bold text-[#1e1e1e] font-['Inter']">
                    {review.userName}
                  </div>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-xl font-semibold text-[#08a5dc] font-['Inter']">
                  <button
                    className="px-4 py-2 mt-2 text-white bg-blue-500 rounded"
                    onClick={() => openModal(review)}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ReviewsModal
          isOpen={isModalOpen}
          onClose={closeModal}
          review={selectedReview}
        />
      )}
    </div>
  );
};

export default Reviews;
