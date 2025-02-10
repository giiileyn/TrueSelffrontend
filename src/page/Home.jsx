import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const testimonials = [
    {
      name: "Leo",
      rating: 5,
      feedback: "Napakalaking tulong sa akin ng journaling feature!",
      description:
        "Dati, hindi ko maipahayag nang maayos ang aking nararamdaman. Pero dahil sa journaling feature ng app na ito, mas naging aware ako sa aking emosyon. Nakatulong din ang AI sa pag-predict ng anxiety level ko, kaya mas naihahanda ko ang sarili ko.",
      image:
        "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Jane",
      rating: 4,
      feedback: "Napaka-supportive ng community forum!",
      description:
        "Ang hirap minsan maghanap ng safe space para sa LGBTQ+ mental health discussions, pero sa forum ng app na ito, ramdam ko ang suporta ng ibang users. Sobrang laking tulong na may makakaintindi sa pinagdadaanan ko.",
      image:
        "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "John",
      rating: 5,
      feedback: "Ang AI prediction feature ay game-changer!",
      description:
        "Sobrang helpful ng AI anxiety prediction! Napansin kong mas na-manage ko ang anxiety ko dahil alam ko kung kailan ako dapat magpahinga at maglaan ng oras para sa sarili ko. Malaking tulong din ang mood tracker sa pag-monitor ng emotional patterns ko.",
      image:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <>
      <div className="register-container">
        {/* Left Section: Text */}
        <div className="left-row">
          <h1 className="home-title1">Embrace yourself</h1>
          <p className="register-subtitle">
            Discover the power within you! Embrace your unique journey and
            unlock your true potential today. Start your transformation now or
            learn more about how we can support you!
          </p>
          <Link to="/login">
            <button type="submit" className="left-startnow-btn">
              Start Now!
            </button>
          </Link>
          <Link to="/about-us">
            <button type="submit" className="right-learnmore-btn">
              Learn More
            </button>
          </Link>
        </div>

        {/* Right Section: Image */}
        <div className="right-row">
          <img className="ml-5" src="/page/removeBgHome.png" alt="image" />
        </div>
      </div>

      {/* About section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10 px-4 md:px-10">
        {/* Left Section: Illustration */}
        <div className="w-full md:w-1/3">
          <img
            src="/page/aboutus.png"
            alt="Illustration of diverse individuals supporting each other"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
        {/* Right Section: Text */}
        <div className="max-w-lg">
          <h1 className="font-bold text-2xl md:text-3xl mb-4">About Us</h1>
          <p className="text-gray-600 leading-relaxed">
            At TrueSelf, we understand the unique challenges that LGBTQ
            individuals face when accessing healthcare. The barriers are often
            overwhelming—ranging from prejudice and discrimination to a shortage
            of trained healthcare professionals, compounded by limited
            resources.
          </p>
          <Link to="/about-us">
            <button className="mt-6 px-6 py-2 border-2 border-black text-black  rounded-full hover:bg-black font-bold hover:text-white transition">
              Learn More
            </button>
          </Link>
        </div>
      </div>

      {/* Our Offers Section */}
      <div className="flex flex-col items-center gap-8 mt-36 px-4 md:px-10">
        {/* Heading and Description */}
        <div className="text-center">
          <h1 className="font-bold text-4xl">Our Offers</h1>
          <p className="mt-2 text-lg">
            Track your emotions, share with a supportive community, and gain
            insights with AI-powered anxiety predictions—all in one place.
          </p>
        </div>

        {/* Offer Cards */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-20 mt-10">
          <div class="flex flex-col items-center">
            <div class="w-36 h-36 md:w-48 md:h-48 bg-[#B0E0E6] rounded-2xl shadow-lg">
              <img
                src="/page/JOURNALING_HOME.png"
                alt="Image description"
                class="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <p class="mt-2 text-center font-bold">
              Journaling and Mood Tracking
            </p>
          </div>

          <div class="flex flex-col items-center">
            <div class="w-36 h-36 md:w-48 md:h-48 bg-[#FFDAB9] rounded-2xl shadow-lg">
              <img
                src="/page/AI_HOME.png"
                alt="Image description"
                class="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <p class="mt-2 text-center font-bold">
              AI Prediction of Anxiety Level
            </p>
          </div>

          <div class="flex flex-col items-center">
            <div class="w-36 h-36 md:w-48 md:h-48 bg-[#F4DAD1] rounded-2xl shadow-lg">
              <img
                src="/page/COMMUNITY_HOME.png"
                alt="Image description"
                class="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <p class="mt-2 text-center font-bold">Community Forum</p>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="w-full max-w-4xl mx-auto py-10 mt-36">
        <h2 className="text-2xl font-bold text-center mb-8">
          What Our Clients Say About Us
        </h2>
        <Swiper
          modules={[Navigation, Pagination]}
          initialSlide={1}
          spaceBetween={20}
          slidesPerView={1.3}
          centeredSlides={true}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div
                className={`border rounded-2xl shadow-lg p-5 bg-white ${
                  index === 1 ? "border-blue-500" : ""
                }`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    {testimonial.feedback}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {testimonial.description}
                  </p>
                </div>
                <div className="mt-4 flex">
                  {Array.from({ length: testimonial.rating }).map((_, idx) => (
                    <svg
                      key={idx}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-yellow-500"
                    >
                      <path d="M12 .587l3.668 7.429L24 9.747l-6 5.847L19.336 24 12 20.128 4.664 24 6 15.594 0 9.747l8.332-1.731L12 .587z" />
                    </svg>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Create memories with us section */}
      <div className=" py-10 px-5">
        <h2 className="text-2xl font-bold text-center mb-8">
          Create memories with us
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <img
            src="https://images.pexels.com/photos/1167034/pexels-photo-1167034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Memory 1"
            className="rounded-lg object-cover w-full h-full"
          />
          <img
            src="https://images.pexels.com/photos/1304732/pexels-photo-1304732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Memory 2"
            className="rounded-lg object-cover w-full h-full"
          />
          <img
            src="https://images.pexels.com/photos/919194/pexels-photo-919194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Memory 3"
            className="rounded-lg object-cover w-full h-full"
          />
          <img
            src="https://images.pexels.com/photos/1400259/pexels-photo-1400259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Memory 4"
            className="rounded-lg object-cover w-full h-full"
          />
          <img
            src="https://images.pexels.com/photos/2432298/pexels-photo-2432298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Memory 5"
            className="rounded-lg object-cover w-full h-full"
          />
          <img
            src="https://images.pexels.com/photos/2306841/pexels-photo-2306841.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Memory 6"
            className="rounded-lg object-cover w-full h-full"
          />
          <img
            src="https://images.pexels.com/photos/2566434/pexels-photo-2566434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Memory 7"
            className="rounded-lg object-cover w-full h-full"
          />
          <img
            src="https://images.pexels.com/photos/1612754/pexels-photo-1612754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Memory 8"
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
