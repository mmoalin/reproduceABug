import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { notify, setCurrentProposalId, resetAll, setSearchTermsFromFile } from './redux/actions' //To remove!!
import {  storeInput } from './logic';
import { bindActionCreators } from 'redux';
import FileUploader from './fileUploader';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
    this.visualizeTree = false;
    this.visualizeTreeData = null;
  }

  
  render() {
    return (
      <div className="App">
                  <FileUploader />
      </div>
    );
  }
}
const mapStateToProps = state => {//<Button onClick={this.tst}>tst</Button>
  return {
    mode: state.mode,
    currentProposalID: state.currentProposalID,
    proposalIDs: state.proposalIDs,
    status: state.status,
    secondaryMessage: state.secondaryMessage,
    data_recieved: state.data_recieved,
    branches: state.branches,
    latestParentSearchResults: state.latestParentSearchResults,
    latestSearchResults: state.latestSearchResults,
    allParentSearchResults: state.allParentSearchResults,
    allSearchResults: state.allSearchResults,
    allSearchTerms: state.allSearchTerms,
    allParentSearchResultsRaw: state.allParentSearchResultsRaw,
    latestParentSearchResultsRaw: state.latestParentSearchResultsRaw,
    latestSearchResultsRaw: state.latestSearchResultsRaw,
    allSearchResultsRaw: state.allSearchResultsRaw,
    ControlEntities_NearestMatch: state.ControlEntities_NearestMatch,
    currentSearchTerm: state.currentSearchTerm,
    fileInputData: state.fileInputData,
    concatenatedTermsFromFile: state.concatenatedTermsFromFile,
    pause: state.pause,
    complete: state.complete,
    inProgress: state.inProgress,
    progress: state.progress,
    displayCountDown: state.displayCountDown,
    visualizeTreeData: state.visualizeTreeData,
    mergedData: state.mergedData,
    MultiBranches: state.MultiBranches,
    bespokeSearchMode: state.bespokeSearchMode
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    resetAll: resetAll,
    setCurrentProposalId: setCurrentProposalId, notify: notify, storeInput: storeInput, setSearchTermsFromFile: setSearchTermsFromFile
  }, dispatch);
}
// const mapDispatchToProps = dispatch => ({
//   searchCompany: val => {
//       console.log("mdtp console log");
//       dispatch(searchCompany(val));
//     }
// });
export default connect(mapStateToProps, mapDispatchToProps)(App);
