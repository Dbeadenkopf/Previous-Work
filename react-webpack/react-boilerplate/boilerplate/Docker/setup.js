/* eslint-disable no-undef */

// // db.createUser({
// //   user: 'steveRead',
// //   pwd: 'steve',
// //   roles: [
// //     {
// //       role: 'read',
// //       db: 'movies',
// //     },
// //   ],
// // });

// // db.createUser({
// //   user: 'steveWrite',
// //   pwd: 'steve',
// //   roles: [
// //     {
// //       role: 'readWrite',
// //       db: 'movies',
// //     },
// //   ],
// // });

// db.createUser({
//   user: 'steve',
//   pwd: 'steve',
//   roles: [
//     {
//       role: 'readWrite',
//       db: 'movies',
//     },
//   ],
// });

// db.auth('root', 'root');

// db = db.getSiblingDB('movies');

// db.createUser({
//   user: 'steve',
//   pwd: 'steve',
//   roles: [
//     {
//       role: 'readWrite',
//       db: 'movies',
//     },
//   ],
// });

mongo_db.createUser({
  user: "yourAdminUserName",
  pwd: "yourAdminPassword",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }],
});
