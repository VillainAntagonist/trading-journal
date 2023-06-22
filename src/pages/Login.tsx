import React from 'react';
import * as Yup from 'yup';
import {Form, FormikProvider, useFormik} from "formik";
import {useLoginMutation} from "../store/services/authApi";
import {Grid, TextField} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import Page from "../components/Page";

const Login : React.FC = () => {
    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });
    const [login, { isLoading, isError, error }] = useLoginMutation();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            // Call the login mutation hook
            login(values);
        },
    });
    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;


    return (
        <Page title="Login | Trading Journal">
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        id="username"
                        {...getFieldProps('username')}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        type="password"
                        id="password"
                        {...getFieldProps('password')}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        loading={isSubmitting}
                        fullWidth
                        style={{ marginTop: 16 }}
                    >
                        {isSubmitting ? 'Logging in...' : 'Log in'}
                    </LoadingButton>
                    </Form>
                </FormikProvider>
            </Grid>
        </Grid>
        </Page>
    );
};

export default Login;
