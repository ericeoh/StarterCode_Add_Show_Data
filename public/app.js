// function

function del_doc(id) {
  db.collection("people")
    .doc(id)
    .delete()
    .then(() => alert("user deleted"));
}

function update_doc(ele, id) {
  // console.log(ele);
  // change every input element that is hidden to become a text input element
  // access the parent of the button and look inside of the parent

  let inputs = ele.parentNode.querySelectorAll("input");

  // change the type from hidden to text
  // inputs.forEach((i) => {
  //   i.type = "text";
  //   db.collection("people").doc(id).update({
  //     name: i.value,
  //   });
  // });

  inputs[0].type = "text";
  inputs[1].type = "text";

  db.collection("people").doc(id).update({
    name: inputs[0].value,
    color: inputs[1].value,
  });
}

// console.log(firebase);

// attach a click event listener to the button

let btn = document.querySelector("#submit");

btn.addEventListener("click", () => {
  //   alert("hello");

  let person = {
    name: document.querySelector("#name").value,
    age: parseInt(document.querySelector("#age").value),
    color: document.querySelector("#favcolor").value,
  };

  console.log(person);

  //   submit the object to firestore

  db.collection("people")
    .add(person)
    .then(() => alert("new person added!"));

  // reset the form

  document.querySelector("#name").value = "";
  document.querySelector("#age").value = "";

  //   make a call to the Db to get the latest data

  //   getData();
});

// display a list of all people
// get()

db.collection("people")
  .get()
  .then((data) => {
    // console.log(data.docs[0].data().name);

    let docs = data.docs;
    // loop through the docs array
    let html = ``;
    docs.forEach((doc) => {
      //   console.log(doc.data().name);

      html += `<p id="${doc.id}" class="box" >${doc.data().name}
      
     
      
      <input type="hidden" value= "${doc.data().name}" />

      ${doc.data().color}

      <input type="hidden" value= "${doc.data().color}" />

      <button class="is-pulled-right" onclick="update_doc(this, '${
        doc.id
      }')">update</button>
      
      <button onclick="del_doc('${
        doc.id
      }')" class="is-pulled-right">X</button> </p>`;
    });

    // console.log(html);

    document.querySelector("#all_people").innerHTML += html;
  });

//   update tim's age

// db.collection("people").doc("wAFp5SvigD9mmNEXlyS5").update({
//   name: "kelly j",
//   color: "white",
//   age: 55,
// });

// delete the user tim
// db.collection("people").doc("M8bGqfszewlni3vHYpWT").delete();

// Query Activity
// db.collection("people")
//   .where("age", ">", 20)
//   .where("name", "==", "eric2")
//   .get()
//   .then((data) => {
//     let docs = data.docs;
//     docs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// Show all people who have jackie as a friend
// db.collection("people")
//   .where("friends", "array-contains", "jackie")
//   .get()
//   .then((data) => {
//     let docs = data.docs;
//     docs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// Show all people with red or green as their favoite color
// db.collection("people")
//   .where("color", "in", ["green"])
//   .where("color", "!=", "red")

//   .get()
//   .then((data) => {
//     let docs = data.docs;
//     docs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

//add team name, city, country, top scorers, and worldwide fans to the teams collection
// db.collection("teams").add({
//   team_name: "Real Madrid",
//   city: "Madrid",
//   country: "Spain",
//   top_scorers: ["Ronaldo", "Benzema", "Harzard"],
//   worldwide_fans: 798,
// });

// db.collection("teams").add({
//   team_name: "Barcelona",
//   city: "Barcelona",
//   country: "Spain",
//   top_scorers: ["Messi", "Suarez", "Puyol"],
//   worldwide_fans: 738,
// });

// db.collection("teams").add({
//   team_name: "Manchester United",
//   city: "Manchester",
//   country: "England",
//   top_scorers: ["Cantona", "Rooney", "Ronaldo"],
//   worldwide_fans: 755,
// });

// db.collection("teams").add({
//   team_name: "Manchester United",
//   city: "Manchester",
//   country: "England",
//   top_scorers: ["Sterling", "Aguero", "Haaland"],
//   worldwide_fans: 537,
// });

// db.collection("teams").add({
//   team_name: "Brazil National Team",
//   city: "Not applicable",
//   country: "Brazil",
//   top_scorers: ["Ronaldinho", "Cafu", "Bebeto"],
//   worldwide_fans: 950,
// });

// db.collection("teams").add({
//   team_name: "Argentina national team",
//   city: "Not applicable",
//   country: "Argentina",
//   top_scorers: ["Messi", "Batistuta", "Maradona"],
//   worldwide_fans: 888,
// });

