import React from "react";

export const defaultSheetContext = {};

export const GoogleSheetsContext = React.createContext(defaultSheetContext);

export class GoogleSheetsContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageMustSuspend: true,
      pageShouldRemindScrollable: false,
      rawWorkbookData: null,
      rawSheetsData: null,
      workbookKey: null
    };
  }

  setRawSheetsData(data) {
    this.setState({
      rawSheetsData: data
    });
  }

  setRawWorkbookData(data) {
    this.setState({
      rawWorkbookData: data
    });
  }

  setWorkbookKey(key) {
    this.setState({
      workbookKey: key
    });
  }

  removeSuspense() {
    this.setState({
      pageMustSuspend: false
    });
  }

  imposeSuspense() {
    this.setState({
      pageMustSuspend: true
    });
  }

  static getValueFromKeyValueSheet(sheet, key) {
    return sheet.rows.filter(el => {
      return el.key === key;
    })[0].value;
  }

  getLabel(key) {
    return GoogleSheetsContextProvider.getValueFromKeyValueSheet(
      this.state.rawSheetsData.labels,
      key
    );
  }

  render() {
    return (
      <GoogleSheetsContext.Provider
        value={{
          ...this.state,
          setRawSheetsData: this.setRawSheetsData.bind(this),
          setRawWorkbookData: this.setRawWorkbookData.bind(this),
          setWorkbookKey: this.setWorkbookKey.bind(this),
          removeSuspense: this.removeSuspense.bind(this),
          imposeSuspense: this.imposeSuspense.bind(this),
          getLabel: this.getLabel.bind(this)
        }}
      >
        {this.props.children}
      </GoogleSheetsContext.Provider>
    );
  }
}

export let GoogleSheetsContextConsumer = GoogleSheetsContext.Consumer;
