import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";

//this component contains the image modal.  This displays when a user clicks on the image icon to view the image
export default class ReceiptImageModal extends Component {
 
  render() {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.OpenImageModal}
        onClose={this.props.CloseImageModal}
      >
        <Fade in={this.props.OpenImageModal} timeout={500}>
          <div className="ModalStyle">
            <img className="ImgStyle" src={this.props.objectURL} alt="tehe" />
          </div>
        </Fade>
      </Modal>
    );
  }
}
