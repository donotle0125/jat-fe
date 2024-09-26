import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    getJobApplications,
    updateJobApplicationStatus,
} from '../services/api';
import '../styles/Dashboard.css';

const initialColumns = {
    Pending: {
        name: 'Pending',
        items: [],
    },
    Applied: {
        name: 'Applied',
        items: [],
    },
    Interview: {
        name: 'Interview',
        items: [],
    },
    Offer: {
        name: 'Offer',
        items: [],
    },
    Denied: {
        name: 'Denied',
        items: [],
    },
};

const Dashboard = ({ userData }) => {
    const [columns, setColumns] = useState(initialColumns);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [jobApps, setJobApps] = useState([]);

    useEffect(() => {
        const fetchJobApplications = async () => {
            try {
                setLoading(true);
                if (userData && userData.id) {
                    const response = await getJobApplications(userData.id);

                    if (response.status === 200) {
                        const jobs = response.data;

                        // Verify the response data structure
                        if (Array.isArray(jobs)) {
                            setJobApps(jobs);

                            // Sort jobs into their respective columns based on status
                            const newColumns = { ...initialColumns };
                            jobs.forEach((job) => {
                                // Ensure status exists before pushing to the column
                                if (newColumns[job.status]) {
                                    newColumns[job.status].items.push(job);
                                } else {
                                    console.error(
                                        `Unknown status '${job.status}' for job application:`,
                                        job
                                    );
                                }
                            });

                            setColumns(newColumns);
                            setError(null);
                        } else {
                            throw new Error(
                                'Unexpected data format from the server.'
                            );
                        }
                    } else {
                        throw new Error(
                            `Unexpected response status: ${response.status}`
                        );
                    }
                } else {
                    setError('User data not available.');
                }
            } catch (err) {
                // Log the actual error object to understand what is being caught
                console.error('Error fetching job applications:', err);
                setError(
                    err.message ||
                        'Failed to fetch job applications. Please try again.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchJobApplications();
    }, [userData]);

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [movedItem] = sourceItems.splice(source.index, 1);

            // Update the status of the moved item to match the destination column
            movedItem.status = destination.droppableId;

            destItems.splice(destination.index, 0, movedItem);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems,
                },
            });

            // Prepare the updated job application data
            const updatedJobApplicationData = {
                user_id: userData.id,
                company_name: movedItem.company_name,
                job_title: movedItem.job_title,
                job_url: movedItem.job_url,
                job_description: movedItem.job_description,
                date_applied: movedItem.date_applied,
                status: movedItem.status,
                keywords: movedItem.keywords,
            };

            try {
                await updateJobApplicationStatus(
                    updatedJobApplicationData,
                    movedItem.id
                );
            } catch (error) {
                console.error(
                    'Failed to update job application status:',
                    error
                );
            }
        }
    };

    return (
        <div className='dashboard-container'>
            <div className='dashboard-wrapper'>
                <h1>
                    Welcome to <span>your Dashboard</span>
                </h1>
                <button className='btn from-left'>Add new job +</button>
                {loading ? (
                    <p>Loading job applications...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className='kanban-board-container'>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className='kanban-board'>
                                {Object.entries(columns).map(
                                    ([columnId, column]) => (
                                        <Droppable
                                            key={columnId}
                                            droppableId={columnId}
                                        >
                                            {(provided) => (
                                                <div
                                                    className='column'
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <h2>{column.name}</h2>
                                                    {column.items.map(
                                                        (item, index) => (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id.toString()}
                                                                index={index}
                                                            >
                                                                {(provided) => (
                                                                    <div
                                                                        className='job-card'
                                                                        ref={
                                                                            provided.innerRef
                                                                        }
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                    >
                                                                        <h2>
                                                                            {
                                                                                item.job_title
                                                                            }
                                                                        </h2>
                                                                        <h3>
                                                                            Company:{' '}
                                                                            {
                                                                                item.company_name
                                                                            }
                                                                        </h3>
                                                                        <p>
                                                                            Date
                                                                            Applied:{' '}
                                                                            {
                                                                                item.date_applied
                                                                            }
                                                                        </p>
                                                                        <button className='edit-job-app'>
                                                                            Edit
                                                                        </button>
                                                                        <button className='delete-job-app'>
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        )
                                                    )}
                                                    {provided.placeholder}
                                                </div>
                                            )}
                                        </Droppable>
                                    )
                                )}
                            </div>
                        </DragDropContext>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
