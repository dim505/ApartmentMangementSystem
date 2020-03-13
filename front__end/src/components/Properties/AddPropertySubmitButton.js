import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import Axios from "axios"


export default class AddPropertySubmitButton extends Component {
    state = {SubmitSuccessNoti: false}

    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }


    
    isEmpty(str) {
        return (!str || /^\s*$/.test(str));
      }

    async submit () {
             this.props.UploadSubmitCheck()
            if (!this.isEmpty(this.props.property.Street) && 
                !this.isEmpty(this.props.property.City) && 
                !this.isEmpty(this.props.property.State) && 
                !this.isEmpty(this.props.property.YearlyInsurance) && 
                !this.isEmpty(this.props.property.Tax)            
            ) {


                    var Guid = this.uuidv4()             
                    var Mydata = {};
                    Mydata.property =  this.props.property
                    Mydata.property.Guid = Guid
                    console.log(Mydata)
                    const headers = {
                      'Content-Type': 'application/json'
                    }
                
                    //makes api call  
                    var Results = await Axios.post("https://localhost:5001/api/Property/AddProperty",Mydata,headers)
                    .then((Results) =>
                    console.log(Results),
                    this.setState({SubmitSuccessNoti: true})
                    )



                
            } else {

                this.setState({SubmitSuccessNoti: false})
            }


    
    }

    CloseSubmitSuccessNoti (){
        this.setState({SubmitSuccessNoti: false})

    }


    render () {
        return   (
        <div>
        <div className="SnackbarClass">
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.SubmitSuccessNoti}
          onClose={() => this.CloseSubmitSuccessNoti()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Property Added</span>}
        />





      </div>


      <Button onClick = {() => this.submit()} variant="outlined" color="primary">
                    Submit Property
                  </Button>

      </div>
      
      
      
      )



  }  




}



