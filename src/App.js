import React, { Component } from "react";
import "./App.css";
import $ from 'jquery';
// import backgroundVideo from "./content/video/militaryConstruction.mp4"
import backgroundVideo from "./content/video/tyndallHurricane.mp4"
// import fs from 'fs'
// import PDFParser from 'pdf2json'
// fs = require ('fs')
import Search_card from "./components/Search_card"


var apiURI = "http://localhost:9000/testAPI/"
var dataAPIURI = "http://localhost:9000/dataAPI/"

class App extends Component {
  constructor(props) {
    super(props);
    this.state =  { 
      "logoiconURL": "",
      "logo-text": "",
      "taglink-text": "",
      "tagline-text": "",
      "inputVal": 'random text',
      "timeout": null,
      "ifsData": {} 
    };
    this.AnimateSearch = this.AnimateSearch.bind(this);
  }
  handleChange(e){
    // console.log(e.target.value)
    clearTimeout(this.state.timeout)
    var _this = this;
    this.state.timeout = setTimeout(function (){
      var val = document.getElementById("searchInputText").value
      if (val !== ""){
        console.log(val)
        _this.GetDataAPI(val);
      }
    }, 500)
  }


  componentDidMount() {
    // this.getContent("mainpageimages", this)
    // this.getContent("pdfs", this)
    this.getContent("mainpagetext", this)
    
  }

  GetDataAPI(keyword){
    $.ajax(dataAPIURI, {
      method: "GET",
      data: {keyword: keyword},
      success: function (res){
        //callback
        console.log("success calling data api");
        res = JSON.parse(res)
        console.log(res)
      }
    })
  }

  getContent (type, _this){
    $.ajax(apiURI, {
      method: "GET",
      data: {type: type},
      success: function (res){
        res = JSON.parse(res)
        if (type === "mainpageimages"){

        } else if (type === "mainpagetext"){
          _this.setState({ 
            "logoiconURL": res["logoicon"]["url"],
            "logo-text": res["logo-text"],
             "taglink-text": res["taglink-text"],
             "tagline-text": res["tagline-text"] 
          })
        } else if (type === "pdfs"){

        }
      }
    })
  }

  AnimateSearch (){
    // $("#searchInputText").animate({width:'100%'}, 1000)
    // console.log('hi there')
  }
  

  render() {
    // var tempstyle = {

    // }
    // style={tempstyle}
    var logotextInline = {
      color: 'white',
      fontSize: '18px'
    };
    var navbarInline = {
      top: '5px'
    };
    var brandLogo = {
      left: '5px',
      position: 'relative'
    };
    var tempstyle = {
      top : '17vh'
    }

    return (
      <div>
        <header>
          <div className="overlay"></div>

          <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
            <source src={backgroundVideo} type="video/mp4"></source>
          </video>

          <div className="container">
            
            <nav className="navbar navbar-light "style={navbarInline}>
              <a className="navbar-brand logotext" style={logotextInline} href="#">
                  <img src={this.state.logoiconURL} width="22" height="22" alt=""></img>
                    <span style={brandLogo}>{this.state["logo-text"]}</span>
              </a>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="icon-menu-hamburger"></i>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </div>
            </nav>
            </div>

            <div className="d-flex container flex-column " style= {tempstyle}>
              <div className="d-flex p-2 h-100  text-center">
                <div className="w-100 text-white">
                  <h1 className="helveticaBoldCond">{this.state["taglink-text"]}</h1>
                </div>
              </div>
              <div id="searchInput" className="d-flex input-group mb-3 w-50 mx-auto" onClick={this.AnimateSearch}>
                <input onKeyUp={this.handleChange.bind(this)} type="text" id="searchInputText" className="form-control" placeholder="Technical Guidelines" aria-label="Recipient's username" aria-describedby="basic-addon2"></input>
                <div className="input-group-append">
                  <span className="input-group-text" id="basic-addon2">Quick Search</span>
                </div>

              </div>
              {/* <Search_card /> */}
            </div>

          
        </header>
            <div className="row blueBox">
              <div className="col-md-7 mx-auto ">
                <p className="paragraphStyle">{this.state["tagline-text"]}</p>
              </div>
            </div>

      </div>
    );
  }
}

export default App;