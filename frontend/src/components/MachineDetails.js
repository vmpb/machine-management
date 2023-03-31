import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Paper, Typography } from '@mui/material';


const MachineDetails = () => {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);
  console.log(machine,setMachine);

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

  if (!machine) {
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
    </Paper>
  );
};

export default MachineDetails;
