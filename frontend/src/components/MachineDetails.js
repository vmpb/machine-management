import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Paper, TableContainer, Typography } from '@mui/material';

const MachineDetails = (props) => {
    const { id } = useParams();
    const [machine, setMachine] = useState(null);
    const [delivery, setDelivery] = useState(null);

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
        <Paper elevation={6} style={{ padding: '1rem' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {machine.name}
            </Typography>
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
            <hr></hr>
            <Typography variant="h5" component="h2" gutterBottom>
                Deliveries
            </Typography>
            {delivery.length === 0 ? (
                <Typography variant="body1" component="p" gutterBottom>
                    No deliveries associated with this machine.
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Estimated Delivery Date:</strong> {delivery.estimated_delivery_date}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Delivery Status:</strong> {delivery.delivery_status}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Carrier:</strong> {delivery.carrier}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Tracking Number:</strong> {delivery.tracking_number}
                    </Typography>
                </TableContainer>
            )}
        </Paper>
    );
};

export default MachineDetails;
