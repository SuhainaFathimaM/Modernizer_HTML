import React, { useState } from "react";
import "./App.css";

function App() {
  const [htmlContent, setHtmlContent] = useState("");
  const [modernizedHtml, setModernizedHtml] = useState("");

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setHtmlContent(reader.result);
    };
    reader.readAsText(file);
  };

  const handleModernizeClick = async () => {
    const response = await fetch("http://localhost:5000/modernize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ html: htmlContent }),
    });
    const data = await response.json();
    setModernizedHtml(data.modernizedHtml);
  };
  

  return (
    <div className="App">
      <h1>HTML Modernizer</h1>
      <input
        type="file"
        accept=".html"
        onChange={handleFileChange}
        className="file-input"
      />
      <button onClick={handleModernizeClick} className="modernize-button">
        Modernize HTML
      </button>

      <h2>Original HTML</h2>
      <div className="preview">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      <h2>Modernized HTML</h2>
      <div className="preview">
        <div dangerouslySetInnerHTML={{ __html: modernizedHtml }} />
      </div>
    </div>
  );
}

export default App;
