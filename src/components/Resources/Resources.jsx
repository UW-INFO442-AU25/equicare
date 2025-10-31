import React from "react";

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

export default function Resources() {
  return (
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
          <img src = "/equicare/public/holding-hands.jpg" alt="Couple holding baby shoes" className="resources-image" />
        </div>
      </div>
    </div>
  );
}
