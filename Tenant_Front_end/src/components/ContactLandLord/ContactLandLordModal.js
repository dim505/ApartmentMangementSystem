import React, { Component } from "react";
import ContactLandLord from "./ContactLandLord"
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";

export default class ContactLandLordModal extends Component {
    render() {
        return (
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.props.OpnModal}
            onClose={this.props.CloseModal}
          >
             
                <div className="CenterModal">
                            <ContactLandLord />
                </div>
          

                        

              
        
        </Modal>

        )

    }

    
  }