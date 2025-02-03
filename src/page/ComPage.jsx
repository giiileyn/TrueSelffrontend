import React from "react";
import { Link } from "react-router-dom";
import "./ComPage.css";

const ComPage = () => {
  return (
    <div className="com-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">True Self</h2>

          <div className="divider"></div>

            {/* Topics */}
            <h3 style={{ fontSize: "14px", marginBottom: "10px" }}>Topics</h3>


        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="#">
                <img src="/icons/FAQ.png" alt="FAQ Icon" className="sidebar-icon" />
                Q&As
                <img src="/icons/Chevron Down.png" alt="Dropdown Icon" className="dropdown-icon" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src="/icons/identitylabels.png" alt="Identity Labels Icon" className="sidebar-icon" />
                Identity and Labels
                <img src="/icons/Chevron Down.png" alt="Dropdown Icon" className="dropdown-icon" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src="/icons/relationships.png" alt="Relationships Icon" className="sidebar-icon" />
                Relationships
                <img src="/icons/Chevron Down.png" alt="Dropdown Icon" className="dropdown-icon" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src="/icons/prideactivism.png" alt="Pride Icon" className="sidebar-icon" />
                Pride and Activism
                <img src="/icons/Chevron Down.png" alt="Dropdown Icon" className="dropdown-icon" />
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src="/icons/communitysupport.png" alt="Community Icon" className="sidebar-icon" />
                Community and Support
                <img src="/icons/Chevron Down.png" alt="Dropdown Icon" className="dropdown-icon" />
              </Link>
            </li>
          </ul>
        </nav>
        

         {/* Divider line */}
         <div className="divider"></div>


        <div className="resources">
           <h3 style={{ fontSize: "14px", marginBottom: "10px" }}>Resources</h3>
          <ul>
            <li>
              <Link to="#">
                <img src="/icons/abouttrueself.png" alt="About Icon" className="sidebar-icon" />
                About True Self
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src="/icons/communities.png" alt="Communities Icon" className="sidebar-icon" />
                Communities
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src="/icons/topics.png" alt="Topics Icon" className="sidebar-icon" />
                Topics
              </Link>
            </li>
          </ul>
        </div>
      </aside>


      {/* Main Content */}
      <main className="main-content">
        <div className="top-section">
          <div className="card">
            <img src="/page/image1.png" alt="Community" />
            <p>Lorem ipsum dolor sit amet...</p>
          </div>
          <div className="card">
            <img src="/page/image2.png" alt="Community" />
            <p>Lorem ipsum dolor sit amet...</p>
          </div>
          <div className="card">
            <img src="/page/image3.png" alt="Community" />
            <p>Lorem ipsum dolor sit amet...</p>
          </div>
        </div>

        <div className="posts">
          <div className="post">
            <h4>tr/Relationships • 3 hr. ago</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="image-placeholder"></div>
            <div className="post-actions">
              <span>👍 361</span>
              <span>💬 353</span>
              <button>Share</button>
            </div>
          </div>

          <div className="post">
            <h4>tr/Relationships • 3 hr. ago</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="image-placeholder"></div>
            <div className="post-actions">
              <span>👍 361</span>
              <span>💬 353</span>
              <button>Share</button>
            </div>
          </div>
        </div>
      </main>

     
      <aside className="right-sidebar">
        <h3>Popular Communities</h3>
        <ul>
          <li>tr/Relationships (3,330,200 members)</li>
          <li>tr/LifeAdvices (10,200 members)</li>
          <li>tr/MentalHealth (100,200 members)</li>
          <li>tr/MentalHealth (1,000,200 members)</li>
          <li>
            <Link to="#">See more</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default ComPage;
