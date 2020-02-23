import React, { useState, useCallback, useEffect } from 'react';
import { Button, Container, Row } from 'reactstrap';
import logo from '../../images/logo.png';
import '../css/MyTheme.css';
import { Link } from 'react-router-dom';

const Home = (props) => {
  const [theme, setTheme] = useState(props.theme);

  useEffect(() => { setTheme(props.theme)});

  return (
    <div className={"Home "+theme}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <Container className={"App-content "+theme}>
            <Row className="Link-padding">
                <Link className="App-link" to='/login'>Login</Link> | <Link className="App-link" to='sign_up'>Sign Up</Link>
            </Row>
            <Row>
                <Button style={{borderWidth: 2, borderRadius: 20 }} className="App-button">GET STARTED</Button>
            </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;