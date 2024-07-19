import { Grid } from "react-loading-icons";
import PropTypes from "prop-types";

export const LoadingIcon = ({ dataLoading }) => {
  return (
    dataLoading && (
      <div id="loadingIcon">
        <Grid stroke={"#7373e875"} fill={"#7373e875"} speed={1.5} />
      </div>
    )
  );
};

LoadingIcon.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
};
