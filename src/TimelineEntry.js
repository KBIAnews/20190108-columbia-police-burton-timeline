import React from "react";
import { TimelineItem } from "vertical-timeline-component-for-react";
import PropTypes from "prop-types";
import {
  GoogleSheetsContext,
  GoogleSheetsContextProvider
} from "./GoogleSheetsContext";

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
        {!GoogleSheetsContextProvider.elementIsAnnotation(this.props.item) ? (
          <TimelineItem
            dateText={this.formatDate()}
            dateInnerStyle={{ background: categoryColor }}
            visibilitySensorProps={{ active: false }}
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
                style={{ backgroundColor: categoryColor }}
              >
                {this.formatLinkLabel()}
              </a>
            </p>
          </TimelineItem>
        ) : (
          <TimelineItem
            bodyContainerStyle={{
              background: "none",
              fontSize: "1.2em",
              color: "#444"
            }}
            dateStyle={{
              display: "none"
            }}
            visibilitySensorProps={{ active: false }}
          >
            <h3 style={{ marginBottom: "1em" }}>{this.props.item.heading}</h3>
            <div
              className="annotationText"
              dangerouslySetInnerHTML={{
                __html: this.props.item.description
              }}
            />
          </TimelineItem>
        )}
      </React.Fragment>
    );
  }
}
