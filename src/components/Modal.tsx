const Modal = ({children, isOpen, closeModal} : {children: React.ReactNode, isOpen: boolean, closeModal: (close: boolean) => void}): JSX.Element => {
    return (
        <>
            <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
                <div className='modal-box w-11/12 max-w-5xl'>
                <button onClick={() => closeModal(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Modal