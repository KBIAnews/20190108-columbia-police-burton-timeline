import React from "react";
import { TimelineItem } from "vertical-timeline-component-for-react";
import PropTypes from "prop-types";
import { GoogleSheetsContext } from "./GoogleSheetsContext";

export class TimelineEntry extends React.Component {
  static contextType = GoogleSheetsContext;
  static propTypes = {
    item: PropTypes.object
  };

  formatDate() {
    if (this.props.item.exactDateLabel === "no") {
      return this.props.item.date.format("MMMM YYYY");
    }
    return this.props.item.date.format("MMMM D, YYYY");
  }

  formatLinkLabel() {
    switch (this.props.item.publicationName) {
      case "Columbia Daily Tribune":
        return "Read more from the Columbia Daily Tribune";
      case "KBIA":
        return "Read more from KBIA";
      case "Columbia Missourian":
        return "Read more from the Columbia Missourian";
      default:
        return "Read more";
    }
  }

  render() {
    let categoryColor = this.context.getCategoryColor(
      this.props.item.categorySlug
    );
    return (
      <React.Fragment>
        <TimelineItem
          dateText={this.formatDate()}
          dateInnerStyle={{ background: categoryColor }}
        >
          <h3>
            <small
              style={{
                color: categoryColor
              }}
            >
              {this.context.getCategoryName(this.props.item.categorySlug)}
            </small>
          </h3>
          <h3>{this.props.item.heading}</h3>
          <p>{this.props.item.description}</p>
          <p>
            <a
              href={this.props.item.linkUrl}
              className={`timeline-button-readMore timeline-button-readMore-${
                this.props.item.categorySlug
              }`}
            >
              {this.formatLinkLabel()}
            </a>
          </p>
        </TimelineItem>
      </React.Fragment>
    );
  }
}
