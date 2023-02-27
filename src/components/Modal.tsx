const Modal = ({children, closeModal, width} : 
    {children: React.ReactNode, 
        closeModal: (close: boolean) => void, 
        width?: 'full' | 'normal'})
    : JSX.Element => {
    return (
        <>
            <div className='modal modal-open'>
                <div className={`modal-box ${width === 'full' ? 'w-11/12 max-w-5xl' : ''}`}>
                <button onClick={() => closeModal(false)} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Modal