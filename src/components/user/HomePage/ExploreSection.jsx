import { Star } from "lucide-react";
import React, { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
const ExploreSection = () => {
  const carouselRef = useRef(null);

  const items = [
    {
      image:
        "https://guidetopakistan.pk/wp-content/uploads/2021/06/skardu1-1.jpg",
      desc: "Beautiful view of Islamabad",
      city: "Islamabad",
      price: "120",
      rating: "4.9",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKG3Clv6K4Tg_LGFa70L-BWrPE8Sm2tZHUxw&s",
      desc: "Historical landmarks in Peshawar",
      city: "Peshawar",
      price: "100",
      rating: "4.7",
    },
    {
      image:
        "https://i.dawn.com/primary/2015/04/55253498bb39c.jpg?r=1434275949",
      desc: "Cultural heritage of Sialkot",
      city: "Sialkot",
      price: "90",
      rating: "4.6",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmpsYl2Ium6Ua8gyEksVjS0fA89xuNF6QVYA&s",
      desc: "Bustling city life in Rawalpindi",
      city: "Rawalpindi",
      price: "110",
      rating: "4.8",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo2_HeiTO9uPzJaQmpEt1JrcwcAYPoLMY8mQ&s",
      desc: "Architectural wonders of Lahore",
      city: "Lahore",
      price: "130",
      rating: "4.9",
    },
  ];

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="flex justify-between items-center text-[#1570EF] px-4">
        <h1 className="text-xl font-semibold">Explore pakistan</h1>
      </div>
      <Carousel
        ref={carouselRef}
        responsive={responsive}
        infinite
        autoPlay={true}
        itemClass="p-1"
        arrows={false}
      >
        {items.map((item, index) => (
          <div key={index} className="relative w-full h-64 group ">
            {/* IMG */}
            <img
              src={item.image}
              alt={item.text}
              className="object-cover w-full h-full rounded-lg"
            />
            <div className="absolute bottom-0 flex flex-col items-start justify-start w-full gap-2 px-4 pt-3 pb-4 text-white transition duration-700 rounded-lg hover:bg-black/40">
              <h1 className="text-xl font-bold">{item.city}</h1>
              <p className="text-sm text-gray-200">{item.desc}</p>
              <div className="flex items-center justify-between w-full text-black">
                <h1 className="font-semibold text-white">
                  From {item.price}$ per Night
                </h1>
                <div className="flex items-center gap-1 px-3 rounded-md bg-black/40">
                  <Star size={16} className="text-yellow-400" />
                  <span className="mt-1 text-sm font-medium text-white ">
                    4.9
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default ExploreSection;
