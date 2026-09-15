fetch("data/content.json")
  .then(response => response.json())
  .then(data => {
    console.log("TGT content loaded:", data);
  })
  .catch(error => {
    console.error("TGT content failed to load:", error);
  });
