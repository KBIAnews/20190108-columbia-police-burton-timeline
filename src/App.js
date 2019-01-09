import React, { Component } from "react";
import { Timeline } from "vertical-timeline-component-for-react";
import {
  GoogleSheetsContextConsumer,
  GoogleSheetsContextProvider
} from "./GoogleSheetsContext";
import { TimelineEntry } from "./TimelineEntry";
import GoogleSheetsFetcher from "./GoogleSheetsFetcher";
import { TitleCard } from "./TitleCard";
import "./App.css";

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <GoogleSheetsContextProvider>
          <GoogleSheetsFetcher
            sheetURL={
              "https://docs.google.com/spreadsheets/d/1xb0LRTPEBkNPlWgh1APTmJJvrOgDlN1j3HtbpahaYRE/"
            }
          />
          <TitleCard />
          <GoogleSheetsContextConsumer>
            {context =>
              !context.pageMustSuspend && (
                <React.Fragment>
                  <Timeline lineColor={"#ddd"}>
                    {context.timeline.map((el, index) => {
                      return (
                        <TimelineEntry item={el} key={`te-procGen-${index}`} />
                      );
                    })}
                  </Timeline>
                </React.Fragment>
              )
            }
          </GoogleSheetsContextConsumer>
        </GoogleSheetsContextProvider>
      </div>
    );
  }
}

export default App;
