import React from "react";
import {Card, Col, ListGroup, Row} from "react-bootstrap";
import {GameInterface, PlayerInterface} from "../Room";

interface GameProps {
    id: number;
    name: string;
    gameTime: string;
    players: {
        points: number,
        player: PlayerInterface
    }[]
}

class Game extends React.Component<GameProps, any> {

    constructor(props: GameProps) {
        super(props);
        this.state = {
        }
    }

    render() {
        let place = 0;
        const placings = [
            "radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%)," +
            "radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)",
            "silver",
            "#cd7f32",
            "lightblue"
        ];
        const playerItems = this.props.players.map((player, idx) => {
            const style = {background: placings[place] || placings[4], "color": "black"};
            if((this.props.players[idx + 1] === undefined || this.props.players[idx + 1].points < player.points) && placings[place + 1] !== undefined){
                place++;
            }

            return (
                    <ListGroup.Item action={false} key={`game_${this.props.id}_${player.player.id}`} bsPrefix={"list-group-item d-flex justify-content-between align-items-center"}>
                        <span>{player.player.name}</span>
                        <span className="badge badge-pill" style={style}>{player.points}</span>
                    </ListGroup.Item>
            )
        });

        return (
            <div>
                <Row>
                    <Col md={8}>
                        <Card style={{ marginTop: 10}}>
                            <Row>
                                <Col xs={6} md={8}>
                                    <Card.Body>
                                        <Card.Title>{this.props.name}</Card.Title>
                                        <Card.Subtitle>{this.props.gameTime}</Card.Subtitle>
                                    </Card.Body>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Card style={{marginRight: 5, marginTop: 5, marginBottom: 5}}>
                                        <ListGroup variant="flush">
                                            {playerItems}
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Game;