import { searchCompany, setSearchTermsFromFile, setCurrentTLASubject, displayResults, setConcatenatedSearchTermsFromFile, setMode } from './redux/actions';
import _ from 'lodash';

export const storeInput = options => dispatch => {
  if (!options.concatenatedTerms) {
    options.container = options.container.filter(item => item.proposal_id != "" && item.proposal_id != " ");
    //options.container = _.uniqWith(options.container, (arrVal, athVal) => { return arrVal.search_term == athVal.search_term });
    dispatch(setSearchTermsFromFile({ status: 'Storing proposal id, search terms and search sources', data: options.container }));
  } else
    dispatch(setConcatenatedSearchTermsFromFile({ status: 'Storing search terms concatenated from file', data: options.container }));
}
