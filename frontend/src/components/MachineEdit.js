import React from 'react';
import MachineForm from './MachineForm';
import axios from 'axios';

const MachineEdit = ({ machine, onSubmit, onMachineUpdate }) => {

    const handleUpdateMachine = async (updatedMachineData) => {
        try {
            const response = await axios.put(`http://localhost:3001/api/machines/${machine.id}`, updatedMachineData);
            console.log("Response from the server:", response);
            const updatedMachine = response.data;
            if (onMachineUpdate) {
                onMachineUpdate(updatedMachine);
            }
        } catch (error) {
            console.error('Error updating machine:', error);
        }
    };

    return (
        <div>
            <h1>Edit Machine</h1>
            <MachineForm initialValues={machine} onSubmit={handleUpdateMachine} />
        </div>
    );
};

export default MachineEdit;
