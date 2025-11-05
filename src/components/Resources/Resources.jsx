import React from "react";
import { Link } from "react-router-dom";

/* Resource links were obtained from perplexity AI*/

const resources = [
  {
    name: "The Bump",
    url: "https://www.thebump.com/",
    description: "A comprehensive platform offering pregnancy, parenting, and relationship advice, with interactive tools to help expecting parents prepare together."
  },
  {
    name: "Pathways.org",
    url: "https://pathways.org/play",
    description: "Evidence-based guidance on developmental milestones, prenatal bonding, and early intervention, supporting both the baby’s and parents’ needs."
  },
  {
    name: "Evidence Based Birth",
    url: "https://evidencebasedbirth.com/resources-for-parents/",
    description: "Workshops, classes, and online courses focused on childbirth education and shared decision-making, ideal for expecting partners wanting to make informed choices together."
  },
  {
    name: "Nurturing Parenting",
    url: "https://www.nurturingparenting.com/blog/empowering-new-parents-comprehensive-support-with-nurturing-parenting-programs/",
    description: "A suite of evidence-based programs providing support and education for building a strong, nurturing family relationship before and after childbirth."
  },
  {
    name: "American Pregnancy Association",
    url: "https://americanpregnancy.org/",
    description: "Reliable information, live chat, and resources on pregnancy, fertility, health, and communication for expecting parents."
  },
  {
    name: "Parent Collective",
    url: "https://www.theparentcollective.com/resources/blog-post-title-four-tzg2p-dsxd3-nr8he-p5g4w",
    description: "Actionable guidance for couples, including shared expectation-setting, communication strategies, and memory-building before the baby arrives."
  }
];

//https://www.geeksforgeeks.org/html/how-to-insert-video-in-web-page-and-play-it-using-html/ 
// Link above used to insert multimedia component

export default function Resources() {
  return (
    <body>
      <nav>
        <div className="brand active">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="baby in heart with hands" />
          <Link to="/">
            <h1>EquiCare</h1>
          </Link>
        </div>
        <div className="right-nav">
          <Link to="/DateQuiz">
            <button className="orange-button"><h3>Date Idea Generator</h3></button>
          </Link>
          <Link to="/EventCalendar">
            <button className="orange-button"><h3>Calendar</h3></button>
          </Link>
          <Link to="/Journal">
            <button className="orange-button"><h3>Journal</h3></button>
          </Link>
          <Link to="/Profile">
            <button class="orange-button"><h3>Profile</h3></button>
          </Link>
          <Link to="/resources">
            <button className="orange-button"><h3>Resources</h3></button>
          </Link>
        </div>
      </nav>
      <main>
        <div className="resources-background">
          <div className="resources-wrapper">
            <div className="resources-content">
              <h1 className="resources-title">
                Navigating pregnancy and <br />
                partnership, made simple.
              </h1>
              <p className="resources-subtitle">
                Explore trusted websites designed to support you and your partner throughout the journey
              </p>
              <div className="resources-grid">
                {resources.map(({ name, url, description }) => (
                  <div key={name} className="resource-card">
                    <h2 className="resource-card-title">{name}</h2>
                    <p className="resource-card-desc">{description}</p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-card-btn"
                    >
                      Visit Site
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="resources-image-section">
              <img src="/equicare/public/holding-hands.jpg" alt="Couple holding baby shoes" className="resources-image" />
              <div style={{marginTop: "20px", textAlign: "center"}}>
                <h2> Relationship Advice for Expecting Parents </h2>
                <iframe 
                  width = "360"
                  height = "220"
                  src = "https://www.youtube.com/embed/14S4zBmsM0w"
                  title = "Youtube Video"
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p>
          <em>
            &copy; {new Date().getFullYear()} EquiCare
          </em>
        </p>
      </footer>
    </body>
  );
}
