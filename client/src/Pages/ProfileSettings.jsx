import React, { useCallback, useEffect, useState } from 'react';
import { Form, Formik, useField } from 'formik';
import * as Yup from 'yup';
import { Alert, AlertIcon, Box, Button, FormLabel, Image, Input, Stack, VStack } from '@chakra-ui/react';
import { customerProfilePictureUrl, updateCustomer, uploadCustomerProfilePicture } from '../services/client';
import { errorNotification, successNotification } from '../services/notification';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Box>
            <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
            <Input {...field} {...props} />
            {meta.touched && meta.error ? (
                <Alert status="error" mt={2}>
                    <AlertIcon />
                    {meta.error}
                </Alert>
            ) : null}
        </Box>
    );
};

const MyDropzone = ({ customerId, fetchCustomerData }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            const formData = new FormData();
            formData.append('file', acceptedFiles[0]);

            uploadCustomerProfilePicture(customerId, formData)
                .then(() => {
                    successNotification('Success', 'Profile picture uploaded');
                    fetchCustomerData();
                })
                .catch(() => {
                    errorNotification('Error', 'Profile picture failed upload');
                });
        },
        [customerId, fetchCustomerData]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Box
            {...getRootProps()}
            w="100%"
            textAlign="center"
            border="dashed"
            borderColor="gray.200"
            borderRadius="3xl"
            p={6}
            rounded="md"
        >
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the picture here ...</p> : <p>Drag 'n' drop picture here, or click to select picture</p>}
        </Box>
    );
};

const ProfileSettings = () => {
    const { logOut, customer, setCustomerFromToken } = useAuth();
    const [redirect, setRedirect] = useState(false);
    const customerId = customer?.id;


    const fetchCustomerData = useCallback(() => {
        if (customerId) {
            setCustomerFromToken(); // Assuming this refreshes the customer data
        }
    }, [customerId, setCustomerFromToken]);

    useEffect(() => {
        fetchCustomerData();
    }, [fetchCustomerData]);

    const initialValues = {
        name: customer?.name || '',
        email: customer?.email || '',
        age: customer?.age || ''
    };

    const handleLogout = () => {
        logOut();
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <Box className="flex flex-col justify-center items-center min-h-screen bg-mainGray text-white text-center">
            <VStack spacing={5} mb={5}>
                <Image className="rounded-full h-64 w-64"

                    objectFit="cover"
                    src={customerProfilePictureUrl(customerId)}
                    alt="Profile"
                />
                <MyDropzone customerId={customerId} fetchCustomerData={fetchCustomerData} />
            </VStack>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    name: Yup.string().max(15, 'Must be 15 characters or less'),
                    email: Yup.string().email('Invalid email address'),
                    age: Yup.number().min(16, 'Must be at least 16 years old').max(100, 'Must be less than 100 years old')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    updateCustomer(customerId, values)
                        .then(() => {
                            successNotification('Profile updated', 'Your profile was successfully updated');
                            fetchCustomerData();
                        })
                        .catch((err) => {
                            errorNotification('Error', err.response.data.message);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}
            >
                {({ isValid, isSubmitting, dirty }) => (
                    <Form>
                        <Stack spacing={6}>
                            <MyTextInput label="Name" name="name" type="text" placeholder={customer?.name} />
                            <MyTextInput label="Email Address" name="email" type="email" placeholder={customer?.email} />
                            <MyTextInput label="Age" name="age" type="number" placeholder={customer?.age}/>

                            <Button className="primary" disabled={!(isValid && dirty) || isSubmitting} type="submit">
                                Submit
                            </Button>
                            <Button className="primary" onClick={handleLogout} colorScheme="red">
                                Logout
                            </Button>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default ProfileSettings;
