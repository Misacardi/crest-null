import './modal.css'

function Modal({toggle, setToggle, winner, timer}) {
    
    const res = winner ? 'Гравець: ' + winner + ' переміг' : "Нічия! Спробуйте ще :)"
    const winTimer = winner ? 'Переміг за ' + timer :  "Загальний час гри: " + timer
    return (

        <div className={'modal ' + toggle} onClick={() => setToggle('')}>
            <div onClick={e => e.stopPropagation()} className="modal__inner">
            
                <div className="modal__winner"> {res}</div>
                <div className="modal__timer">{winTimer} </div>


                <button className='ok' onClick={() => setToggle('')}>OK</button>
            </div>
        </div>
    );
}

export default Modal;