# Equicare
INFO 442 Autumn 2025

Group 4: Ayushi Mehra, Yuvika Verma, Sonoma Miller, Audrey Phan, Judy Kuang

**Defining the Problem:** How might we support first-time expecting parents in urban areas in the U.S. navigate shifting relationship dynamics during pregnancy to strengthen their relationship so they can maintain a supportive partnership during their transition to parenthood?

## Features
| Requirement                                                  | Description | Priority |
|--------------------------------------------------------------|-------------|----------|
| Firebase auth login                                          | Establish their account and personal info |    P0    |
| Date Night Idea Quiz                                         | Fill out the quiz to get ideas for date night |    P0    |
| Linked Calendar - to track appointments/milestones           | To-Do List with a partner or planner for personal baby prep |    P0    |
| Profile | Store information about the user like name, pregnancy term, and invitations to link their account with a partner |    P1    |
| Resources page                                               | Mix of articles, links, experts to talk to, videos |    P1    |
| Weekly check-in journal                                      | Allow couples to write their individual thoughts/concerns |    P2    |

## Design Decisions
The date night quiz would enable couples to intentionally set aside time for each other and encourage them to have face-to-face interactions. The journal would give each individual space to express their own thoughts. The calendar would allow them to share photos and notes from important appointments and milestones, strengthening their sense of collaboration and celebration. Using Firebase allowed us to securely store user data and using Firestore allowed us to create a backend that would save calendar, journal, and profile information. We honed these features down through user testing to ensure they are plausible and helpful.

## Tech Stack
Figma for design
HTML/CSS for static pages
React for front-end reactivity
JavaScript, Firebase, Firestore for backend reactivity and storage
[react-calendar](https://www.npmjs.com/package/react-calendar) for calendar template
GitHub pages to publish

### [Firestore endpoints](https://console.firebase.google.com/u/1/project/equicare-442/firestore/databases/-default-/data) (with sample objects)
1. Users
```
<uuid> = {
  email: "sender@gmail.com",
  linkedCalendar: "<uuid>",

  notifications: [],

  partnerInvites: [
    {
      inviteStatus: "pending",
      toEmail: "receiver@gmail.com"
    }
  ],

  profileData: {
    location: "Seattle, WA",
    name: "Bethany",
    nextEvent: "None yet",
    partner: "Not connected",
    term: "Second Trimester (Week 18)"
  },

  relationshipData: {
    anniversaryDate: "1/11/2023",
    notes: "",
    relationshipStatus: "dating"
  }
}
```
2. Calendars
```
<uuid> = [
  {
    createdBy: "sender@gmail.com",
    date: "2025-11-25",
    imageURL: "blob:http://localhost:5173/9999a2dc-53fb-4b60-8b12-cf16f72bb78f",
    timestamp: 1764056511488,
    title: "doctor's appointment!"
  }
];
```

## Testing Protocol
[Prototype and Testing Protocol.pdf](https://github.com/user-attachments/files/23732791/Prototype.and.Testing.Protocol.pdf). *This file can also be found under the MVP Deliverables folder, along with our user personas.*

Any other information about our solution can be found in our pitch slides!

## Bug Tracking
While we were able to work through almost all of our bugs, we did not have time to implement a 'delete event' button from our user testing feedback, as well as website feedback that would signal to users that they have successfully created a calendar event.

### GenAI Use
We used Google Gemini to generate our logo and ChatGPT to simulate user testing with our target audience since we were not able to find any couples who are expecting a child to try user testing.
