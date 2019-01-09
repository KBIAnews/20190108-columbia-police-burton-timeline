import { Component } from "react";
import logo from "./logo.svg";
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
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Edit <code>src/App.js</code> and save to reload.
                  </p>
                  <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn React
                  </a>
                </React.Fragment>
              );
            }
          }}
        </GoogleSheetsContextConsumer>
      </header>
    );
  }
}
