import React from "react";
import { Link } from "react-router-dom";
import "./Aboutus.css";

const teamMembers = [
  {
    name: "Barcelona, Anna Martine",
    role: "Graphics Designer and Documentation",
    image: "/team/anna.png",
  },
  {
    name: "Calica, Ian Gabriel",
    role: "Full-Stack Developer",
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
    <div className="about-container mt-12">
      <div className="about-header">
        <h1 className="about-heading">About Us</h1>
      </div>

      <div className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>
              <strong>
                At <span className="highlight">True Self</span>,
              </strong>
            </h2>
            <p>
              We understand the unique challenges that LGBTQ individuals face
              when accessing healthcare. The barriers are often
              overwhelming—ranging from prejudice and discrimination to a
              shortage of trained healthcare professionals, compounded by
              limited resources.
            </p>
            <p>
              These issues not only lead to high-risk health conditions but also
              restrict access to vital gender-affirming surgeries and
              treatments.
            </p>
            <Link to="#" className="learn-more-btn">
              Learn More
            </Link>
          </div>
          <div className="about-image">
            <img src="/page/aboutus.png" alt="Illustration" />
          </div>
        </div>
      </div>

      <div className="team-section">
        <h1 className="team-heading">Meet The Team</h1>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img
                src={member.image}
                alt={member.name}
                className="object-cover w-32 h-32 rounded-full"
              />
              <p className="font-bold mt-4">{member.name}</p>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
