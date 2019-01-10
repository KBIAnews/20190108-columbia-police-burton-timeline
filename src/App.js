import React, { Component } from "react";
import { Timeline } from "vertical-timeline-component-for-react";
import {
  GoogleSheetsContextConsumer,
  GoogleSheetsContextProvider
} from "./GoogleSheetsContext";
import { TimelineEntry } from "./TimelineEntry";
import GoogleSheetsFetcher from "./GoogleSheetsFetcher";
import { TitleCard } from "./TitleCard";
import { CategoryFilterPane } from "./CategoryFilterPane";
import "./App.css";
import "../node_modules/pretty-checkbox/dist/pretty-checkbox.css";

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
                  {/*<button*/}
                  {/*onClick={() => {*/}
                  {/*context.filterTimelineByCategorySlugs([*/}
                  {/*"excessive-force"*/}
                  {/*]);*/}
                  {/*}}*/}
                  {/*>*/}
                  {/*Excessive Force Only*/}
                  {/*</button>*/}
                  {/*<button*/}
                  {/*onClick={() => {*/}
                  {/*context.filterTimelineClear();*/}
                  {/*}}*/}
                  {/*>*/}
                  {/*No filters*/}
                  {/*</button>*/}
                  <CategoryFilterPane />
                  <Timeline lineColor={"#ddd"} animate={false}>
                    {context.filteredTimeline.map((el, index) => {
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
