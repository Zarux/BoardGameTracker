import React from "react";
import {Card, Col, Row} from "react-bootstrap";


interface PlayerProps {
    id: number;
    name: string;
    color: string;
    newPlayer?: boolean;
}

class Player extends React.Component<PlayerProps, any> {

    constructor(props: PlayerProps) {
        super(props);
        this.state = {
            color: props.color
        }
    }

    render() {
        return (
            <Row>
                <Col xs={8} md={4}>
                    <Card style={{marginTop: 10}}>
                        <Row>
                            <Col>
                                <Card.Body>{this.props.name}</Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default Player;