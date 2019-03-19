import React from "react";
import {RouteComponentProps} from "react-router";
import {Container, Tab, Tabs} from "react-bootstrap";
import GameArea from "./games/GameArea";
import PlayerArea from "./players/PlayerArea";
import {RoomContext} from '../context'
import {apiUrl} from "../../config.json";

export interface PlayerInterface {
    id: number;
    name: string;
    color: string;
}

export interface GameInterface {
    id: number;
    gameTime: string;
    gamePlayers: {
        points: number;
        player: PlayerInterface
    }[];
    boardGame: {
        id: number;
        name: string;
    }
}

export interface RoomInterface {
    id: number | null;
    createTime: string | null;
    games: GameInterface[],
    players: PlayerInterface[],
    loading: boolean
}

class Room extends React.Component<RouteComponentProps<any>, RoomInterface> {

    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: null,
            createTime: null,
            games: [],
            players: [],
            loading: true
        };
        fetch(`${apiUrl}/room/${this.props.match.params.room}`).then(
            res => res.json()).then((room: RoomInterface) => {
                this.setState({
                    id: room.id,
                    createTime: room.createTime,
                    games: room.games,
                    players: room.players,
                    loading: false
                })
            }
        )
    }

    render() {
        const context = {
            ...this.state,
            roomName: this.props.match.params.room,
            addGame: (game: GameInterface) => {
                const games = [...this.state.games];
                games.unshift(game);
                this.setState({...this.state, games})
            },
            addPlayer: (player: PlayerInterface) => {
                const players = [...this.state.players];
                players.push(player);
                this.setState({...this.state, players})
            }
        };
        if(this.state.loading){
            return <div>Loading...</div>
        }else {
            return (
                <RoomContext.Provider value={context}>
                    <Container>
                        <Tabs defaultActiveKey="games" id="room-tab">
                            <Tab eventKey="games" title="Games">
                                <GameArea games={this.state.games} />
                            </Tab>
                            <Tab eventKey="players" title="Players">
                                <PlayerArea players={this.state.players} />
                            </Tab>
                            <Tab eventKey="stats" title="Stats">
                                <div>c</div>
                            </Tab>
                        </Tabs>
                    </Container>
                </RoomContext.Provider>
            );
        }
    }
}

export default Room;