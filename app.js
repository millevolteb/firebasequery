db.collection("teams")
  .doc("team1")
  .set({
    team_name: "Real Madrid",
    city: "Madrid",
    country: "Spain",
    top_scorers: ["Ronaldo", "Benzema", "Hazard"],
    worldwide_fans: 798,
  });

db.collection("teams")
  .doc("team2")
  .set({
    team_name: "Barcelona",
    city: "Barcelona",
    country: "Spain",
    top_scorers: ["Messi", "Suarez", "Puyol"],
    worldwide_fans: 738,
  });

db.collection("teams")
  .doc("team3")
  .set({
    team_name: "Manchester United",
    city: "Manchester",
    country: "England",
    top_scorers: ["Cantona", "Rooney", "Ronaldo"],
    worldwide_fans: 755,
  });

db.collection("teams")
  .doc("team4")
  .set({
    team_name: "Manchester City",
    city: "Manchester",
    country: "England",
    top_scorers: ["Sterling", "Aguero", "Haaland"],
    worldwide_fans: 537,
  });

db.collection("teams")
  .doc("team5")
  .set({
    team_name: "Brazil National Team",
    city: "Not applicable",
    country: "Brazil",
    top_scorers: ["Ronaldinho", "Cafu", "Bebeto"],
    worldwide_fans: 950,
  });

db.collection("teams")
  .doc("team6")
  .set({
    team_name: "Argentina National Team",
    city: "Not applicable",
    country: "Argentina",
    top_scorers: ["Messi", "Batistuta", "Maradona"],
    worldwide_fans: 888,
  });

db.collection("teams")
  .doc("team7")
  .set({
    team_name: "Atletico Madrid",
    city: "Madrid",
    country: "Spain",
    top_scorers: ["Aragonés", "Griezmann", "Torez"],
    worldwide_fans: 400,
  });

// all teams in spain
db.collection("teams")
  .where("country", "==", "Spain")
  .get()
  .then((data) => {
    let mydocs = data.docs;
    if (mydocs.length == 0) {
      console.log("no user found");
      return;
    }
    console.log(`${mydocs.length} users found`);
    mydocs.forEach((d) => {
      console.log(d.data());
    });
  });

// Show all teams in Madrid, Spain
db.collection("teams")
  .where("city", "==", "Madrid")
  .get()
  .then((data) => {
    let mydocs = data.docs;
    if (mydocs.length == 0) {
      console.log("no user found");
      return;
    }
    console.log(`${mydocs.length} users found`);
    mydocs.forEach((d) => {
      console.log(d.data());
    });
  });

// Show all national teams (Remember there might be new national teams added later)
db.collection("teams")
  .where("city", "==", "Not applicable")
  .get()
  .then((data) => {
    let mydocs = data.docs;
    if (mydocs.length == 0) {
      console.log("no user found");
      return;
    }
    console.log(`${mydocs.length} users found`);
    mydocs.forEach((d) => {
      console.log(d.data());
    });
  });

// Show all teams that are not in Spain
db.collection("teams")
  .where("country", "!=", "Spain")
  .get()
  .then((data) => {
    let mydocs = data.docs;
    if (mydocs.length == 0) {
      console.log("no user found");
      return;
    }
    console.log(`${mydocs.length} users found`);
    mydocs.forEach((d) => {
      console.log(d.data());
    });
  });

// Show all teams that are not in Spain or England
db.collection("teams")
  .where("country", "not-in", ["Spain", "England"])
  .get()
  .then((data) => {
    let mydocs = data.docs;
    if (mydocs.length == 0) {
      console.log("no user found");
      return;
    }
    console.log(`${mydocs.length} users found`);
    mydocs.forEach((d) => {
      console.log(d.data());
    });
  });

// Show all teams in Spain with more than 700M fans
db.collection("teams")
  .where("country", "==", "Spain")
  .where("worldwide_fans", ">", 700)
  .get()
  .then((data) => {
    let mydocs = data.docs;
    if (mydocs.length == 0) {
      console.log("no user found");
      return;
    }
    console.log(`${mydocs.length} users found`);
    mydocs.forEach((d) => {
      console.log(d.data());
    });
  });

// Show all teams with a number of fans in the range of 500M and 600M
db.collection("teams")
  .where("worldwide_fans", ">=", 500)
  .where("worldwide_fans", "<=", 600)
  .get()
  .then((data) => {
    let mydocs = data.docs;
    if (mydocs.length == 0) {
      console.log("no user found");
      return;
    }
    console.log(`${mydocs.length} users found`);
    mydocs.forEach((d) => {
      console.log(d.data());
    });
  });

// Show all teams where Ronaldo is a top scorer
db.collection("teams")
  .where("top_scorers", "array-contains", "Ronaldo")
  .get()
  .then((data) => {
    let mydocs = data.docs;
    if (mydocs.length == 0) {
      console.log("no user found");
      return;
    }
    console.log(`${mydocs.length} users found`);
    mydocs.forEach((d) => {
      console.log(d.data());
    });
  });

// Show all teams where Ronaldo, Maradona, or Messi is a top scorer
db.collection("teams")
  .where("top_scorers", "array-contains-any", ["Ronaldo", "Maradona", "Messi"])
  .get()
  .then((data) => {
    let mydocs = data.docs;
    if (mydocs.length == 0) {
      console.log("no user found");
      return;
    }
    console.log(`${mydocs.length} users found`);
    mydocs.forEach((d) => {
      console.log(d.data());
    });
  });

// update Real Madrid
db.collection("teams").doc("team1").update({
  worldwide_fans: 811,
  team_name: "Real Madrid FC",
});

// update Barcelona
db.collection("teams").doc("team2").update({
  worldwide_fans: 747,
  team_name: "FC Barcelona",
});

// Remove Hazard add Crispo
db.collection("teams")
  .doc("team1")
  .update({
    top_scorers: firebase.firestore.FieldValue.arrayRemove("Hazard"),
  })
  .then(() => {
    return db
      .collection("teams")
      .doc("team1")
      .update({
        top_scorers: firebase.firestore.FieldValue.arrayUnion("Crispo"),
      });
  });

// Remove Puyol, add Deco
db.collection("teams")
  .doc("team2")
  .update({
    top_scorers: firebase.firestore.FieldValue.arrayRemove("Puyol"),
  })
  .then(() => {
    return db
      .collection("teams")
      .doc("team2")
      .update({
        top_scorers: firebase.firestore.FieldValue.arrayUnion("Deco"),
      });
  });

// Real Madrid Colors
db.collection("teams")
  .doc("team1")
  .update({
    color: {
      home: "White",
      away: "Black",
    },
  });

// Barcelona Colors
db.collection("teams")
  .doc("team2")
  .update({
    color: {
      home: "Red",
      away: "Gold",
    },
  });

// Update Real Madrid Colors
db.collection("teams")
  .doc("team1")
  .update({
    color: {
      home: "White",
      away: "Purple",
    },
  });

// Update Barcelona Colors
db.collection("teams")
  .doc("team2")
  .update({
    color: {
      home: "Red",
      away: "Pink",
    },
  });
