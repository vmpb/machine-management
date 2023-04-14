// src/components/MachineForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Grid } from '@mui/material';

const MachineForm = ({ initialValues, onSubmit }) => {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: initialValues,
    });

    React.useEffect(() => {
        if (initialValues) {
            for (const [key, value] of Object.entries(initialValues)) {
                setValue(key, value);
            }
        }
    }, [initialValues, setValue]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>

                    <TextField
                        label="Machine ID"
                        fullWidth
                        {...register('machineid')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        fullWidth
                        {...register('name')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="SO"
                        fullWidth
                        {...register('so')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Serial Number"
                        fullWidth
                        {...register('serial_number')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="CCC Ref"
                        fullWidth
                        {...register('cccref')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Tag Number"
                        fullWidth
                        {...register('tag_number')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Site ID"
                        fullWidth
                        {...register('siteid')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Type"
                        fullWidth
                        {...register('type')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Information"
                        fullWidth
                        multiline
                        rows={3}
                        {...register('information')}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default MachineForm;
