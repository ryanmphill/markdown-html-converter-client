import PropTypes from "prop-types";

export const FormToggle = ({ formDisplay, handleDisplayChange }) => {
  return (
    <div className="form-toggle">
      <label className="form-toggle__label">
        Markdown To HTML
        <input
          type="radio"
          id="toHTMLForm"
          value="markdown"
          className="form-toggle__input"
          checked={formDisplay === "markdown"}
          onChange={handleDisplayChange}
        />
      </label>
      <label className="form-toggle__label">
        HTML To Markdown
        <input
          type="radio"
          id="toMarkdownForm"
          value="HTML"
          className="form-toggle__input"
          checked={formDisplay === "HTML"}
          onChange={handleDisplayChange}
        />
      </label>
    </div>
  );
};

FormToggle.propTypes = {
  formDisplay: PropTypes.string.isRequired,
  handleDisplayChange: PropTypes.func.isRequired,
};
