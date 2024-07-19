import { useEffect, useState } from "react";
import "./App.css";
import { ConvertedText } from "./components/ConvertedText";
import { MarkdownForm } from "./components/MarkdownForm";
import { LoadingIcon } from "./components/LoadingIcon";
import { HTMLForm } from "./components/HTMLForm";
import { FormToggle } from "./components/FormToggle";

function App() {
  const [copyState, setCopyState] = useState({
    value: "",
    copied: false,
  });
  const [convertedText, setConvertedText] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const [formDisplay, setFormDisplay] = useState("markdown");

  useEffect(() => {
    // Ensure site is loaded over http for successfull API requests
    const currentUrl = window.location.href;
    if (currentUrl.startsWith('https://')) {
      window.location.href = currentUrl.replace('https://', 'http://');
    }
  }, []);

  // Handler for when the radio button selection changes
  const handleDisplayChange = (event) => {
    setFormDisplay(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <header className="converter__header">
        <h1 className="converter__title">Markdown/HTML Converter</h1>
        <h3 className="converter__subtitle">Convert your Markdown to HTML and Vice Versa!</h3>
      </header>

      <FormToggle
        formDisplay={formDisplay}
        handleDisplayChange={handleDisplayChange}
      />

      {formDisplay === "markdown" ? (
        <MarkdownForm
          copyState={copyState}
          setCopyState={setCopyState}
          setConvertedText={setConvertedText}
          setDataLoading={setDataLoading}
        />
      ) : (
        <HTMLForm
          copyState={copyState}
          setCopyState={setCopyState}
          setConvertedText={setConvertedText}
          setDataLoading={setDataLoading}
        />
      )}
      <LoadingIcon dataLoading={dataLoading} />
      {convertedText.length > 0 && (
        <ConvertedText
          convertedText={convertedText}
          copyState={copyState}
          setCopyState={setCopyState}
        />
      )}
    </>
  );
}

export default App;
