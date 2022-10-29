import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import './LandingPage.css';

const LandingPage = () => {
    return(
        <div>
            <div  className='main'>

            </div>
            <Container>
                <Row>
                    <div className='intro-text'>
                        <div>
                            <h1 className='title'>Welcome to Notes App</h1>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage;