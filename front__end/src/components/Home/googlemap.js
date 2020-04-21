//https://github.com/fullstackreact/google-maps-react
import React, { Component } from "react";
import { Marker, Map, GoogleApiWrapper, InfoWindow } from "google-maps-react";

export class MapContainer extends Component {
  state = {
    lat: 0,
    lng: 0,
    isOpen: false,
    InforMarkerAddress: "test",
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  async componentDidMount() {
    setTimeout(() => {
      this.GetAvgLatLong();
      this.GetBoundies();
    }, 2000);
  }

  GetAvgLatLong = async () => {
   
    var lat = 0;
    var lng = 0;
    for (var x in this.props.properties) {
      lat = lat + this.props.properties[x].lat;
      lng = lng + this.props.properties[x].lng;
    }
    lat = lat / this.props.properties.length;
    lng = lng / this.props.properties.length;
    await this.setState({
      lat: lat,
      lng: lng
    });
  };
  GetBoundies = () => {
    
    var points = [];
    for (var x in this.props.properties) {
      var lat = this.props.properties[x].lat;
      var lng = this.props.properties[x].lng;
      points.push({ lat, lng });
    }

    window.bounds = new this.props.google.maps.LatLngBounds();
    for (var i = 0; i < points.length; i++) {
      window.bounds.extend(points[i]);
    }
  };

  //filters properties to show only 1 when modal is called
  FilterProperty(Guid) {
    
    let PropertiesFiltered = this.props.properties;
    //returns only one property based on GUID
    PropertiesFiltered = PropertiesFiltered.filter(
      Property => Property.guid === Guid
    );
    var InforMarkerAddress =
      PropertiesFiltered[0].street +
      " " +
      PropertiesFiltered[0].city +
      ", " +
      PropertiesFiltered[0].state +
      " " +
      PropertiesFiltered[0].zipCode;
    this.setState({ InforMarkerAddress: InforMarkerAddress });
  }

  onMarkerClick = (props, marker, GUID) => {
    this.FilterProperty(GUID);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    this.GetBoundies();
    return (
      // takes in various parameters for

      <Map
        onClick={this.onMapClicked}
        google={this.props.google}
        initialCenter={{
          lat: this.state.lat,
          lng: this.state.lng
        }}
        center={{
          lat: this.state.lat,
          lng: this.state.lng
        }}
        bounds={window.bounds}
      >
        {this.props.properties.map(property => (
          <Marker
            Key={property.guid}
            onClick={(props, marker) =>
              this.onMarkerClick(props, marker, property.guid)
            }
            position={{ lat: property.lat, lng: property.lng }}
          />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <p>{this.state.InforMarkerAddress}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDMoFgWOjZKyH_mp_RduP8mJhTbb_j8tTw"
})(MapContainer);
