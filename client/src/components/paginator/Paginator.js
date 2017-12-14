import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './paginator.css';

class Paginator extends Component {
    state = {
        currentPage: 1,
        rangeBottom: 1,
        rangeTop: 1
    }

    componentDidMount() {
        this.setPageRange();
    }

    render () {
        const numArray = [];

        for (let i = this.state.rangeBottom; i < this.state.rangeTop + 1; i++) {
            numArray.push(<div key={i} style={{marginLeft: '10px', marginRight: '10px'}} onClick={() => this.selectPageNumber(i)}>{i}</div>);
        }

        return (
            <div className="flex-row" style={{width: '50%', margin: 'auto', paddingBottom: '25px', justifyContent: 'center'}}>
                <i className="material-icons">first_page</i>
                <i className="material-icons" style={{marginLeft: '10px', marginRight: '10px'}}>chevron_left</i>
                <div className="flex-row">
                    {numArray.map(num => {
                        return num;
                    })}
                </div>
                <i className="material-icons" style={{marginLeft: '10px', marginRight: '10px'}}>chevron_right</i>
                <i className="material-icons">last_page</i>
            </div>
        )
    }

    selectPageNumber(pageNumber) {
        console.log(pageNumber);
        this.setState({ currentPage: pageNumber });
        
    }

    pageBack() {
        this.setState({ currentPage: (this.state.currentPage - 1) });
    }

    pageForward() {
        this.setState({ currentPage: (this.state.currentPage + 1) });
    }

    firstPage() {
        this.setState({ currentPage: 1 });
    }

    lastPage() {
        this.setState({ currentPage: this.props.pageData.total_pages });
    }

    setPageRange() {
        if (this.state.currentPage > 2) {
            console.log('1');
            this.setState({ rangeBottom: this.state.currentPage - 2, rangeTop: (this.state.currentPage + 2) > this.props.pageData.total_pages ? this.props.pageData.total_pages : (this.state.currentPage + 2)});
        } else if (this.state.currentPage === 2) {
            this.setState({ rangeBottom: 1, rangeTop: (this.state.currentPage + 2) > this.props.pageData.total_pages ? this.props.pageData.total_pages : (this.state.currentPage + 2)});
            console.log('2');
        } else {
            console.log('3');
            this.setState({ rangeBottom: 1, rangeTop: (this.state.currentPage + 2) > this.props.pageData.total_pages ? this.props.pageData.total_pages : (this.state.currentPage + 2)});
        }
    }
}

export default connect(null, actions)(Paginator);