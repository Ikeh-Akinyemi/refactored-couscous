import("refactored-couscous").then((js) => {
  function splitIntoSentences(text) {
    return text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  }

  const index = new js.Index();

  document.getElementById('buildIndexButton').addEventListener('click', async () => {
    const fileInput = document.getElementById('fileInput');
    const urlInput = document.getElementById('urlInput');

    const loadingDiv = document.getElementById('loading');
    loadingDiv.style.display = 'block';

    if (fileInput.files.length) {
      const file = fileInput.files[0];
      const content = await file.text();
      const sentences = splitIntoSentences(content);
      sentences.forEach(sentence => {
        if (sentence.trim()) {
          console.log(sentence)
          index.add(sentence.trim());
        }
      });
    } else if (urlInput.value) {
      try {
        const response = await fetch(urlInput.value);
        const content = await response.text();
        const sentences = splitIntoSentences(content);
        sentences.forEach(sentence => {
          if (sentence.trim()) {
            index.add(sentence.trim());
          }
        });
      } catch (error) {
        console.error("Error fetching URL:", error);
      }
    }

    loadingDiv.style.display = 'none';
  });

  document.getElementById('searchButton').addEventListener('click', () => {
    const loadingDiv = document.getElementById('loading');
    loadingDiv.style.display = 'block';

    const query = document.getElementById('searchInput').value;
    const results = index.search(query);

    console.log(results)


    loadingDiv.style.display = 'none';

    displayResults(results);
  });

  function displayResults(results) {
    const resultsList = document.getElementById('results');
    resultsList.innerHTML = ''; // Clear previous results

    results.forEach(result => {
        const listItem = document.createElement('li');
        listItem.textContent = result;
        resultsList.appendChild(listItem);
    });
  }
});
