import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';

import './deleteShowingDialog.css';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class DeleteShowingDialog extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const actions = [
            <div className="button background-green z-depth-3" style={{backgroundColor: "#a8a8a8"}} onClick={this.handleClose}>Cancel</div>,
            <div className="button background-red z-depth-3" style={{marginLeft: '10px', marginRight: '20px'}} onClick={this.props.onDelete}>Okay</div>
        ];

        return (
            <div>
                <div onClick={this.handleOpen} className="headerLinkStyle z-depth-3 delete-button">Delete</div>
                <Dialog
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={{maxWidth: '375px'}}
                    actionsContainerStyle={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}
                >
                    Are you sure you want to delete this showing?
        </Dialog>
            </div>
        );
    }
}

export default DeleteShowingDialog;