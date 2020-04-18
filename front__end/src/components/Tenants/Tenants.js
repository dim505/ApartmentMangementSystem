import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import house from "./house.jpeg";
import Grid from "@material-ui/core/Grid";
import Zoom from "react-reveal/Zoom";
import Box from "@material-ui/core/Box";
import Flip from "react-reveal/Flip";
import { Link } from "react-router-dom";
import TenantRemoveButton from "./TenantRemoveButton";
import Snackbar from "@material-ui/core/Snackbar";
import TenantModal from "./TenantModal";
import Axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';


//parent component that houses the tenant page 
export default class Tenants extends Component {
  state = {
    Tenants: [
 
    ],
    Properties: [

    ],
    TenantsFiltered: [],
    ShowTenantList: false,
    PropertyToShow: "",
    OpenTenantRmvNoti: false,
    OpnModal: false,
    OpenTenantSaveNoti: false,
    ShowTenantToEdit: [
        {
          name: "Bob Smith",
          email: "d.komerzan@gmail.com",
          phone: "1111",
          leaseDue: "2020-03-01",
          guid: "ac3f370f-8dd2-47b9-8760-47a917786464",
          tenGuid: "8cd32c85-bdce-4777-b914-11c82c6c07ca"
        }
    ],
    TenantToSave: null

  };


  componentDidMount () {
    this.GetProperties();
    this.GetTenants();
  }

	//function to get properties related to account 
  GetProperties = async () => {
	const BearerToken = await this.props.auth.getTokenSilently();
    var results = Axios.get("https://localhost:5001/api/property",
	     {
      headers: {'Authorization': `bearer ${BearerToken}`}

    }
	
	
	)
    .then( results => 
      this.setState({
        Properties: results.data

      })
      )
  }

	//function to get tenants related to account 
  GetTenants = async () => {
    const BearerToken = await this.props.auth.getTokenSilently();
    var results 
    setInterval( () => 
     
	 results = Axios.get("https://localhost:5001/api/tenant",
	      {
      headers: {'Authorization': `bearer ${BearerToken}`}

    })
    .then(results => 
      this.setState({
        Tenants: results.data
      })
      
      )
    
    , 500);




  }
   //generates ID 
  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
	//used to filter tenants to show only tenants for one property when the more information button is clicked 
  ShowTenants = id => {
     ;
    console.log(id);
    var Row = [];

    let TenantsFiltered = this.state.Tenants;
    TenantsFiltered = TenantsFiltered.filter(Tenant => Tenant.guid === id);
    this.setState({
      TenantsFiltered: TenantsFiltered,
      ShowTenantList: !this.state.ShowTenantList,
      PropertyToShow: id
    });
  };

	//filters list of tenants to one tenant to edit in modal 
  ShowTenantToEdit = tenGuid => {
    let ShowTenantToEdit = this.state.TenantsFiltered;
    ShowTenantToEdit = ShowTenantToEdit.filter(Tenant => Tenant.tenGuid === tenGuid );
    this.setState({
      ShowTenantToEdit : ShowTenantToEdit,
      TenantToSave: ShowTenantToEdit[0]

    })


  }
	//hides tenant list for property 
  CloseTenantList = () =>{
    this.setState({ 
      ShowTenantList: false
     });

  }
	//function opens  the tenant was removed notification 
  OpenTenantRmvNoti = () => {
    this.setState({ OpenTenantRmvNoti: true,
      ShowTenantList: false
     });
  };
	//function opens  the tenant was removed notification 
  CloseTenantRmvNoti = () => {
    this.setState({ OpenTenantRmvNoti: false });
  };
	//function opens the update tenant modal
  OpnModal = (tenGuid) => {
    this.ShowTenantToEdit(tenGuid)
    this.setState({ OpnModal: true });

  };
	//function closes the update tenant modal
  CloseModal = () => {
    this.setState({ OpnModal: false });
  };

  render() {
    var Row = [];
    if (this.state.ShowTenantList) {
        if (this.state.TenantsFiltered.length > 0 ) {


                this.state.TenantsFiltered.map(Tenant =>
                  Row.push(
                    <Box
                      bgcolor="error.main"
                      color="primary.contrastText"
                      display="flex"
                      flexDirection="row"
                      Key = {Tenant.tenGuid}
                    >
                      <Grid item xs={3}>
                        {Tenant.name}
                      </Grid>
                      <Grid item xs={3}>
                        {Tenant.phone}
                      </Grid>

                      <Grid item xs={3}>
                        {Tenant.email}
                      </Grid>

                      <Grid item xs={2}>
                        {Tenant.leaseDue}
                      </Grid>


    
                        
                       <Grid item  >
                       <Tooltip title="Edit" placement="bottom">

                       <EditIcon  onClick={ () => this.OpnModal(Tenant.tenGuid)} />
                       </Tooltip>                     
                      </Grid>

                      <Grid item >
                      

                        <TenantRemoveButton
                          OpenTenantRmvNoti={this.OpenTenantRmvNoti}
                          CloseTenantRmvNoti={this.CloseTenantRmvNoti}
                          guid = {Tenant.tenGuid}
                          GetProperties = {this.GetProperties}
                          GetTenants = {this.GetTenants}
						  auth = {this.props.auth}

                        />

                       
                       </Grid>

                       


                    </Box>
                  )
                );

              } else {
                Row.push(<h2>Sorry No Tenants found... Please Add some </h2>)
              }
    }


    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          key={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.OpenTenantRmvNoti}
          onClose={() => this.CloseTenantRmvNoti()}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Tenant Has Been Removed </span>}
        />

        <TenantModal
          OpnModal={this.state.OpnModal}
          CloseModal={this.CloseModal}
          TenantsFiltered={this.state.ShowTenantToEdit}
          OpenTenantSaveNoti={this.OpenTenantSaveNoti}
          CloseTenantList = {this.CloseTenantList}
          GetProperties = {this.GetProperties}
          GetTenants = {this.GetTenants}
		  auth = {this.props.auth}

          
        />
        <Zoom  left>
          <Grid container spacing={0}>
            <Grid item xs={3} />
            <Grid item xs={3} />
            <Grid item xs={3} />
            <Grid container item xs={3} justify="flex-end">
              <Link to="./AddTenants">
                <Button variant="outlined" color="primary">
                  Add Tenants
                </Button>
              </Link>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {
            
            this.state.Properties.length > 0 ?           
            this.state.Properties.map(Property => (
              <Grid item xs={6}>
                <Card Key={Property.guid}>
                  <CardMedia
                    component="img"
                    alt="house"
                    height="250"
                    image={house}
                    title="house"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {Property.street} {Property.city}, {Property.state} {Property.zipCode}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    />
                  </CardContent>

                  <CardActions>
                    <Button
                      onClick={() => this.ShowTenants(Property.guid)}
                      color="primary"
                    >
                      {" "}
                      Tenants{" "}
                    </Button>
                  </CardActions>
                </Card>
                <Flip
                  left  
                  when={
                    this.state.ShowTenantList &&
                    this.state.PropertyToShow === Property.guid
                  }
                >
                  <React.Fragment>{Row}</React.Fragment>
                </Flip>
              </Grid> 

            ))
          
            : <div><h3>****Please add some properties***</h3></div>
          
          }
          </Grid>
        </Zoom>
      </div>
    );
  }
}
