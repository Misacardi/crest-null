import './infoPlayer.css'
function InfoPlayer({side, wins, time}) {
    return (
        <div className="player">
            <div className="player__title">Гравець: {side}</div>
            <div className="player__wins">Кількість перемог: {wins}</div>
        </div>
    );
}

export default InfoPlayer;