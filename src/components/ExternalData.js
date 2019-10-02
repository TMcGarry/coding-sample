import React, { Component } from 'react';

//Components
var xhr;

class ExternalData extends React.Component {
  constructor(props) {
    super(props);

    this.processRequest = this.processRequest(this);
  }

  componentDidMount() {
      xhr = new XMLHttpRequest();
      var self = this;

      xhr.onreadystatechange = function(e) {
          if(xhr.readyState === 4 && xhr.status === 200) {
                let response = JSON.parse(this.response);
                console.log(response);
            }
      }


      xhr.open("get", "https://codechallenge.boohma.com/choices", true);
      xhr.send();

     // xhr.addEventListener("readystatechange", this.processRequest, false);
  }

  processRequest() {
   // console.log("data: "+xhr);
    /*if(xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        console.log(response);
    }*/
  }


    render() {
       // console.log("data: "+xhr);
    return (
        <div className="flex-container"></div>
    );
  }
}

export default ExternalData;