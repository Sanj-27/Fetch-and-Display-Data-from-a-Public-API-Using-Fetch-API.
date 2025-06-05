document.addEventListener("DOMContentLoaded", () => {
  const userContainer = document.getElementById("userContainer");
  const errorMessage = document.getElementById("errorMessage");
  const reloadBtn = document.getElementById("reloadBtn");

  const fetchUserData = async () => {
    userContainer.innerHTML = ""; 
    errorMessage.textContent = "";

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const users = await response.json();

      if (users.length === 0) {
        userContainer.innerHTML = "<p>No user data available.</p>";
        return;
      }

      users.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        userCard.innerHTML = `
          <h3>${user.name}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        `;
        userContainer.appendChild(userCard);
      });
    } catch (error) {
      errorMessage.textContent = `Failed to fetch user data: ${error.message}`;
    }
  };

  reloadBtn.addEventListener("click", fetchUserData);

  fetchUserData();
});
