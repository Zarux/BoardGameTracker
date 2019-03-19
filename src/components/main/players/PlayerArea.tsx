import React from "react";
import {GameInterface, PlayerInterface} from "../Room";
import Player from "./Player";
import NewPlayer from "./NewPlayer";

interface PlayerAreaProps {
    players: PlayerInterface[];
}

class PlayerArea extends React.Component<PlayerAreaProps, any> {

    constructor(props: PlayerAreaProps) {
        super(props);
    }

    render() {
        const players = this.props.players.map(player => {
            return <Player key={`player_${player.id}`} id={player.id} name={player.name} color={player.color}/>
        });
        return (
            <div>
                <NewPlayer/>
                {players}
            </div>
        );
    }
}

export default PlayerArea;