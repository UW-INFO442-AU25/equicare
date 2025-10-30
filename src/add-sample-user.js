import { createUser, addJournalEntry } from "./db.js";

async function addSampleUser() {
  const userId = "sampleuser";
  const email = "sampleuser@gmail.com";
  const password = "samplepassword";
  const linkedCalendar = "calendar1";

  await createUser(userId, email, linkedCalendar);

  await addJournalEntry(userId, "2025-10-13", "Had a great day, went hiking. This is a sample entry");
  await addJournalEntry(userId, "2025-10-12", "Worked on my React project. This is a sample entry");

  console.log("Sample user added!");
}

addSampleUser();
