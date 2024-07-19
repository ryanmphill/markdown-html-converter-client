import { useRef, useState } from "react";
import { convertToMarkdown } from "../api/converter";
import PropTypes from "prop-types";
import { ConverterForm } from "./ConverterForm";

export const HTMLForm = ({
  copyState,
  setCopyState,
  setConvertedText,
  setDataLoading,
}) => {
  const userTextInput = useRef(null);
  const [errorMessages, setErrorMessages] = useState([]);

  // Define placeholder example for input field
  const placeholderText = `
    <h1>This is a heading</h1>
    <h2>This is a sub-heading</h2>

    <p>This is a paragraph with some <b>bold<b> text and <em>italic<em> text.</p>

    <ul><li>This is a list item with a <a href="#">link</a></li></ul>

  `
    .replace(/^(?!\s*$)\s+/gm, "")
    .replace(/^\s*\n/, ""); // Remove leading whitespace

  const handleSubmit = async (e) => {
    e.preventDefault;
    const errors = [];

    if (userTextInput.current.value.length === 0) {
      errors.push({ textInputError: "Please input some text to convert" });
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    // Reset copy state and error message state
    setCopyState({ ...copyState, copied: false });
    setErrorMessages([]);

    setDataLoading(true);

    e.target.disabled = true;

    const data = {
      html: userTextInput.current.value,
    };

    try {
      const response = await convertToMarkdown(data);
      setConvertedText(response?.markdown);
      e.target.disabled = false;
      setDataLoading(false);
    } catch (error) {
      console.error(error);
      window.alert("Something went wrong");
      e.target.disabled = false;
      setDataLoading(false);
    }
  };
  return (
    <>
      <ConverterForm
        labelText="Paste Your HTML Here"
        placeholderText={placeholderText}
        userTextInput={userTextInput}
        errorMessages={errorMessages}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

HTMLForm.propTypes = {
  copyState: PropTypes.object.isRequired,
  setCopyState: PropTypes.func.isRequired,
  setConvertedText: PropTypes.func.isRequired,
  setDataLoading: PropTypes.func.isRequired,
};
