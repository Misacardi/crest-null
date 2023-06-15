import Timer from '../timer';
import './infoPlayer.css'
function InfoPlayer({side, wins, timer}) {
    return (
        <div className="player">
            <div className="player__title">Гравець: {side}</div>
            <div className="player__wins">Кількість перемог: {wins}</div>
            {timer}
        </div>
    );
}

export default InfoPlayer;