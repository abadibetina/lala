import React, { Component, Fragment } from 'react';
import './Table_Responsive_v2/css/main.css'
import './bootstrap.css'
import CanvasJSReact from './canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


  class App extends Component {

    constructor(props) {
      super(props)

      this.state = {
        cosas: []
      }
    }

      componentDidMount() {
      this.obtenerInformacion()
      }
      componenWillMount() {
          clearInterval()
      }

      obtenerInformacion = async() => {
          //fetch('https://api.thevirustracker.com/free-api?countryTimeline=AR')
          //.then(respuesta => respuesta.json())
          //.then(console.log(respuesta))

      const request = await fetch('https://jsonplaceholder.typicode.com/users');
      const request2 = await fetch('https://api.thevirustracker.com/free-api?countryTimeline=AR');
      const respuesta = await request.json()
      const respuesta2 = await request2.json()
      this.setState({ cosas: respuesta })
      this.setState({ cosas2: respuesta2.timelineitems[0] })
      console.log(respuesta)
      console.log(respuesta2.timelineitems[0])
        for (const key in respuesta2.timelineitems[0]) {
            if (respuesta2.timelineitems[0].hasOwnProperty(key)) {
                console.log(key + " -> " + respuesta2.timelineitems[0][key].new_daily_cases);
            }
        }
      //    const request = await fetch('https://api.thevirustracker.com/free-api?countryTimeline=AR');
      //    const respuesta = await request.json()
      //    // this.setState({ cosas : respuesta})
      //    console.log(respuesta.timelineitems)
      }
    

      render() {
          var dict = []; // create an empty array
          var arrkey = []
          var arrval = []
          for (const key in this.state.cosas2) {
              if (this.state.cosas2.hasOwnProperty(key)) {
                  arrkey.push(this.state.cosas2[key].new_daily_cases);
                  arrval.push(key);
                  dict.push({ key: key, value: this.state.cosas2[key].new_daily_cases })
              }
          }
          //console.log(dict)
          var i = 0;
          var arrayXs = []
          var arrayXs2 = []
          var arrayXs3 = []
          for (const key in this.state.cosas2) {
              arrayXs.push({ 'x': i, 'y': this.state.cosas2[key].new_daily_cases });
              arrayXs2.push({ 'x': i, 'y': this.state.cosas2[key].total_deaths });
              arrayXs3.push({ 'x': i, 'y': this.state.cosas2[key].total_cases });
              
              i++;
          }
          console.log(arrayXs)
          //console.log(arrval.length)
          

          const options = {
              animationEnabled: true,
              exportEnabled: true,
              theme: "light2", // "light1", "dark1", "dark2"
              title: {
                  text: "Coronavirus Cases"
              },
              axisY: {
                  title: "New cases",
                  includeZero: true,
                  suffix: " "
              },
              axisX: {
                  title: "Date",
                  prefix: " ",
                  interval: 1
              },
              data: [{
                  type: "line",
                  name: "Total cases",
                  showInLegend: true,
                  //toolTipContent: "Week {x}: {y}%",
                  dataPoints: arrayXs3
                      //[{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 2 }]
                    },
                  {
                      type: "line",
                      name: "Total deaths",
                      showInLegend: true,
                  //toolTipContent: "Week {x}: {y}%",
                      dataPoints: arrayXs2
                  }
                  //{
                  //    type: "line",
                  //    name: "Total cases",
                  //    showInLegend: true,
                  //    //toolTipContent: "Week {x}: {y}%",
                  //    dataPoints: arrayXs3
                  //}
              ]
          }



          //options.data.dataPoints = arrayXs
          //console.log(options.data.dataPoints)

        return (
        <React.Fragment>

        <CanvasJSChart options={options}/>
        

        <div className="container">
        <table className="table">
                  <thead className="thead-dark">
                      <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Username</th>
                          <th scope="col">Email</th>
                          <th scope="col">Adress</th>
                      </tr>
                        </thead>
            
            {
              this.state.cosas.map( cosa =>(
                  <div>

                      <tr>
                          <th scope="row">1</th>
                              <td >{cosa.name}</td>
                              <td >{cosa.username}</td>
                              <td >{cosa.email}</td>
                              <td >{cosa.address.street}</td>

                          </tr>

                   </div>
              ))
                  }
         </table>


                    </div>

      </React.Fragment> 
      );
    }
  }

  export default App;