// db.collection("teams").add({
//   team_name: "Atletico Madrid",
//   city: "Madrid",
//   country: "Spain",
//   top_scorers: ["Aragonés", "Griezmann", "Torez"],
//   worldwide_fans: 400,
// });

// Show all teams in Spain
// db.collection("teams")
//   .where("country", "==", "Spain")
//   .get()
//   .then((data) => {
//     let docs = data.docs;
//     docs.forEach((d) => {
//       console.log(d.data());
//     });
//   });

// Show all teams in Madrid, Spain
db.collection("teams")
  .where("country", "==", "Spain")
  .where("city", "==", "Madrid")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((d) => {
      console.log(d.data());
    });
  });
// Show all national teams (Remember there might be new national teams added later)
db.collection("teams")
  .where("city", "==", "Not applicable")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((d) => {
      console.log(d.data());
    });
  });
// Show all teams that are not in Spain
db.collection("teams")
  .where("country", "!=", "Spain")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((d) => {
      console.log(d.data());
    });
  });
// Show all teams that are not in Spain or England
db.collection("teams")
  .where("country", "not-in", ["Spain", "England"])
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((d) => {
      console.log(d.data());
    });
  });
// Show all teams in Spain with more than 700M fans
db.collection("teams")
  .where("country", "==", "Spain")
  .where("worldwide_fans", ">", 700)
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((d) => {
      console.log(d.data());
    });
  });
// Show all teams with a number of fans in the range of 500M and 600M
db.collection("teams")
  .where("worldwide_fans", ">", 500)
  .where("worldwide_fans", "<", 600)
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((d) => {
      console.log(d.data());
    });
  });
// Show all teams where Ronaldo is a top scorer
db.collection("teams")
  .where("top_scorers", "array-contains", "Ronaldo")
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((d) => {
      console.log(d.data());
    });
  });
// Show all teams where Ronaldo,  Maradona, or Messi is a top scorer
db.collection("teams")
  .where("top_scorers", "array-contains-any", ["Ronaldo", "Maradona", "Messi"])
  .get()
  .then((data) => {
    let docs = data.docs;
    docs.forEach((d) => {
      console.log(d.data());
    });
  });
// Update fans as follows:
// 1.	Real Madrid: 811 M worldwide fans. Also, change team name to Real Madrid FC
db.collection("teams").doc("7Oyiiuk1kvPpXKrMyuXu").update({
  team_name: "Real Madrid FC",
  worldwide_fans: 811,
});
// 2.	Barcelona: 747 M worldwide fans. Also, change team name to FC Barcelona
db.collection("teams").doc("t2sewG4zE0MzQIb13M6W").update({
  team_name: "FC Barcelona",
  worldwide_fans: 747,
});
// Next, we want to update the top scorers (array) as follows:
// 1.	Real Madrid: Remove Hazard from the list and add Crispo to the list
db.collection("teams")
  .doc("7Oyiiuk1kvPpXKrMyuXu")
  .update({
    top_scorers: firebase.firestore.FieldValue.arrayUnion("Crispo"),
  });
db.collection("teams")
  .doc("7Oyiiuk1kvPpXKrMyuXu")
  .update({
    top_scorers: firebase.firestore.FieldValue.arrayRemove("Harzard"),
  });
// 2.	Barcelona: Remove Puyol from the list and add Deco to the list
db.collection("teams")
  .doc("t2sewG4zE0MzQIb13M6W")
  .update({
    top_scorers: firebase.firestore.FieldValue.arrayUnion("Deco"),
  });
db.collection("teams")
  .doc("t2sewG4zE0MzQIb13M6W")
  .update({
    top_scorers: firebase.firestore.FieldValue.arrayRemove("Puyol"),
  });

// Adding new fields(color) to existing documents
// Real Madrid: White (home). Black (away)
// Barcelona: Red (home). Gold (away)
db.collection("teams")
  .doc("7Oyiiuk1kvPpXKrMyuXu")
  .update({
    color: {
      home: "White",
      away: "Black",
    },
  });
db.collection("teams")
  .doc("t2sewG4zE0MzQIb13M6W")
  .update({
    color: {
      home: "Red",
      away: "Gold",
    },
  });

// Next, we want to update the jersey colors (object) as follows:
// Real Madrid: Purple jersey color for away matches
// Barcelona: Pink jersey color for away matches
db.collection("teams")
  .doc("7Oyiiuk1kvPpXKrMyuXu")
  .update({
    color: {
      home: "White",
      away: "Purple",
    },
  });
db.collection("teams")
  .doc("t2sewG4zE0MzQIb13M6W")
  .update({
    color: {
      home: "Red",
      away: "Pink",
    },
  });
