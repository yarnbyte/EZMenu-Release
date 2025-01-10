// URL of the txt file to be fetched
const txtFileUrl = "/link.txt"; // Replace with the actual URL of your .txt file

// Function to fetch and display the content
function fetchAndDisplayTxt() {
  fetch(txtFileUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = ""; // Clear loading message

      // Split the file content into lines
      const lines = data.split("\n").filter(line => line.trim() !== ""); // Remove empty lines
      lines.forEach((line) => {
        // Parse each line to separate the link and password
        const [linkUrl, password] = line.split("|").map(part => part.trim()); // Split by "|" and trim whitespace

        // Create a <div> container for the link and password
        const container = document.createElement("div");
        container.className = "link-container";

        // Create an <a> tag for the link
        const link = document.createElement("a");
        link.className = "link";
        link.href = linkUrl; // Set the href to the link
        link.target = "_blank"; // Open link in a new tab
        link.textContent = linkUrl; // Display the link as the text
        container.appendChild(link);

        // If there's a password, display it in a separate <div>
        if (password) {
          const passwordContainer = document.createElement("div");
          passwordContainer.className = "password-container";

          const passwordSpan = document.createElement("span");
          passwordSpan.className = "password";
          passwordSpan.textContent = `密码: ${password}`; // Display the password

          passwordContainer.appendChild(passwordSpan);
          container.appendChild(passwordContainer);
        }

        // Add the container to the content div
        contentDiv.appendChild(container);
      });
    })
    .catch(error => {
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = `<p class="error">Error loading content: ${error.message}</p>`;
    });
}

// Call the function to fetch and display the TXT file content
fetchAndDisplayTxt();
