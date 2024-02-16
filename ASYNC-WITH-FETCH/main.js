async function loadUsers() {
  const response = await fetch("data/users.json");

  const users = response.json();

  return users;
}

document.addEventListener("DOMContentLoaded", async () => {
  let users = [];
  try {
    users = await loadUsers();
  } catch (e) {
    console.log("Error!");
    console.log(e);
  }
  console.log(users);
});
