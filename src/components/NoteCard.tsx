import { useState } from 'react'

import ReactMarkdown from 'react-markdown'

import { type RouterOutputs } from '~/utils/api'

import Modal from './Modal'
import { NoteEditor } from './NoteEditor'

type Note = RouterOutputs['note']['getAll'][0]

export const NoteCard = ({
    note,
    onDelete,
    onEdit
}: {
    note: Note
    onDelete: () => void
    onEdit: (note: { title: string, content: string }) => void
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true)

    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    return (
        <>
            <div className='card mt-5 border border-gray-200 bg-base-100 shadow-xl'>
                <div className='card-body m-0 p-3'>
                    <div
                        className={`collapse-arrow 
                        ${isExpanded ? 'collapse-open' : ''} 
                        collapse`}
                    >
                        <div className='collapse-title text-xl font-bold hover:cursor-pointer' onClick={() => setIsExpanded(!isExpanded)}>{note.title}</div>
                        <div className='collapse-content'>
                            <article className='prose lg:prose-xl'>
                                <ReactMarkdown>{note.content}</ReactMarkdown>
                            </article>
                        </div>
                    </div>
                </div>
                <div className='card-actions mx-2 flex justify-end mb-2'>
                    <button
                        className='btn-info btn-xs btn px-7 py-3 text-sm place-content-center'
                        onClick={() => setOpenEditModal(true)}
                    >
                        Edit
                    </button>
                    <button 
                    className='btn-warning btn-xs btn px-7 py-3 text-sm place-content-center' 
                    onClick={() => setOpenDeleteModal(true)}
                    >
                        Delete
                    </button>
                </div>
            </div>
            {openEditModal
                ? (
                    <Modal
                        width='full'
                        closeModal={setOpenEditModal}
                    >
                        <NoteEditor
                            note={note}
                            onSave={({ title, content }) => {
                                void onEdit({ title, content })
                                void setOpenEditModal(false)
                            }} />
                    </Modal>)
                : null
            }

            {
                openDeleteModal
                ? (
                    <Modal
                        closeModal={setOpenDeleteModal}
                        >
                        <h3 className='font-bold text-xl'>Are you sure you want to delete note &apos;{`${note.title}`}&apos;?</h3>
                        <p className='text-gray-600 py-4'>You can&apos;t reverse this later</p>
                        <div className='modal-action'>
                            <button 
                                className='btn-warning btn-xs btn px-7 py-3 text-sm place-content-center' 
                                onClick={() => {
                                    void onDelete()
                                    void setOpenDeleteModal(false)
                                }}
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </Modal>    
                )
                : null
            }
        </>
    )
}