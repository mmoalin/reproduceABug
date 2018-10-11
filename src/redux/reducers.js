import { SETPROPOSALID, FETCH_COMPANY, SETMODE, SETSEARCHTERMSCONCATENATEDFROMFILE, SEARCHFROMFILE, SETSEARCHTERMSFROMFILE, CURRENTTLASUBJECT, SETSEARCHTERM, IRRELEVANTTLA, SEARCH_COMPANY, DATA_RECIEVED, NOTIFICATION, RESETALL } from './actions'

export const initialState =
{
  mode: 0
  , fileName: null
  , currentProposalID: null
  , proposalIDs: [] //Create actions and reducers to then loop using within app.js to continue searching within the data of the file.
  , searchTerm: null
  , allSearchTerms: []
  , status: null
  , primaryMessage: "Import a list (csv) or enter a company name to view its hierarchical top-level account name and sub-companies matches according to data from the Company Houses Data API "
  , secondaryMessage: null
  , branches: []
  , latestSearchResults: []
  , allSearchResults: []
  , latestParentSearchResults: []
  , allParentSearchResults: []
  , data_recieved: {}
  , fileInputData: null
  , concatenatedTermsFromFile: null
  , controlEntitiesResults: []
  , controlHierarchyResults: []
  , ControlEntities_NearestMatch: {}
  , latestParentSearchResultsRaw: []
  , allParentSearchResultsRaw: []
  , latestSearchResultsRaw: []
  , allSearchResultsRaw: []
  , MultiBranches: []
  , currentSearchTerm: null
  , pause: false
  , complete: false
  , progress: 0
  , inProgress: false
  , displayCountDown: false
  , searchTermsWhichBrokeProgram: [],
  visualizeTreeData: [],
  bespokeSearchMode: true,
  mergedData: []
};
export const companies = (state = initialState, action) => {

  switch (action.type) {
    case RESETALL:
      return initialState
    case SETMODE:
      return { ...state, mode: action.payload.mode }
    case SEARCH_COMPANY:
      //let tempAll = state.allSearchterms;
      //tempAll.push(action.payload.term);
      return {
        ...state,
        //allSearchTerms: tempAll,
        inProgress: true,
        data_recieved: action.payload
      }
    case SETSEARCHTERM:  //Sets the search term(s) to the state's searchTerm, allSearchTerms and branches ([{searchTerm: a.p.term, values: []}])
      let termsArray = [];
      let termBranchKeyVal = [];
      let t = action.payload.term;
      if (t.includes(',')) {
        termsArray = t.split(',');
        for (let i in termsArray) {
          termsArray[i] = termsArray[i].trim()
          termBranchKeyVal.push({ searchTerm: termsArray[i], nodes: [] });
        }
      } else {
        t = t.trim();
        termsArray.push(t);
        termBranchKeyVal.push({ searchTerm: t, nodes: [] });
      }
      return {
        ...state,
        status: action.payload.status,
        searchTerm: action.payload.term,
        allSearchTerms: termsArray,
        branches: termBranchKeyVal
      }
    case SEARCHFROMFILE:
      return {
        ...state
      }
    case CURRENTTLASUBJECT:
      return {
        ...state,
        status: action.payload.status,
        currentSearchTerm: action.payload.term
      }
    case SETPROPOSALID:
      return {
        ...state,
        currentProposalID: action.payload.proposalID
      }
    case FETCH_COMPANY:
      return {
        ...state,
        currentSearchTerm: action.payload
      }
    case IRRELEVANTTLA://
      if (action.payload.reason.includes('Program broke')) {
        let errored = state.searchTermsWhichBrokeProgram;
        let companyName = action.payload.company;
        if (action.payload.company.includes('%')) {
          companyName = action.payload.company.split('%')[0].trim();
        }
        errored.push(companyName);
        return {
          ...state,
          secondaryMessage: action.payload.reason,
          status: action.payload.status,
          searchTermsWhichBrokeProgram: errored
        }
      } else {
        return {
          ...state,
          secondaryMessage: action.payload.reason,
          status: action.payload.status,
          ControlEntities_NearestMatch: action.payload.company
        }
      }
    case NOTIFICATION:
      if (action.payload.status === "SEARCHRESULTS") {
        let tempAll = state.allSearchResults;
        tempAll.push(action.payload.data);
        return {
          ...state,
          status: action.payload.status,
          latestSearchResults: action.payload.data,
          allSearchResults: tempAll
        }
      }
      else if (action.payload.status === "2ParentsWith50%OrMoreShares")//
      {
        let all_branches = state.branches;
        let l_branch = all_branches.filter(item => item.searchTerm == state.currentSearchTerm );
        l_branch[0].nodes[0].TLAHasInvalidShares = true;
        return {
          ...state,
          branches: all_branches,
        }
      }
      else if (action.payload.status === "DisplayCountDown")//
      {
        return {
          ...state,
          displayCountDown: true
        }
      }
      else if (action.payload.status === "HideCountDown")//
      {
        return {
          ...state,
          displayCountDown: false
        }
      }
      else if (action.payload.status === "Pause")//DisplayCountDown
      {
        return {
          ...state,
          inProgress: false,
          pause: true,
        }
      }
      else if (action.payload.status === "modifySearchMode")//DisplayCountDown
      {
        return {
          ...state,
          bespokeSearchMode: (state.bespokeSearchMode ? false : true),
        }
      }
      else if (action.payload.status === "Set file name") {
        return {
          ...state,
          fileName: action.payload.data
        }
      }
      else if (action.payload.status === "File Contains Invalid Data") {
        let placeholder = {company_name: action.payload.data};
        return {
          ...state,
          status: action.payload.status,
          ControlEntities_NearestMatch: placeholder,
          secondaryMessage: action.payload.status
        }
      }
      else if (action.payload.status === "Complete") {
        return {
          ...state,
          inProgress: false,
          complete: true,
          mergedData: action.payload.data
        }
      }
      else if (action.payload.status === "Unpause") {
        return {
          ...state,
          inProgress: true,
          pause: false,
        }
      }
      else if (action.payload.status === "ResetBranch") {
        return {
          ...state,
          branches: [],
          secondaryMessage: null,
          status: null,
          //fileInputData: [],
          complete: false,
          inProgress: false,
          MultiBranches: []

        }
      }
      else if (action.payload.status === "TraverseBranch") {
        let l_branch = state.branches;
        let fullyFormedBranch = {
          hierarchy: l_branch,
          proposal_id: state.proposalIDs[action.payload.data.proposalIdPosition - 1]
        }
        let mb = state.MultiBranches;
        mb.push(fullyFormedBranch);
        console.log("pushing formed branch with associated proposalID to Multibranches")
        return {
          ...state,
          MultiBranches: mb,
          branches: [],
          secondaryMessage: null
        }
      }
      else if (action.payload.status === "TraverseFinalBranch") {
        let l_branch = state.branches;
        let fullyFormedBranch = {
          hierarchy: l_branch,
          proposal_id: state.currentProposalID
        }
        let mb = state.MultiBranches;
        mb.push(fullyFormedBranch);
        console.log("pushing formed branch with associated proposalID to Multibranches")
        return {
          ...state,
          MultiBranches: mb,
          branches: [],
          status: "Traversed Final Branch",
          secondaryMessage: null
        }
      }
     
      else if (action.payload.status === "visualizeTreeData") {

        return {
          ...state,
          visualizeTreeData: action.payload.data
        }
      }
      else if (action.payload.status === "StoreResultsRawParents") {
        let tempAll = state.allParentSearchResults;
        tempAll.push(action.payload.data);
        return {
          ...state,
          status: action.payload.status,
          latestParentSearchResultsRaw: action.payload.data,
          allParentSearchResultsRaw: tempAll
        }
      }
      else if (action.payload.status === "StoreResultsRaw") {
        let tempAll = state.allSearchResultsRaw;
        tempAll.push(action.payload.data);
        return {
          ...state,
          status: action.payload.status,
          latestSearchResultsRaw: action.payload.data,
          allSearchResultsRaw: tempAll
        }
      }
      else if (action.payload.status === "TLAPARENTSEARCHRESULTS") {
        let tempAll = state.allParentSearchResults;
        tempAll.push(action.payload.data);
        return {
          ...state,
          status: action.payload.status,
          latestParentSearchResults: action.payload.data,
          allParentSearchResults: tempAll
        }
      }
    case DATA_RECIEVED:
      return {
        ...state,
        status: action.payload.status,
        data_recieved: action.payload.data
      }
    case SETSEARCHTERMSFROMFILE:
     //action.payload.data = action.payload.data.filter(item => item.proposal_id != "" && item.proposal_id != " ");
     //action.payload.data = _.uniqWith(action.payload.data, (arrVal, athVal) => { return arrVal.search_term == athVal.search_term });
      return {
        ...state,
        status: action.payload.status,
        secondaryMessage: action.payload.status,
        fileInputData: action.payload.data
      }
    case SETSEARCHTERMSCONCATENATEDFROMFILE:
      let utils = {};
      let PIDs = utils.getProposalIDsAsArray(action.payload.data)
      return {
        ...state,
        status: action.payload.status,
        secondaryMessage: action.payload.status,
        concatenatedTermsFromFile: action.payload.data,
        proposalIDs: PIDs
      }
    default:
      return { ...state }
  }
}


export default companies
