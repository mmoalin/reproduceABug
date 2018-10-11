import _ from 'lodash';
export const key = 'timer';
export const SEARCH_COMPANY = "SEARCH_COMPANY",
    FETCH_COMPANY = "FETCH_COMPANY",
    DATA_RECIEVED = "DATA_FOUND",
    NOTIFICATION = "NOTIFICATION",
    RESETALL = "RESETALL",
    MULTIRESULTSAVAILABLE = "MULTIRESULTSAVAILABLE",
    SETSEARCHTERM = "SETSEARCHTERM",
    IRRELEVANTTLA = "IRRELEVANTTLA",
    CURRENTTLASUBJECT = "setCurrentTLASubject",
    SETALTERNATIVES = "SETALTERNATIVES",
    SETSEARCHTERMSFROMFILE = "SETSEARCHTERMSFROMFILE",
    SETSEARCHTERMSCONCATENATEDFROMFILE = "SETSEARCHTERMSCONCATENATEDFROMFILE",
    SEARCHFROMFILE = "SEARCHFROMFILE",
    SETMODE = "SETMODE",
    SETPROPOSALID = "SETPROPOSALID"
export const actionTypes =
{
    SEARCH_COMPANY,
    FETCH_COMPANY,
    DATA_RECIEVED,
    NOTIFICATION,
    SETSEARCHTERM,
    IRRELEVANTTLA,
    SETALTERNATIVES,
    SEARCHFROMFILE,
    SETSEARCHTERMSFROMFILE,
    SETSEARCHTERMSCONCATENATEDFROMFILE,
    SETMODE,
    SETPROPOSALID,
    setCurrentTLASubject
};
export const actions = {
    searchCompany, fetchCompany, companyData
};

export function resetAll() {
    return {
        type: RESETALL
    }
}
export function setMode(mode) {
    return {
        type: SETMODE,
        payload: { mode }
    }
}
export function setCurrentProposalId(proposalID) {
    return {
        type: SETPROPOSALID,
        payload: { proposalID }
    }
}

export function SearchTermsFromFile({ status, data }) {
    return {
        type: SEARCHFROMFILE,
        payload: { status, data }
    }
}

export function setConcatenatedSearchTermsFromFile({ status, data }) {
    return {
        type: SETSEARCHTERMSCONCATENATEDFROMFILE,
        payload: { status, data }
    }
}
export function setSearchTermsFromFile({ status, data }) {
    // data = data.filter(item => item.proposal_id != "" && item.proposal_id != " ");
    // data = _.uniqWith(data, (arrVal, athVal) => { return arrVal.search_term == athVal.search_term });
    return {
        type: SETSEARCHTERMSFROMFILE,
        payload: { status, data }
    }
}

export function notifyForIrrelevantTLA({ status, company, reason }) {
    console.log(reason);
    return {
        type: IRRELEVANTTLA,
        payload: { status, company, reason }
    }
}

export function displayResults({ status, data }) {
    console.log(status);
    return {
        type: MULTIRESULTSAVAILABLE,
        payload: { status, data }
    }
}
export function searchCompany(text) {
    console.log('A search was submitted: ' + text);
    return {
        type: SEARCH_COMPANY,
        payload: text
    }
}//currentSearchTerm
export function fetchCompany(text) {
    return {
        type: FETCH_COMPANY,
        payload: text
    }
}
export function setCurrentTLASubject(payload) {
    return {
        type: CURRENTTLASUBJECT,
        payload: payload
    }
}
export function setPreviousNodesOptions(payload) {
    return {
        type: SETALTERNATIVES,
        payload: payload
    }
}
export function companyData({ status, data }) {
    return {
        type: DATA_RECIEVED,
        payload: { status, data }
    }
}
export function notify({ status, data }) {
    return {
        type: NOTIFICATION,
        payload: { status, data }
    }
}
export function setSearchTerm({ status, term }) {
    return {
        type: SETSEARCHTERM,
        payload: { status, term }
    }
}
