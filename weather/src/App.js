import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/dist/litera/bootstrap.css";

//import "bootstrap/dist/css/bootstrap.css";
//import Nav from "react-bootstrap/lib/Nav";
//import Navbar from "react-bootstrap/lib/Navbar";
//import NavItem  from "react-bootstrap/lib/NavItem";
//import Grid  from "react-bootstrap/lib/Grid";
//import Row  from "react-bootstrap/lib/Row";
//import Col  from "react-bootstrap/lib/Col";
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
  //  const temperat= Math.round((weatherData.main.temp - 32) / 1.8);
  //  const temperat_max= Math.round((weatherData.main.temp_max - 32) / (5/9));
  //  const temperat_min= Math.round((weatherData.main.temp_min - 32) / (5/9));
 //const speed_wind= Math.round(0.44704*(weatherData.wind.speed));
    return (

      <div>
        <h1 className="main_text">
        {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>

        <p>Сейчас погода: {weatherData.main.temp}°</p>
        <p>Максилальная темп.:  {weatherData.main.temp_max}°</p>
        <p>Минимальная темп.: {weatherData.main.temp_min}°</p>
        <p>Скорость ветра:  {weatherData.wind.speed} mi/hr</p>
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

export default App;
