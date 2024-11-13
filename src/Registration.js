import { useFormik, Formik, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from 'yup';
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    FormControl,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

function formSubmission(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("User registered!");
        }, 2000);
    });
}
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est obligatoire'),
    placeBirth: Yup.string().required('Le lieu de naissance est obligatoire'),
    phoneNumber: Yup.string()
        .required('Le numéro de téléphone est obligatoire')
        .length(12, 'Le numéro de téléphone doit avoir 12 caractères'),
    dateBirth: Yup.date().required("La date de naissance est obligatoire"),
    email: Yup.string().email('L\'adresse E-mail est invalide').required('L\'adresse E-mail est obligatoire'),
    password: Yup.string().required('Le mot de passe est obligatoire')
        .min(6, "Le mot de passe doit avoir au moins 6 caractères"),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], "Les mots de passe doivent correspondre")
        .required('Confirmation du mot de passe est obligatoire'),
    acceptTerms: Yup.boolean().oneOf([true], 'Vous devez accepter les termes'),
});
async function createUser(formValues, onSubmittingProps) {
    try {
        await formSubmission(formValues);
        onSubmittingProps.resetForm();
        alert("Utilisateur enregistré !");
    } catch (error) {
        console.log(error);
    }
}

function Registration() {
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ textAlign: 'center', margin: '20px 0' }}>
                Inscription
            </Typography>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phoneNumber: '',
                    dateBirth: '',
                    placeBirth: '',
                    password: '',
                    passwordConfirmation: '',
                    acceptTerms: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    createUser(values, { resetForm: () => setSubmitting(false) });
                    setSubmitting(false);
                }}
            >
                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    name="name"
                                    as={TextField}
                                    fullWidth
                                    label="Nom"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={values.name}
                                    error={Boolean(ErrorMessage.name)}
                                    helperText={<ErrorMessage name="name" />}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Field
                                    name="email"
                                    as={TextField}
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={values.email}
                                    error={Boolean(ErrorMessage.email)}
                                    helperText={<ErrorMessage name="email" />}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Field
                                    name="phoneNumber"
                                    as={TextField}
                                    fullWidth
                                    label="Numéro de téléphone"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={values.phoneNumber}
                                    error={Boolean(ErrorMessage.phoneNumber)}
                                    helperText={<ErrorMessage name="phoneNumber" />}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Field
                                    name="dateBirth"
                                    as={TextField}
                                    fullWidth
                                    label="Date de naissance"
                                    type="date"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true }}
                                    onChange={handleChange}
                                    value={values.dateBirth}
                                    error={Boolean(ErrorMessage.dateBirth)}
                                    helperText={<ErrorMessage name="dateBirth" />}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Field
                                    name="placeBirth"
                                    as={TextField}
                                    fullWidth
                                    label="Lieu de naissance"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={values.placeBirth}
                                    error={Boolean(ErrorMessage.placeBirth)}
                                    helperText={<ErrorMessage name="placeBirth" />}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Field
                                    name="password"
                                    as={TextField}
                                    fullWidth
                                    label="Mot de passe"
                                    type="password"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={values.password}
                                    error={Boolean(ErrorMessage.password)}
                                    helperText={<ErrorMessage name="password" />}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Field
                                    name="passwordConfirmation"
                                    as={TextField}
                                    fullWidth
                                    label="Confirmation du mot de passe"
                                    type="password"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={values.passwordConfirmation}
                                    error={Boolean(ErrorMessage.passwordConfirmation)}
                                    helperText={<ErrorMessage name="passwordConfirmation" />}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl error={Boolean(ErrorMessage.acceptTerms)}>
                                    <FormControlLabel
                                        control={
                                            <Field
                                                name="acceptTerms"
                                                as={Checkbox}
                                                color="primary"
                                                checked={values.acceptTerms}
                                                onChange={handleChange}
                                            />
                                        }
                                        label="J'accepte les termes et conditions"
                                    />
                                    <ErrorMessage name="acceptTerms" component={Typography} variant="body2" color="error" />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                                    {isSubmitting ? 'Enregistrement...' : "S'inscrire"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </Container>
    );
}

export default Registration;