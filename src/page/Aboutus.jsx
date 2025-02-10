import React from "react";
import "./Aboutus.css";

const teamMembers = [
  {
    name: "Barcelona, Anna Martine",
    role: "Graphics Designer and Documentation",
    image: "/team/anna.png",
  },
  {
    name: "Calica, Ian Gabriel",
    role: "Full-Stack Developer and Machine Learning Developer",
    image: "/team/ian.png",
  },
  {
    name: "Candelario, Jhan Kyle",
    role: "Documentation",
    image: "/team/kyle.png",
  },
  {
    name: "Castronuevo, Gelain",
    role: "UI/UX Designer and Frontend Developer",
    image: "/team/gelain.png",
  },
];

const Aboutus = () => {
  return (
    <div className="about-container">
      <div className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>
              <strong>
                At <span className="highlight">True Self</span>,
              </strong>
            </h2>
            <p>
              At TrueSelf, we understand the unique challenges that LGBTQ
              individuals face when accessing healthcare. The barriers are often
              overwhelming—ranging from prejudice and discrimination to a
              shortage of trained healthcare professionals, compounded by
              limited resources.
            </p>
          </div>
          <div className="about-image">
            <img src="/page/aboutus.png" alt="Illustration" />
          </div>
        </div>
      </div>

      <div className="team-section py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Meet The Team</h1>
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg flex flex-col items-center p-6 w-64"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <p className="font-bold text-lg text-center">{member.name}</p>
              <p className="text-gray-500 text-center">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
