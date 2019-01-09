import React, { Component } from "react";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import {
  GoogleSheetsContextConsumer,
  GoogleSheetsContextProvider
} from "./GoogleSheetsContext";
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
                    <TimelineItem
                      key="001"
                      dateText="11/2010 – Present"
                      style={{ color: "#e86971" }}
                    >
                      <h3>
                        <small>Topic Header</small>
                      </h3>
                      <h3>Item Name</h3>
                      <p>
                        Est incididunt sint eu minim dolore mollit velit velit
                        commodo ex nulla exercitation. Veniam velit adipisicing
                        anim excepteur nostrud magna nostrud aliqua dolor. Sunt
                        aute est duis ut nulla officia irure reprehenderit
                        laborum fugiat dolore in elit. Adipisicing do qui duis
                        Lorem est.
                      </p>
                      <p>
                        Est incididunt sint eu minim dolore mollit velit velit
                        commodo ex nulla exercitation. Veniam velit adipisicing
                        anim excepteur nostrud magna nostrud aliqua dolor. Sunt
                        aute est duis ut nulla officia irure reprehenderit
                        laborum fugiat dolore in elit. Adipisicing do qui duis
                        Lorem est.
                      </p>
                    </TimelineItem>
                    <TimelineItem
                      key="004"
                      dateText="08/2008 – 11/2008"
                      dateInnerStyle={{ background: "#76bb7f" }}
                    >
                      <h3>
                        <small>Topic Header</small>
                      </h3>
                      <h3>Item Name</h3>
                      <p>
                        Est incididunt sint eu minim dolore mollit velit velit
                        commodo ex nulla exercitation. Veniam velit adipisicing
                        anim excepteur nostrud magna nostrud aliqua dolor. Sunt
                        aute est duis ut nulla officia irure reprehenderit
                        laborum fugiat dolore in elit. Adipisicing do qui duis
                        Lorem est.
                      </p>
                      <p>
                        Est incididunt sint eu minim dolore mollit velit velit
                        commodo ex nulla exercitation. Veniam velit adipisicing
                        anim excepteur nostrud magna nostrud aliqua dolor. Sunt
                        aute est duis ut nulla officia irure reprehenderit
                        laborum fugiat dolore in elit. Adipisicing do qui duis
                        Lorem est.
                      </p>
                    </TimelineItem>
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
