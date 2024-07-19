import { useRef, useState } from "react";
import { convertToHTML } from "../api/converter";
import PropTypes from "prop-types";
import { ConverterForm } from "./ConverterForm";

export const MarkdownForm = ({
  copyState,
  setCopyState,
  setConvertedText,
  setDataLoading,
}) => {
  const userTextInput = useRef(null);
  const [errorMessages, setErrorMessages] = useState([]);

  // Define placeholder example for input field
  const placeholderText = `
    # This is a heading
    ## This is a sub-heading

    This is a paragraph with some **bold** text and *italic* text.

    - This is a list item with a link [link](#)

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
      markdown: userTextInput.current.value,
    };

    try {
      const response = await convertToHTML(data);
      setConvertedText(response?.html);
      e.target.disabled = false;
      setDataLoading(false);
    } catch (error) {
      console.error(error);
      window.alert(
        `Unable to make request. Note that the API is currently being served over HTTP, 
        and your browser may block the request this site is loaded over HTTPS. Make sure 
        the site url begins with http://, and try again.`
      );
      e.target.disabled = false;
      setDataLoading(false);
    }
  };
  return (
    <>
      <ConverterForm
        labelText="Paste Your Markdown Here"
        placeholderText={placeholderText}
        userTextInput={userTextInput}
        errorMessages={errorMessages}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

MarkdownForm.propTypes = {
  copyState: PropTypes.object.isRequired,
  setCopyState: PropTypes.func.isRequired,
  setConvertedText: PropTypes.func.isRequired,
  setDataLoading: PropTypes.func.isRequired,
};
