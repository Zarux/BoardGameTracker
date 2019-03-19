import React from "react";
import {Container, Row, Col, Card, Form, Button} from "react-bootstrap";
import {Redirect, RouteComponentProps} from "react-router-dom";

export interface LandingPageState {
    roomName: string,
    goToRoom: boolean
}


class LandingPage extends React.Component<RouteComponentProps, LandingPageState> {
    constructor(props: RouteComponentProps) {
        console.log(props);
        super(props);
        this.state = {
            roomName: "",
            goToRoom: false
        }
    }


    render() {
        console.log(this.state);
        if (this.state.goToRoom){
            console.log(this.state);
            return <Redirect to={`/${this.state.roomName}`} />;
        }
        return (
            <Container>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: "20%"}}>
                    <Card style={{width: "50%"}}>
                        <Card.Body>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Control
                                                type="text"
                                                placeholder="Room name"
                                                onInput={(e: any) => {
                                                    this.setState({...this.state, roomName: e.currentTarget.value})
                                                }}
                                            />
                                            <Form.Text className="text-muted">
                                                A new room will be created if one doesn't exist.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <Button
                                            variant="outline-primary"
                                            style={{color: "white"}}
                                            onClick={() => {
                                                this.setState({...this.state, goToRoom: true});
                                            }}
                                        >
                                            Go to room
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        );
    }
}

export default LandingPage;