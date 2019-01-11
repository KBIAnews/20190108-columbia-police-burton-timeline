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

  componentDidMount() {
    this.checkAllCheckboxNodes();
  }

  checkAllCheckboxNodes() {
    this.getCheckboxNodesAsArray().map(element => {
      element.checked = true;
      return true;
    });
  }

  toggleExposeFilterOptions() {
    this.setState({
      filterOptionsShouldExpose: !this.state.filterOptionsShouldExpose
    });
  }

  getCheckboxNodesAsArray() {
    //  extract the node list from the form
    //  it looks like an array, but lacks array methods
    const { category } = this.form;

    // convert node list to an array
    return Array.prototype.slice.call(category);
  }

  clearFilterAndDisplay() {
    this.checkAllCheckboxNodes();

    this.context.filterTimelineClear();
  }

  handleSubmit = e => {
    e.preventDefault();

    //  extract the node list from the form
    //  it looks like an array, but lacks array methods
    const { category } = this.form;

    // convert node list to an array
    const checkboxArray = Array.prototype.slice.call(category);

    // extract only the checked checkboxes
    const checkedCheckboxes = checkboxArray.filter(input => input.checked);

    if (checkedCheckboxes.length <= 0) {
      this.clearFilterAndDisplay();
    } else {
      // use .map() to extract the value from each checked checkbox
      const checkedCheckboxesValues = checkedCheckboxes.map(
        input => input.value
      );
      this.context.filterTimelineByCategorySlugs(checkedCheckboxesValues);
    }
  };

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
        <div className={"organizerContainer"}>
          <div
            className={`filterForm filterForm--${
              this.state.filterOptionsShouldExpose ? "show" : "hide"
            }`}
          >
            <form onSubmit={this.handleSubmit} ref={form => (this.form = form)}>
              {this.context.getCategoriesList().map(category => {
                return (
                  <div
                    className="pretty p-default"
                    key={`form-filter-item-${category.slug}`}
                  >
                    <input
                      type="checkbox"
                      value={category.slug}
                      name="category"
                    />
                    <div className="state">
                      <label
                        style={{ display: "block", color: category.color }}
                      >
                        {category.name}
                      </label>
                    </div>
                  </div>
                );
              })}
              <button
                className={"categoryFilter--button"}
                type="submit"
                value="Apply Filter"
                ref={submit => (this.submit = submit)}
              >
                Apply Filter
              </button>
              <button
                className={"categoryFilter--button"}
                value="Clear Filter"
                ref={clearFilterButton =>
                  (this.clearFilterButton = clearFilterButton)
                }
                onClick={this.clearFilterAndDisplay.bind(this)}
              >
                Clear Filter
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
