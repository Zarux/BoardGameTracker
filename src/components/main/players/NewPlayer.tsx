import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {apiUrl} from "../../../config.json";
import {RoomContext} from "../../context";


class NewPlayer extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: ""
        }
    }

    render() {
        return (
            <Row>
                <Col xs={8} md={4}>
                    <Card style={{marginTop: 10}}>
                        <Row>
                            <Col>
                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Add new player</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoComplete="off"
                                                    placeholder="Player name"
                                                    value={this.state.name}
                                                    onChange={(e: any) => {
                                                        this.setState({...this.state, name: e.currentTarget.value})
                                                    }}
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button
                                                disabled={this.state.name === ""}
                                                variant="outline-primary"
                                                style={{color: "white"}}
                                                onClick={() => {
                                                    const newPlayer = {
                                                        name: this.state.name,
                                                        color: null
                                                    };
                                                    fetch(`${apiUrl}/room/${this.context.roomName}/player`, {
                                                        method: "POST",
                                                        body: JSON.stringify(newPlayer)
                                                    }).then(res => {
                                                        if (res.status === 201) {
                                                            return res.json()
                                                        } else {
                                                            return {};
                                                        }
                                                    }).then(player => {
                                                        this.setState({...this.state, name: ""});
                                                        this.context.addPlayer(player);
                                                    }).catch(e => {
                                                        console.log(e);
                                                    });
                                                }}
                                            >
                                                Add player
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        );
    }
}
NewPlayer.contextType = RoomContext;
export default NewPlayer;