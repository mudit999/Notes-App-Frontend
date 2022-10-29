import React from "react";
import { Container, Row } from "react-bootstrap";
import "./MainScreen.css";

const MainScreen = ({ title,children }) => {
    return(
        <div>
            <Container>
                <Row>
                    <div> 
                        {
                        title && (
                        <>
                            <h2 className="heading">{title}</h2>
                        </>
                        )}
                        {children}
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default MainScreen;