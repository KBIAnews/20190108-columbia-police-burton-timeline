import React from "react";
import moment from "moment";

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
      workbookKey: null,
      timeline: null,
      filteredTimeline: null
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

  static elementIsAnnotation(el) {
    return el.slug.includes("--");
  }

  getLabel(key) {
    return GoogleSheetsContextProvider.getValueFromKeyValueSheet(
      this.state.rawSheetsData.labels,
      key
    );
  }

  getCategoryColor(slug) {
    return this.state.rawSheetsData.design.rows.filter(el => {
      return el.slug === slug;
    })[0].hexcolor;
  }

  getCategoryName(slug) {
    return this.state.rawSheetsData.design.rows.filter(el => {
      return el.slug === slug;
    })[0].displayname;
  }

  getCategoriesList() {
    return this.state.rawSheetsData.design
      .filter(el => {
        // Don't give me the
        return !el.slug.includes("--");
      })
      .map(el => {
        return {
          name: el.displayname,
          slug: el.slug,
          color: el.hexcolor
        };
      });
  }

  createTimeline(dataSheet) {
    let unsortedTimelineObjects = dataSheet.rows.map(row => {
      return {
        date: moment(row.date, "YYYY-MM-DD"),
        heading: row.heading,
        description: row.description,
        categorySlug: row.categoryslug,
        linkUrl: row.linkurl,
        imageUrl: row.imageurl,
        audioUrl: row.audiourl,
        exactDateLabel: row.exactdatelabel,
        publicationName: row.publicationname
      };
    });
    let sortedData = unsortedTimelineObjects.sort((a, b) => {
      // If two events happen on the same date, make sure the memo goes first.
      if (a.date - b.date === 0) {
        if (a.categorySlug === b.categorySlug) {
          return 0;
        } else if (a.categorySlug === "-------") {
          return -1;
        } else if (b.categorySlug === "-------") {
          return 1;
        } else {
          return a.categorySlug - b.categorySlug;
        }
      } else {
        // If two events do not happen on the same date, they are sorted by date.
        return a.date - b.date;
      }
    });
    this.setState({ timeline: sortedData, filteredTimeline: sortedData });
  }

  filterTimeline(query) {
    this.setState({
      filteredTimeline: this.state.timeline.filter(el => {
        return query(el);
      })
    });
  }

  filterTimelineByCategorySlugs(slugs, includeAnnotations = false) {
    this.filterTimeline(el => {
      if (slugs.includes(el.categorySlug)) {
        return true;
      } else if (
        includeAnnotations &&
        GoogleSheetsContextProvider.elementIsAnnotation(el)
      ) {
        return true;
      }
      return false;
    });
  }

  filterTimelineClear() {
    this.setState({
      filteredTimeline: this.state.timeline
    });
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
          getLabel: this.getLabel.bind(this),
          getCategoryColor: this.getCategoryColor.bind(this),
          getCategoryName: this.getCategoryName.bind(this),
          createTimeline: this.createTimeline.bind(this),
          getCategoriesList: this.getCategoriesList.bind(this),
          filterTimelineByCategorySlugs: this.filterTimelineByCategorySlugs.bind(
            this
          ),
          filterTimelineClear: this.filterTimelineClear.bind(this)
        }}
      >
        {this.props.children}
      </GoogleSheetsContext.Provider>
    );
  }
}

export let GoogleSheetsContextConsumer = GoogleSheetsContext.Consumer;
