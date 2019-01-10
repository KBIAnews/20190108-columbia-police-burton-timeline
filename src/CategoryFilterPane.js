import React from "react";
import { GoogleSheetsContext } from "./GoogleSheetsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export class CategoryFilterPane extends React.Component {
  static contextType = GoogleSheetsContext;

  constructor(props) {
    super(props);
    this.state = {
      filterOptionsShouldExpose: false,
      filterEnabled: false
    };
  }

  componentDidMount() {}

  toggleExposeFilterOptions() {
    this.setState({
      filterOptionsShouldExpose: !this.state.filterOptionsShouldExpose
    });
  }

  render() {
    return (
      <React.Fragment>
        <div
          className="organizerContainer clearfix"
          style={{
            marginTop: "1em"
          }}
        >
          <button
            className={"categoryFilter--button categoryFilter--button-filter"}
            onClick={this.toggleExposeFilterOptions.bind(this)}
            style={
              this.state.filterOptionsShouldExpose
                ? {
                    color: "#999999"
                  }
                : {}
            }
          >
            <FontAwesomeIcon icon={faFilter} />
            {this.state.filterOptionsShouldExpose
              ? "Close Filter Options"
              : "Filter This Timeline"}
          </button>
        </div>
      </React.Fragment>
    );
  }
}
