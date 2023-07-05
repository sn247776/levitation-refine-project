import { useState } from 'react';
import { TextField, Button, Grid, Stepper, Step, StepLabel, Box } from '@mui/material';
import axios from 'axios';

export const BlogPostList = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    geolocation: 'hello',
    single_file: null,
    multi_files: [],
  });

  const steps = ['Basic Details', 'Address', 'File Upload'];
  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    if (activeStep === 0 && (formData.name === '' || formData.email === '' || formData.phone_number === '')) {
      return; // Return without updating activeStep if first step is empty
    }
    if (
      activeStep === 1 &&
      (formData.address_1 === '' ||
        formData.address_2 === '' ||
        formData.city === '' ||
        formData.state === '' ||
        formData.pincode === '' ||
        formData.country === '' ||
        formData.geolocation === '')
    ) {
      return; // Return without updating activeStep if second step is empty
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSingleFileUpload = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      single_file: event.target.files?.[0],
    }));
  };

  const handleMultiFileUpload = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      multi_files: Array.from(event.target.files),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);

    const token = localStorage.getItem('refine-auth');

    console.log(token);

    axios
      .post('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/form', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle the response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              required
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              label="Email"
              margin="normal"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              label="Phone Number"
              margin="normal"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              fullWidth
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              required
              label="Address 1"
              margin="normal"
              name="address_1"
              value={formData.address_1}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              label="Address 2"
              margin="normal"
              name="address_2"
              value={formData.address_2}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              label="City"
              margin="normal"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              label="State"
              margin="normal"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              label="Pincode"
              margin="normal"
              name="pincode"
              type="number"
              value={formData.pincode}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              label="Country"
              margin="normal"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              required
              label="Geolocation"
              margin="normal"
              name="geolocation"
              value={formData.geolocation}
              onChange={handleChange}
              fullWidth
            />
          </>
        );
      case 2:
        return (
          <>
            <Box m={5}>
              <Box m={2}>
                <p>Single File</p>
                <input required type="file" name="single_file" onChange={handleSingleFileUpload} />
              </Box>
              <Box m={2}>
                <p>Multi Files</p>
                <input type="file" name="multi_files" onChange={handleMultiFileUpload} multiple />
              </Box>
            </Box>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {renderStepContent(activeStep)}
          <Grid item xs={12}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={
                activeStep === 0 && (formData.name === '' || formData.email === '' || formData.phone_number === '')
              }
            >
              {isLastStep ? 'Submit' : 'Next'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
