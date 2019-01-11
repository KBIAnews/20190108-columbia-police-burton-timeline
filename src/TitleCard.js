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
        <a className="contain-kbia-logo" href="https://www.kbia.org">
          <img
            style={{
              position: "absolute",
              maxWidth: "100px",
              top: "20px",
              left: "20px"
            }}
            src="https://s3.amazonaws.com/media.kbia.org/logos/kbia-wht.png"
            alt="KBIA Logo"
          />
        </a>

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
                  <div className="organizerContainer">
                    <h1>{context.getLabel("headline")}</h1>
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <div
                      className="subhed"
                      dangerouslySetInnerHTML={{
                        __html: context.getLabel("subhed")
                      }}
                    />
                    <div className="credit">
                      <p>{context.getLabel("credit")}</p>
                    </div>
                  </div>
                </React.Fragment>
              );
            }
          }}
        </GoogleSheetsContextConsumer>
      </header>
    );
  }
}
