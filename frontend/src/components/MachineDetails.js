import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Snackbar, Alert, Paper, TableContainer, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Container, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MachineEdit from './MachineEdit';
import './MachineDetails.css';

const MachineDetails = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [machine, setMachine] = useState(null);
    const [delivery, setDelivery] = useState(null);
    const [open, setOpen] = useState(false);
    const [deleteInput, setDeleteInput] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [messageType, setMessageType] = useState('success');
    const [shake, setShake] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const handleOpenEditDialog = () => {
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
    };

    const handleEditClick = () => {
        setEditModalOpen(true);
    };

    const handleUpdateMachine = (updatedMachine) => {
        setMachine(updatedMachine);
        handleCloseEditDialog();
    };


    const handleEditModalClose = () => {
        setEditModalOpen(false);
    };

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleSnackbarOpen(messageType) {
        setMessageType(messageType);
        setSnackbarOpen(true);
    }

    function handleSnackbarClose() {
        setSnackbarOpen(false);
    }

    // Add this function in your MachineDetails component
    async function deleteMachine(id) {
        if (deleteInput === machine.name) {
            try {
                await axios.delete(`http://localhost:3001/api/machines/${id}`);
                setOpen(false);
                handleSnackbarOpen('success');
                // Redirect to the machines list page after successful deletion
                navigate('/machines');
                props.handleSnackbarOpen('success', 'Machine successfully deleted');
            } catch (error) {
                console.error('Error deleting machine:', error);
            }
        } else {
            setShake(true);
            setTimeout(() => setShake(false), 820);
            props.handleSnackbarOpen('error', 'Incorrect machine name');
        }
    }

    useEffect(() => {
        const getMachine = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/machines/${id}`);
                setMachine(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        getMachine();
    }, [id]);

    useEffect(() => {
        const getDelivery = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/deliveries/machine/${id}`);
                setDelivery(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        getDelivery();
    }, [id]);

    if (!machine || !delivery) {
        return <div>Loading...</div>;
    }

    return (
        <Container maxWidth="lg">
            <Paper elevation={10} style={{ padding: '1rem' }}>
                <Divider>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {machine.name}
                    </Typography>
                </Divider>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                }}
                >
                    <Button variant="outlined" color="primary" onClick={handleOpenEditDialog}>
                        Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleOpen}>
                        Delete Machine
                    </Button>
                </Box>
                <Dialog
                    open={editDialogOpen}
                    onClose={handleCloseEditDialog}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogContent>
                        <MachineEdit machine={machine} onSubmit={handleCloseEditDialog} onMachineUpdate={updatedMachine => handleUpdateMachine(updatedMachine)} />
                    </DialogContent>
                </Dialog>

                <Dialog open={open} onClose={handleClose} className={shake ? 'shake' : ''}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To confirm the deletion of the machine, please type the machine name.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Machine Name"
                            type="text"
                            fullWidth
                            value={deleteInput}
                            onChange={(e) => setDeleteInput(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => deleteMachine(id)} color="error">
                            Delete Machine
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={messageType}>
                        {messageType === 'success' ? 'Machine successfully deleted' : 'Incorrect machine name'}
                    </Alert>
                </Snackbar>
                <Typography variant="subtitle1" gutterBottom>
                    Serial number: {machine.serial_number}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Tag number: {machine.tag_number}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Type: {machine.type}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Site ID: {machine.siteid}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    SO: {machine.so}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    CCCREF: {machine.cccref}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    machineID: {machine.machineid}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Informations: {machine.information}
                </Typography>
                <Divider>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Delivery
                    </Typography>
                </Divider>
                {delivery.length === 0 ? (
                    <Typography variant="body1" component="p" gutterBottom>
                        No deliveries associated with this machine.
                    </Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Estimated Delivery Date:</strong> {delivery[0].estimated_delivery_date}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Delivery Status:</strong> {delivery[0].delivery_status}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Carrier:</strong> {delivery[0].carrier}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            <strong>Tracking Number:</strong> {delivery[0].tracking_number}
                        </Typography>
                    </TableContainer>
                )}
            </Paper>
        </Container>
    );
};

export default MachineDetails;
