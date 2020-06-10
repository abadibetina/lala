  import React, { Component, Fragment } from 'react';

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

    obtenerInformacion = async () => {
      const request = await fetch('https://jsonplaceholder.typicode.com/users');
      const respuesta = await request.json()
      this.setState({ cosas : respuesta})
      console.log(respuesta)
    }

    render() {
      return (
        <Fragment>
          <div className="container">
            {
              this.state.cosas.map( cosa =>(
                <div>
                  {cosa.name}
                </div>
              ))
            }
          </div>
        </Fragment>
        
      );
    }
  }

  export default App;