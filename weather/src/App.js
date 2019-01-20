import React, { Component } from "react";
import "./App.css";
import ReactDOM from 'react-dom';
import "bootstrap";
import "bootswatch/dist/litera/bootstrap.css";
import "mdbootstrap/css/bootstrap.css";
//import "mdbreact/dist/css/mdb.css";
//import "bootstrap/dist/css/bootstrap.css";
//import Nav from "react-bootstrap/lib/Nav";
//import Navbar from "react-bootstrap/lib/Navbar";
//import NavItem  from "react-bootstrap/lib/NavItem";
//import Grid  from "react-bootstrap/lib/Grid";
//import Row  from "react-bootstrap/lib/Row";
//import Col  from "react-bootstrap/lib/Col";

//import {Navbar, Nav, NavItem, Grid, Row, Col} from 'mdbreact';
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { namer: "Киев", name: "Kyiv" },
  { namer: "Харьков", name: "Kharkiv" },
  { namer: "Львов", name: "Lviv" },
  { namer: "Винница", name: "Vinnytsia" },
  { namer: "Чернигов", name: "Chernihiv" },
  { namer: "Ивано-Франковск", name: "Ivano-Frankivsk" },
  { namer: "Полтава", name: "Poltava" },
  { namer: "Николаев", name: "Mykolayiv" },
  { namer: "Одесса", name: "Odessa" },
  { namer: "Черкасы", name: "Cherkasy" }

];


class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
      const name = this.props.name;
      const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      name +
        "&appid=e8d45262db3588472ff7091896703bf4&units=metric";
        fetch(URL).then(res => res.json()).then(json => {
            this.setState({ weatherData: json });
      });
    }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Проверяем информацию ....</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
   const temperat= Math.round(weatherData.main.temp);
   const temperat_max= Math.round(weatherData.main.temp_max);
   const temperat_min= Math.round(weatherData.main.temp_min);
 //const speed_wind= Math.round(0.44704*(weatherData.wind.speed));
    return (

      <div>
        <h1 className="main_text">
        {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>

        <p>Сейчас погода: {temperat}°</p>
        <p>Максилальная темп.:  { temperat_max}°</p>
        <p>Минимальная темп.: {temperat_min}°</p>
        <p>Скорость ветра:  {weatherData.wind.speed} м/с</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
            <h2 className="textbig">
              Пример React Weather App
              </h2>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3 className="text_select">Выбор города</h3>

                <Nav bsStyle="pills" stacked activeKey={activePlace} onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.namer}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
           <WeatherDisplay key={activePlace} name={PLACES[activePlace].name} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

class NewButton extends React.Component {
  render() {
     const url = 'App_cal.js';
    return (

      //<button onclick="window.open.href='/App_cal'">Continue</button>
     //<a className="mybutton" href="App_cal.js"> Календарь </a>
    <a className="mybutton" href={url} target="_blank" rel="noopener noreferrer"> Календарь </a>
      //  <button onclick= "window.open(url,  '_blank')">Continue</button>
    //  <button className="mybutton" onClick={() => window.open(url, '_blank')}>
    //    Календарь
    //  </button>
    );
  }
}


ReactDOM.render(
  <NewButton />,
  document.getElementById('buttonroot')
);


const dz1=<a href="https://irinakir.github.io/" target="_blank"  rel="noopener noreferrer">1 работа</a>;
const dz2=<a href="https://irinakir.github.io/site.github.io/" target="_blank"  rel="noopener noreferrer">2 работа</a>;
const dz3=<a href="https://irinakir.github.io/web_project/" target="_blank" rel="noopener noreferrer">3 работа</a>;
const dz4=<a href="https://irinakir.github.io/site.github.io/curriculum_vitae.html" target="_blank"  rel="noopener noreferrer">CV</a>;

const numbers = [dz1, dz2, dz3, dz4];
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

ReactDOM.render(
  <NumberList numbers={numbers}/>,
  document.getElementById('linkroot')
);


export default App;
