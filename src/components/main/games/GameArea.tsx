import React from "react";
import NewGame from "./NewGame";
import PastGames from "./PastGames";
import {GameInterface} from "../Room";

interface GameAreaProps {
    games: GameInterface[];
}

class GameArea extends React.Component<GameAreaProps, any> {

    constructor(props: GameAreaProps) {
        super(props);
    }

    render() {
        return (
            <div style={{marginTop: 5}}>
                <NewGame/>
                <PastGames games={this.props.games}/>
            </div>
        );
    }
}

export default GameArea;