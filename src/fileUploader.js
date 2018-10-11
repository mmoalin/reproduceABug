import React from 'react';
import Papa from 'papaparse';
import { setCurrentProposalId, notify, resetAll } from './redux/actions' //To remove!!
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { storeInput } from './logic';
import _ from 'lodash'
class FileUploader extends React.Component {
    constructor(props) {
        super(props);
        this.data = null;
        this.formattedData = null;
        this.handleFiles = this.handleFiles.bind(this);
 
        this.doneParsing = true;
        this.invalidFile = false;
        this.state = {
            paused: false
        };
    }

   
    handleFiles(files) {
        this.props.resetAll();
        let AssociationColumn = false;
        var reader = new FileReader();
        let container = [];
        var self = this;
        let filename;
        let options;
        reader.onload = function (e) {
            this.data = reader.result;
            // console.log(this.data)
            // let values = this.data.split(',');
            // if(values[2].trim().toLowerCase() != 'search source')
            //     AssociationColumn = true;
            // for()
            Papa.parse(this.data, {
                complete: function (results) {
                    let thirdCol = results.data[0][2].trim().toLowerCase();
                    AssociationColumn = (thirdCol != 'search source' ? true : false);
                    for (let i in results.data) {
                        if (Number(i) != 0) {
                            let proposal_id = results.data[i][0];
                            let search_term = results.data[i][1];
                            let search_source = (AssociationColumn ? results.data[i][3] : results.data[i][2]);
                            search_term = (search_term ? search_term.trim() : search_term);
                            let associated = (AssociationColumn ? results.data[i][2] : null);
                            if (AssociationColumn) {
                                container.push({
                                    proposal_id: proposal_id,
                                    search_term: search_term,
                                    associated: associated,
                                    search_source: search_source
                                });
                            } else {
                                container.push({
                                    proposal_id: proposal_id,
                                    search_term: search_term,
                                    search_source: search_source
                                });
                            }
                        }
                    }
                    // container = container.filter(item => item.proposal_id != "" && item.proposal_id != " ");
                    // container = _.uniqWith(container, (arrVal, athVal) => { return arrVal.search_term == athVal.search_term });
                    // container = _.sortBy(container, [function (o) { return o.proposal_id }]);
                    //console.log("Finished:", results.data);
                }
            });
        }
        try {
            reader.readAsText(files.target.files[0]);
            filename = files.target.files[0].name.replace('.csv', '');
            this.props.notify({ status: 'Set file name', data: filename });
            // container = container.filter(item => item.proposal_id != "" && item.proposal_id != " ");
            // container = _.uniqWith(container, (arrVal, athVal) => { return arrVal.search_term == athVal.search_term });
            // container = _.sortBy(container, [function (o) { return o.proposal_id }]);
            //console.log('at fileUploader line 147 container this:  ' +  this);
            options = { concatenatedTerms: false, container: container };
            this.props.storeInput(options);//setSearchTermsFromFile({status: 'Setting proposal id, search terms and search sources', data: container});
        } catch (err) {
            console.log('file uploader error caught');
        }
        // if (container.length > 1) {
        //     for(let i in container){
        //         let col1 = container[i].proposal_id;
        //         let col2 = container[i].search_source;
        //         let col3 = container[i].search_term;

        //         let col1Type = typeof col1;
        //         let col2Type = typeof col2;
        //         let col3Type = typeof col3;
        //         let typeInvalid = col1Type == "undefined" || col2Type == "undefined" || col3Type == "undefined";
        //         let valueInvalid = col1 == " " || col1 == "" || col2 == " " || col2 == "" || col3 == " " || col3 == ""
        //         let invalid = (typeInvalid || valueInvalid ? true : false);
        //         if (invalid) {
        //             //this.props.notify({ status: 'File Contains Invalid Data', data: filename });
        //             this.invalidFile = true;
        //             return;
        //         }
        //     }
        //     this.invalidFile = false;
        // }else{
        //     this.invalidFile = false;
        // }

    }
    render() {
        const inProgress = this.props.inProgress;
        const p = this.props.pause;
        const startBtn = inProgress ? (<Button onClick={this.handleStartSearchOnClick} disabled >Start search</Button>) :
            (<Button onClick={this.handleStartSearchOnClick}>Start search</Button>)
        const pauseBtn = this.state.pause ? (<Button bsSize="xsmall" onClick={this.pauseToggle} >Resume</Button>) :
            (inProgress ? (<Button bsSize="xsmall" onClick={this.pauseToggle} >Pause</Button>) :
                (<Button bsSize="xsmall" onClick={this.pauseToggle} disabled>Pause</Button>));
        const uploadFileButton = <Button bsStyle="primary" >Upload</Button>;
        var inputStyle = {
            textAlign: 'center'
        }
        return (
            <div>
                {pauseBtn}
                <span />
                <div >
                    <input className="fileUploader"
                        type='file' label='Upload' accept='.csv'
                        //buttonAfter={uploadFileButton} 
                        //ref={(ref) => this.handleFiles = ref }
                        onChange={this.handleFiles}
                        onAbort={() => this.setState({ invalidFile: false })}
                    />
                </div>
                {
                    this.props.fileInputData &&
                    startBtn
                }
                {
                    this.props.MultiBranches.length > 0 &&
                    <Button onClick={this.handleMultiBranchesOnClick}>Download CSV</Button>
                }
                {
                    this.invalidFile && <p style={{ color: 'red' }}> File supplied is invalid </p>
                }
            </div>
        );

    }

}

const mapStateToProps = state => {
    return {
        fileName: state.fileName,
        inProgress: state.inProgress,
        pause: state.pause,
        fileInputData: state.fileInputData,
        MultiBranches: state.MultiBranches,
        branches: state.branches,
        currentProposalID: state.currentProposalID,
        proposalIDs: state.proposalIDs,
        searchTerm: state.searchTerm,
        currentSearchTerm: state.currentSearchTerm,
        searchTermsWhichBrokeProgram: state.searchTermsWhichBrokeProgram,
        bespokeSearchMode: state.bespokeSearchMode
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        storeInput: storeInput,
        setCurrentProposalId: setCurrentProposalId,
        notify: notify,
        resetAll: resetAll
    },
        dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUploader);
