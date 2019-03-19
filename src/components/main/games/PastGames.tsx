import React from "react";
import {GameInterface} from "../Room";
import Game from "./Game";

interface PastGamesProps {
    games: GameInterface[]
}

class PastGames extends React.Component<PastGamesProps, any> {

    constructor(props: PastGamesProps) {
        super(props);
        this.state = {
            page: 1
        }
    }

    render() {
        const games = this.props.games.map(game => {
           return <Game
               key={`game_${game.id}`}
               id={game.id}
               name={game.boardGame.name}
               players={game.gamePlayers}
               gameTime={game.gameTime}
           />
        });
        return (
            <div style={{ marginTop: 10}}>
                {games}
            </div>
        );
    }
}

export default PastGames;