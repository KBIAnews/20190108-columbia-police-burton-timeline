import { Component } from "react";
import React from "react";
import { GoogleSheetsContextConsumer } from "./GoogleSheetsContext";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export class TitleCard extends Component {
  render() {
    return (
      <header className="App-header">
        <GoogleSheetsContextConsumer>
          {context => {
            if (context.pageMustSuspend) {
              return (
                <React.Fragment>
                  <GridLoader
                    css={override}
                    sizeUnit={"px"}
                    size={15}
                    color={"#eee"}
                    loading={context.pageMustSuspend}
                  />
                  <p>Loading...</p>
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment>
                  <h1>{context.getLabel("headline")}</h1>
                  {/*<img src={logo} className="App-logo" alt="logo" />*/}
                  <div
                    className="subhed"
                    dangerouslySetInnerHTML={{
                      __html: context.getLabel("subhed")
                    }}
                  />
                </React.Fragment>
              );
            }
          }}
        </GoogleSheetsContextConsumer>
      </header>
    );
  }
}
