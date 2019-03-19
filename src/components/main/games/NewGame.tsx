import React from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import {RoomContext} from '../../context'
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {apiUrl} from '../../../config.json'
interface NewGameProps {

}

interface NewGameState {
    gameId: number | null,
    newGamePlayers: ({
        id: number
        name: string
        points: number | null
    } | {})[],
    typeAhead: {
        isLoading: boolean,
        options: {
            id: number;
            name: string;
        }[]
    }
}

class NewGame extends React.Component<NewGameProps, NewGameState> {
    typeahead: any;
    constructor(props: NewGameProps) {
        super(props);
        this.state = {
            newGamePlayers: [{id: -1}],
            gameId: null,
            typeAhead: {
                isLoading: false,
                options: []
            }
        };
    }

    _handleSearch = (e: any) => {
        if (e === "") {
            return
        }
        this.setState({...this.state, typeAhead: {isLoading: true, options: this.state.typeAhead.options}});
        fetch(`${apiUrl}/boardGames?search=${e}&room=${this.context.id}`).then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                return [];
            }
        }).then(options => {
            this.setState({...this.state, typeAhead: {isLoading: false, options}});
        }).catch(e => {
            console.log(e)
        })
    };

    render() {
        const addedPlayers = this.state.newGamePlayers.map((e: any) => e.id);
        const addPlayerDisabled = addedPlayers.includes(-1) || addedPlayers.length >= this.context.players.length;
        const removePlayerDisabled = addedPlayers.length <= 1;

        const playerInputs = this.state.newGamePlayers.map((player: any, idx) => {
            return (
                <Row
                    key={`ta_${idx}`}
                    style={{marginBottom: 5}}
                >
                    <Col xs={6} lg={6}>
                        <Form.Control
                            value={player.id}
                            as="select"
                            onChange={(e: any) => {
                                const newGamePlayers = [...this.state.newGamePlayers];
                                const firstWithId = newGamePlayers.findIndex((cur: any) => {
                                    return cur && cur.id === player.id
                                });

                                const firstEmpty = newGamePlayers.findIndex((e: any) => {
                                    return e && e.id === -1
                                });
                                if (firstEmpty !== -1) {
                                    newGamePlayers[firstEmpty] = {id: parseInt(e.currentTarget.value)};
                                }else if(firstWithId !== -1) {
                                    newGamePlayers[firstWithId] = {id: parseInt(e.currentTarget.value)};
                                }
                                this.setState({...this.state, newGamePlayers})
                            }}
                        >
                            <option value={-1} disabled={true} hidden={true}/>
                            {this.context.players.map((rPlayer: any) => {
                                return <option
                                    key={`option_${idx}_${rPlayer.id}`}
                                    value={rPlayer.id}
                                    disabled={addedPlayers.includes(rPlayer.id)}
                                >
                                    {rPlayer.name}
                                </option>
                            })}
                        </Form.Control>
                    </Col>
                    <Col xs={3} xl={4}>
                        <Form.Group controlId="formPointInput">
                            <Form.Control
                                type="number"
                                disabled={player.id === -1}
                                value={player.points !== undefined ? player.points : ""}
                                onChange={(e: any) => {
                                    const points = e.currentTarget.value;
                                    const newGamePlayers = [...this.state.newGamePlayers];
                                    const firstWithId = newGamePlayers.findIndex((cur: any) => {
                                        return cur && cur.id === player.id
                                    });
                                    if (firstWithId !== -1) {
                                        newGamePlayers[firstWithId] = {...newGamePlayers[firstWithId], points}
                                    }
                                    this.setState({...this.state, newGamePlayers})
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col xs={2} xl={2}>
                        <Button
                            disabled={removePlayerDisabled}
                            variant="outline-danger"
                            onClick={(e: React.MouseEvent<HTMLElement>) => {
                                e.currentTarget.blur();
                                const newGamePlayers = [...this.state.newGamePlayers];
                                const firstWithId = newGamePlayers.findIndex((cur: any) => {
                                    return cur && cur.id === player.id
                                });
                                if (firstWithId !== -1) {
                                    newGamePlayers.splice(firstWithId, 1);
                                }
                                this.setState({...this.state, newGamePlayers})
                            }}
                        >
                            Remove
                        </Button>
                    </Col>
                </Row>
            );
        });

        const addGameDisabled = this.state.gameId === null || this.state.newGamePlayers.filter((e: any) => {
            return e.id !== -1
        }).length <= 0;
        return (
            <Row>
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Add new game</Card.Title>
                            <Form>
                                <Row style={{marginBottom: 5}}>
                                    <Col>
                                        <AsyncTypeahead
                                            options={this.state.typeAhead.options}
                                            isLoading={this.state.typeAhead.isLoading}
                                            placeholder="Search for boardgames..."
                                            labelKey={"name"}
                                            id="boardGameAutocomplete"
                                            onSearch={this._handleSearch}
                                            ref={(typeahead: any) => this.typeahead = typeahead}
                                            onChange={(e) => {
                                                if(e.length){
                                                    const gameId = e[0].id;
                                                    this.setState({...this.state, gameId});
                                                }else{
                                                    this.setState({...this.state, gameId: null});
                                                }
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{marginBottom: 5}}>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <Row>
                                                    <Col xs={6} lg={6}>
                                                        <label style={{width: "100%"}}>Player</label>
                                                    </Col>
                                                    <Col xs={3} xl={4}>
                                                        <label style={{width: "100%"}}>Points</label>
                                                    </Col>
                                                </Row>
                                                {playerInputs}
                                                <Button
                                                    variant="outline-success"
                                                    disabled={addPlayerDisabled}
                                                    onClick={() => {
                                                        this.setState({
                                                            ...this.state,
                                                            newGamePlayers: [...this.state.newGamePlayers, {id: -1}]
                                                        })
                                                    }}
                                                >
                                                    Add Player
                                                </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5}}>
                                    <Col>
                                        <Button
                                            style={{float: "right", color: "white"}}
                                            variant="outline-primary"
                                            disabled={addGameDisabled}
                                            onClick={() => {
                                                const newGame = {
                                                    boardGame: {
                                                        id: this.state.gameId
                                                    },
                                                    gamePlayers: this.state.newGamePlayers.map((val: any) => {
                                                        return {
                                                            points: val.points === undefined ? null : parseInt(val.points),
                                                            player: {
                                                                id: val.id
                                                            }
                                                        }
                                                    })
                                                };

                                                if(this.typeahead !== null) {
                                                    this.typeahead.getInstance().clear();
                                                }

                                                fetch(`${apiUrl}/room/${this.context.roomName}/game`, {
                                                    method: "POST",
                                                    body: JSON.stringify(newGame)
                                                }).then(res => {
                                                    if (res.status === 201) {
                                                        return res.json()
                                                    } else {
                                                        return {};
                                                    }
                                                }).then(game => {
                                                    this.setState({...this.state, gameId: null, newGamePlayers: [{id: -1}]});
                                                    this.context.addGame(game);
                                                }).catch(e => {
                                                    console.log(e);
                                                })
                                            }}
                                        >
                                            Add game
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

NewGame.contextType = RoomContext;
export default NewGame;