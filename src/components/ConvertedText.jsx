import { CopyToClipboard } from "react-copy-to-clipboard";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

export const ConvertedText = ({ convertedText, copyState, setCopyState }) => {
  const copyBlockRef = useRef(null);

  // Scroll the user to the copy block when the text is converted, after component mounts
  useEffect(() => {
    if (copyBlockRef.current && convertedText) {
      copyBlockRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [convertedText]);

  return (
    <>
      <section ref={copyBlockRef} className="copy-block__container">
        <CopyToClipboard
          text={convertedText}
          onCopy={() => setCopyState({ ...copyState, copied: true })}
        >
          <button>Copy to clipboard 📋</button>
        </CopyToClipboard>
        {copyState?.copied ? <div id="copyMessage">Copied.</div> : <></>}
        <pre className="copy-block__code-block">
          <code>{convertedText}</code>
        </pre>
      </section>
    </>
  );
};

ConvertedText.propTypes = {
  convertedText: PropTypes.string.isRequired,
  copyState: PropTypes.object.isRequired,
  setCopyState: PropTypes.func.isRequired,
};
