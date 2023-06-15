import './modal.css'

function Modal({toggle, setToggle, winner}) {
    
    const res = winner ? 'Перемога: ' + winner : "Нічья"
    return (

        <div className={'modal ' + toggle} onClick={() => setToggle('')}>
            <div onClick={e => e.stopPropagation()} className="modal__inner">
            
                <div className="modal__winner"> {res}</div>
                <div className="modal__timer"></div>


                <button className='ok'>OK</button>
            </div>
        </div>
    );
}

export default Modal;