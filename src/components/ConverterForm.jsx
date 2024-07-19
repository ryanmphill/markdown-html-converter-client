import PropTypes from "prop-types";

export const ConverterForm = ({
  labelText,
  placeholderText,
  userTextInput,
  errorMessages,
  handleSubmit,
}) => {
  return (
    <div className="converter-form__container">
      <section className="converter-form__form-section">
        <div className="converter-form__form-field">
          <label htmlFor="userTextInput">{labelText}</label>
          <textarea
            className="converter-form__input"
            id="userTextInput"
            placeholder={placeholderText}
            ref={userTextInput}
          ></textarea>

          {errorMessages.some((obj) => "textInputError" in obj) &&
            errorMessages.map(
              (error, index) =>
                "textInputError" in error && (
                  <div
                    key={`textInputError-${index}`}
                    className="error_message"
                  >
                    {error.textInputError}
                  </div>
                )
            )}
        </div>

        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </section>
    </div>
  );
};

ConverterForm.propTypes = {
  labelText: PropTypes.string.isRequired,
  placeholderText: PropTypes.string.isRequired,
  userTextInput: PropTypes.object.isRequired,
  errorMessages: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
