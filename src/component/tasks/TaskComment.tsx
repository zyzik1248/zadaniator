import React from 'react';
import { ITaskComment } from '../../types';
import './TaskComment.scss';

interface IProps {
    comment: ITaskComment;
    onDelete: (commentId: number) => void;
    isDeleting: boolean;
    authorName: string; // Nowa właściwość
}

const TaskComment: React.FC<IProps> = ({ comment, onDelete, isDeleting, authorName}) => {
    return (
        <li className="comment-item">
            <p><strong>Author:</strong> {authorName}</p>
            <p><strong>Content:</strong> {comment.content}</p>
            <p><small>Created at: {new Date(comment.created_at).toLocaleString()}</small></p>
            <button
                onClick={() => onDelete(comment.id)}
                className="delete-button"
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
        </li>
    );
};

export default TaskComment;
