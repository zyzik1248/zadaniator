import React, { useState, useEffect } from 'react';
import './TaskModal.scss';
import { ITask, ITaskComment } from '../../types';
import { getTaskComments, addTaskComment, deleteTaskComment } from '../../api/tasks.ts';
import TaskComment from './TaskComment.tsx';
import { updateTask } from '../../api/tasks.ts'; // Dodaj funkcję aktualizacji taska

interface IProps {
    task: ITask;
    onClose: () => void;
    onApprove: (id: number, approved: boolean) => void;
    onSubmit?: ()=>void
}

const TaskModal: React.FC<IProps> = ({ task, onClose, onApprove, onSubmit }) => {
    const [comments, setComments] = useState<ITaskComment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [approved, setApproved] = useState(task.approved_by_tester || false);

    // Pobierz komentarze przy pierwszym renderze
    useEffect(() => {
        if (!task?.id) {
            console.error('Task ID is undefined');
            return;
        }

        const fetchComments = async () => {
            setLoading(true);
            try {
                const fetchedComments = await getTaskComments(task.id!);
                console.log('Fetched Comments:', fetchedComments);
                setComments(fetchedComments);
            } catch (error) {
                console.error('Detailed fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [task.id]);

    // Dodawanie komentarza
    const handleAddComment = async () => {
        if (!newComment.trim()) return;
    
        setSubmitting(true);
        try {
            // Dodaj komentarz
            await addTaskComment(task.id!, {
                content: newComment.trim(),
                task: task.id!,
                author: task.created_by, // ID aktualnego użytkownika
            });
    
            setNewComment('');
    
            // Pobierz zaktualizowaną listę komentarzy
            const updatedComments = await getTaskComments(task.id!);
            setComments(updatedComments); // Zaktualizuj stan komentarzy
            onSubmit && onSubmit()
        } catch (error) {
            console.error('Error adding comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    // Usuwanie komentarza
    const handleDeleteComment = async (commentId: number) => {
        setSubmitting(true);
        try {
            await deleteTaskComment(task.id!, commentId);
            setComments((prev) => prev.filter((comment) => comment.id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    // Obsługa zatwierdzenia przez testera
    const handleApprovalChange = async () => {
        const newApprovalState = !approved;
        setApproved(newApprovalState);

        try {
            await updateTask({ ...task, approved_by_tester: newApprovalState });
            onApprove(task.id!, newApprovalState);
        } catch (error) {
            console.error('Error updating task approval:', error);
        }
    };

    return (
        <div className="task-modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    ✖
                </button>
                <h2>{task.title}</h2>
                <p className="description">{task.description}</p>

                <h3>Comments</h3>
                {loading ? (
                    <div className="spinner">Loading comments...</div>
                ) : (
                    <ul className="comments-list">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <TaskComment
                                    key={comment.id}
                                    authorName={comment.authorName}
                                    comment={comment}
                                    onDelete={handleDeleteComment}
                                    isDeleting={submitting}
                                />
                            ))
                        ) : (
                            <p>No comments available.</p>
                        )}
                    </ul>
                )}

                <div className="add-comment">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        disabled={submitting}
                    />
                    <button onClick={handleAddComment} disabled={submitting || !newComment.trim()}>
                        {submitting ? 'Adding...' : 'Add Comment'}
                    </button>
                </div>

                <div className="approve-section">
                    <label>
                        <input
                            type="checkbox"
                            checked={approved}
                            onChange={handleApprovalChange}
                            disabled={submitting}
                        />
                        Approved by Tester
                    </label>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
