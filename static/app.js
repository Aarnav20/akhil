document.getElementById('analyze-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  document.getElementById('loading').style.display = 'block';
  document.getElementById('result').style.display = 'none';

  try {
    const response = await fetch('/analyze-resume', {
      method: 'POST',
      body: formData
    });
    const html = await response.text();
    // Extract the result from the returned HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const resultBox = doc.querySelector('.result-box');
    if (resultBox) {
      document.getElementById('result').innerHTML = resultBox.innerHTML;
      document.getElementById('result').style.display = 'block';
    } else {
      document.getElementById('result').innerHTML = "No result found.";
      document.getElementById('result').style.display = 'block';
    }
  } catch (err) {
    document.getElementById('result').innerHTML = "Error: " + err.message;
    document.getElementById('result').style.display = 'block';
  } finally {
    document.getElementById('loading').style.display = 'none';
  }
});
