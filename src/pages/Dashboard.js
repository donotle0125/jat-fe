import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    getJobApplications,
    updateJobApplicationStatus,
    deleteJobApplication,
} from '../services/api';
import '../styles/Dashboard.css';
import Modal from '../components/Modal';
import AddNewJob from '../components/AddNewJob';

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
    const [, setJobApps] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleJobAdded = (newJob) => {
        const newColumns = { ...columns };
        if (newColumns[newJob.status]) {
            newColumns[newJob.status].items.push(newJob);
        }
        setColumns(newColumns);
    };

    const handleDelete = async (jobId) => {
        try {
            await deleteJobApplication(jobId);

            const newColumns = { ...columns };

            Object.keys(newColumns).forEach((columnId) => {
                newColumns[columnId].items = newColumns[columnId].items.filter(
                    (job) => job.id !== jobId
                );
            });

            setColumns(newColumns);
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    useEffect(() => {
        const fetchJobApplications = async () => {
            try {
                setLoading(true);
                if (userData && userData.id) {
                    const response = await getJobApplications(userData.id);

                    if (response.status === 200) {
                        const jobs = response.data;

                        const newColumns = { ...initialColumns };

                        if (Array.isArray(jobs) && jobs.length > 0) {
                            jobs.forEach((job) => {
                                if (newColumns[job.status]) {
                                    newColumns[job.status].items.push(job);
                                } else {
                                    console.error(
                                        `Unknown status '${job.status}' for job application:`,
                                        job
                                    );
                                }
                            });
                        }

                        setColumns(newColumns);
                        setJobApps(jobs);
                        setError(null);
                    } else {
                        throw new Error(
                            `Unexpected response status: ${response.status}`
                        );
                    }
                } else {
                    setError('User data not available.');
                }
            } catch (err) {
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
                <button
                    className='add-new-job-btn'
                    onClick={handleOpenModal}
                    role='button'
                >
                    Add new job +
                </button>

                {showModal && (
                    <Modal show={showModal} onClose={handleCloseModal}>
                        <AddNewJob
                            userData={userData}
                            handleCloseModal={handleCloseModal}
                            onJobAdded={handleJobAdded}
                        />
                    </Modal>
                )}
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
                                                    <h2>
                                                        {column.name} (
                                                        {column.items.length})
                                                    </h2>
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
                                                                        <button
                                                                            className='delete-job-app'
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    item.id
                                                                                )
                                                                            }
                                                                        >
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
