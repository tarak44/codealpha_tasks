async function translateText() {
  const apiKey = "YOUR_GOOGLE_API_KEY_HERE";  // Replace with your API key
  const text = document.getElementById("inputText").value.trim();
  const source = document.getElementById("sourceLang").value;
  const target = document.getElementById("targetLang").value;

  if (!text) {
    alert("Please enter text to translate.");
    return;
  }

  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        q: text,
        source: source === "auto" ? undefined : source,
        target: target,
        format: "text"
      })
    });

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;
    document.getElementById("outputText").innerText = translatedText;

  } catch (error) {
    console.error("Error:", error);
    alert("Translation failed: " + error.message);
  }
}

function copyText() {
  const text = document.getElementById("outputText").innerText;
  if (!text) {
    alert("No translated text to copy!");
    return;
  }
  navigator.clipboard.writeText(text)
    .then(() => alert("Copied to clipboard!"))
    .catch(err => alert("Failed to copy: " + err));
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}
