import * as firebase from "firebase";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// database.ref("expenses").push({
//   description: "Rent",
//   note: "",
//   amount: 103500,
//   createdAt: 976123123123
// });
// database
//   .ref("expenses")
//   .once("value")
//   .then(snapshot => {
//     const expenses = [];

//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });

//     console.log(expenses);
//   })
//   .catch(e => {
//     console.log("Error");
//   });

// const onValueChange = database.ref().on("value", snapshot => {
//   console.log(snapshot.val());
// }, e => {
// 	console.log('Error')
// });

// setTimeout(() => {
//   database.ref("name").set('Mike');
// }, 3000);
// database
//   .ref()
//   .once("value")
//   .then(snapshot => {
//     const val = snapshot.val();
//     console.log(val);
//   })
//   .catch(e => {
//     console.log("error");
//   });
