import { useState } from 'react'

import ReactMarkdown from 'react-markdown'

import { type RouterOutputs } from '~/utils/api'

type Note = RouterOutputs['note']['getAll'][0]

export const NoteCard = ({
    note,
    onDelete,
    onEdit
}:{
    note: Note
    onDelete: () => void
    onEdit: () => void
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true)

    return (
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
            <div className='card-actions mx-2 flex justify-end mb-1'>
                <button className='btn-warning btn-xs btn px-7 py-3 text-sm place-content-center' onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}