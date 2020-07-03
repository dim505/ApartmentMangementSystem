import React, { Component } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { post } from "axios";
import WebIcon from "@material-ui/icons/Web";
import { Form, Col, Row } from "react-bootstrap";
import SnackBar from "../shared/SnackBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import { uuidv4, isEmpty } from "../shared/SharedFunctions";

//contains upload file and submit receipt icon/action to upload receipt
export default class UploadReceiptBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OpenNoti: false,
      Message: "",
      file: null,
      filepath: "",
      ProgessCircle: false,
    };
  }

  //handles the submitting of data
  submit = async (e) => {
    e.preventDefault();
    //makes additional checks in the parent
    this.props.UploadSubmitCheck();

    //checks if all the text fields are empty
    if (
      !isEmpty(this.props.receipt.Date) &&
      !isEmpty(this.props.receipt.Store) &&
      !isEmpty(this.props.receipt.Tax) &&
      !isEmpty(this.props.receipt.TotalAmount) &&
      !isEmpty(this.state.filepath)
    ) {
      this.setState({ ProgessCircle: true });
      //generates new GUID
      var ImageGuid = uuidv4();
      //gets Auth0 token
      const BearerToken = await this.props.auth.getTokenSilently();
      //defines URL
      const AddImageUrl = `${process.env.REACT_APP_BackEndUrl}/api/receipt/${ImageGuid}`;
      const formData = new FormData();
      formData.append("body", this.state.file);
      const config = {
        headers: {
          Authorization: `bearer ${BearerToken}`,
          "content-type": "multipart/form-data",
        },
      };

      //makes api call to insert image data into database
      var ImgResults = await post(AddImageUrl, formData, config);
      console.log(ImgResults);

      //builds out receipt text portion object
      var Mydata = {};
      Mydata.receipt = this.props.receipt;
      Mydata.receipt.ImageGuid = ImageGuid;
      console.log(Mydata);

      //makes api call
      var AddRecResults = await Axios.post(
        `${process.env.REACT_APP_BackEndUrl}/api/receipt/AddReceipt`,
        Mydata,
        {
          headers: { Authorization: `bearer ${BearerToken}` },
        }
      ).then(
        (AddRecResults) => this.OpenNoti("Receipt Uploaded"),
        console.log(AddRecResults),
        this.props.ClearAddReceiptFormState()
      );

      this.setState({
        ProgessCircle: false,
        file: null,
        filepath: "",
      });
    }
  };

  setFile(e) {
    //checks if file is over 1 MB
    if (e.target.files[0].size < 1000000) {
      this.setState({ file: e.target.files[0], filepath: e.target.value });
    } else {
      //TURNS ON FILE TO BIG NOTIFICATION
      this.OpenNoti("Please Upload an Image smaller than 1 MB");
    }
  }

  //function used to open notification alert
  OpenNoti = (message) => {
    this.setState({
      OpenNoti: true,
      Message: message,
    });
  };

  //function used to close notification alert
  CloseNoti = () => {
    this.setState({
      OpenNoti: false,
    });
  };

  render() {
    return (
      <div>
        <div className="SnackbarClass">
          <SnackBar
            position="bottom"
            OpenNoti={this.state.OpenNoti}
            CloseNoti={this.CloseNoti}
            message={this.state.Message}
          />
        </div>
        <form onSubmit={(e) => this.submit(e)}>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Image:
            </Form.Label>
            <Col sm="10">
              <Form.Control
                className={
                  this.props.UploadBtnCkcOnce && isEmpty(this.state.filepath)
                    ? "ShowRed"
                    : " "
                }
                disabled
                type="text"
                value={this.state.filepath}
                placeholder="Please Upload An Image"
              />
            </Col>
          </Form.Group>
          <h4>File Upload</h4>
          <Grid container spacing={0}>
            <Grid item>
              <Button
                component="label"
                variant="contained"
                color="default"
                startIcon={<WebIcon />}
              >
                Browse
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  style={{ display: "none" }}
                  onChange={(e) => this.setFile(e)}
                />
              </Button>
            </Grid>

            <Grid item>
              <Button
                onClick={this.submit}
                type="submit"
                variant="contained"
                color="default"
                startIcon={<CloudUploadIcon />}
              >
                Submit Receipt
              </Button>
            </Grid>
            <Grid item>
              {this.state.ProgessCircle && (
                <div className="ProgessCircle">
                  <CircularProgress />
                </div>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}
