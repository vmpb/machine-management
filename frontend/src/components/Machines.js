import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const API_URL = 'http://localhost:3001/api/machines';

const Machines = () => {
    const [machines, setMachines] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const handleClickOpen = () => {
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
    };

    const [nameInputValue, setNameInputValue] = useState('');
    const [serialNumberInputValue, setSerialNumberInputValue] = useState('');
    const [siteIdInputValue, setSiteIdInputValue] = useState('');
    const [tagNumberInputValue, setTagNumberInputValue] = useState('');
    const [typeInputValue, setTypeInputValue] = useState('');
    const [soInputValue, setSoInputValue] = useState('');
    const [cccRefInputValue, setCccrefInputValue] = useState('');

    const handleAddMachine = async () => {
        try {
            await axios.post(API_URL, {
                name: nameInputValue,
                serial_number: serialNumberInputValue,
                siteid: siteIdInputValue,
                tag_number: tagNumberInputValue || null,
                type: typeInputValue || null,
                so: soInputValue || null,
                cccref: cccRefInputValue || null,
            });
            handleClose();
            fetchMachines();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMachines();
    }, []);

    const fetchMachines = async () => {
        try {
            const response = await axios.get(API_URL);
            setMachines(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Machines</h1>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Machine
            </Button>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Add Machine</DialogTitle>
                <DialogContent>
                    <TextField
                        id="name"
                        label="Name"
                        value={nameInputValue}
                        onChange={(e) => setNameInputValue(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        id="serialNumber"
                        label="Serial Number"
                        value={serialNumberInputValue}
                        onChange={(e) => setSerialNumberInputValue(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        id="siteId"
                        label="Site ID"
                        value={siteIdInputValue}
                        onChange={(e) => setSiteIdInputValue(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        required
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        id="tagNumber"
                        label="Tag Number"
                        value={tagNumberInputValue}
                        onChange={(e) => setTagNumberInputValue(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        id="type"
                        label="Type"
                        value={typeInputValue}
                        onChange={(e) => setTypeInputValue(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        id="so"
                        label="SO"
                        value={soInputValue}
                        onChange={(e) => setSoInputValue(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        id="cccref"
                        label="CCC Ref"
                        value={cccRefInputValue}
                        onChange={(e) => setCccrefInputValue(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddMachine}>Add</Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Serial Number</TableCell>
                            {/* Add other column headers here */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {machines.map((machine) => (
                            <TableRow key={machine.id}>
                                <TableCell>{machine.id}</TableCell>
                                <TableCell>{machine.name}</TableCell>
                                <TableCell>{machine.serial_number}</TableCell>
                                {/* Add other columns here */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Machines;
