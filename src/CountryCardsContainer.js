import React, { Component } from 'react';
import CountryCard from "./CountryCard"
import DataSource from "./DataSource"
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import d3 from 'd3';
import {Pie} from 'react-chartjs-2'

const taxData = {
  labels: [
    'Social Contributions',
    'Grants',
    'Coporate Tax',
    'Non Tax',
    'Personal income Tax',
    'Trade Tax / Goods',
  ],
  datasets: [{
    data: [8.3, 8.3, 16.7, 16.7, 25, 25],
    backgroundColor: [
    'purple',
    'blue',
    'green',
    'yellow',
    'orange',
    'red'
    ],
    hoverBackgroundColor: [
    'purple',
    'blue',
    'green',
    'yellow',
    'orange',
    'red'
    ]
  }]
};

const gdpData = {
  labels: [
    'Transport',
    'Mining',
    'Manufacturing',
    'Industry',
    'Services',
    'Agriculture',
  ],
  datasets: [{
    data: [10.5, 10.5, 10.5, 17.1, 34.3, 17.1],
    backgroundColor: [
    'purple',
    'blue',
    'green',
    'yellow',
    'orange',
    'red'
    ],
    hoverBackgroundColor: [
    'purple',
    'blue',
    'green',
    'yellow',
    'orange',
    'red'
    ]
  }]
};

const options = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: 'left',
    labels: {
      boxWidth: 10
    }
  }
}

class CountryCardsContainer extends Component {
    
    constructor(props) {
        super(props)
        this.state= {
            country: "Bangladesh"
        }
    }
    componentDidMount() {
      let hint = new Datamap({element: document.getElementById("hint")});
      let map = new Datamap({
          element: document.getElementById("MiddleEast&SouthAsia"),
          geographyConfig: {
              popupOnHover: true,
              highlightOnHover: true,
              borderColor: '#c0c0c0',
              borderWidth: 0.5,
          },
          setProjection: function(element) {
              var projection = d3.geo.equirectangular()
              .center([422, 26.5])
              .scale(700)
              .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
              var path = d3.geo.path()
              .projection(projection);
              return {path: path, projection: projection};
          },
          fills: {
              defaultFill: "#f5f5f5",
              BGD : "#f2d5a9",
              IND: "#e7514c",
              ISR: "#ebcd54",
              KWT: "#8397b3",
              TUR: "#688c45"
          },
          data: {
              BGD: { fillKey: "BGD" },
              IND: { fillKey: "IND" },
              ISR: { fillKey: "ISR" },
              KWT: { fillKey: "KWT" },
              TUR: { fillKey: "TUR" },
          },
          done: (datamap) => {
              datamap.svg.selectAll('.datamaps-subunit').on('click', (geography) => {
                  const countryList = Object.values(DataSource.getCountryList())
                  let countryFromGeo = geography.properties.name;
                  if(countryList.includes(countryFromGeo)) {
                    this.setState({country: countryFromGeo});
                  }
              });
          }
      });
  }
  
  render() {
    return (
      <>
        <nav className="navbar navbar-dark bg-dark" style={{position: "fixed", width: "100%"}}>
          <div className="container">
            <div className="container" style={{color:"white", fontSize:"20px"}}>Middle East & South Asia</div>
          </div>
        </nav>
        <div id="hint" style={{height: "12px", width: "1px"}}></div>
        <div id="MiddleEast&SouthAsia" style={{height: "500px", width: "100%"}}></div>
        <div className="container">
        <CountryCard  country={this.state.country}/>
        <h2>
          GDP summary %
        </h2>
        <Pie
          data={gdpData}
          options={{options}}
        />
        <h2>
          Revenue summary %
        </h2>
        <Pie
          data={taxData}
          options={{options}}
        />
        </div>
      </>
    );
  }
}

export default CountryCardsContainer;
