import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Snackbar,
} from "@mui/material";
import PageContainer from "../../../src/components/container/PageContainer";
import Breadcrumb from "../../../src/layouts/full/shared/breadcrumb/Breadcrumb";

import CustomFormLabel from "../../../src/components/forms/theme-elements/CustomFormLabel";
import ParentCard from "../../../src/components/shared/ParentCard";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";

const steps = ["Level", "Quarter", "Experiment"];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FormWizard = () => {
  const router = useRouter();

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };
  // Level select item info
  const [selectLevel, setSelectLevel] = React.useState(0);
  const handleSelectLevel = (event: any) => {
    const { value } = event.currentTarget;

    handleSnackbarClose();

    if (!(value == 0)) {
      setSnackbarOpen(true);
      return;
    }

    setSelectLevel(value);
    handleNext();
  };
  const levels = [
    <>
      새싹
      <br></br>
      (7세 ~ 9세)
    </>,
    <>
      나무
      <br></br>
      (10세 ~ 12세)
    </>,
    <>
      숲<br></br>
      (13세 ~ 15세)
    </>,
  ];
  // Quarter select item info
  const [selectQuarter, setSelectQuarter] = React.useState(0);
  const handleSelectQuarter = (event: any) => {
    const { value } = event.currentTarget;

    handleSnackbarClose();

    if (!(value == 2)) {
      setSnackbarOpen(true);
      return;
    }

    setSelectQuarter(value);
    handleNext();
  };
  const quarters = [<>봄</>, <>여름</>, <>가을</>, <>겨울</>];
  // Experiment select item info
  const getExperiment = (level: number, quarter: number) => {
    const findResult = experiments.find(
      (item) => item.level == level && item.quarter == quarter
    );
    return !!findResult ? findResult.items : [];
  };
  const handelSelectExperiments = (event: any, target: any) => {
    const { value } = event.currentTarget;

    handleSnackbarClose();

    if (!(value == 0)) {
      setSnackbarOpen(true);
      return;
    }

    router.push(target);
  };
  const experiments = [
    {
      level: 0,
      quarter: 2,
      items: [
        {
          title: "스스로 커지는 풍선",
          target: "/forms/form-wizard/science-rap/self-inflating-balloon",
        },
        {
          title: "달걀 탱탱볼",
          target: undefined,
        },
        {
          title: "자석 자동차",
          target: undefined,
        },
        {
          title: "빨대피리",
          target: undefined,
        },
      ],
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step: any) => step === -1;

  const isStepSkipped = (step: any) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);

      return newSkipped;
    });
  };

  // eslint-disable-next-line consistent-return
  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <CustomFormLabel htmlFor="Level">Level</CustomFormLabel>
            <br></br>
            {levels.map((item, index) => {
              return (
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  style={{
                    marginBottom: "20px",
                  }}
                  key={index}
                  value={index}
                  onClick={handleSelectLevel}
                >
                  {item}
                </Button>
              );
            })}
          </Box>
        );
      case 1:
        return (
          <Box>
            <CustomFormLabel htmlFor="Quarter">Quarter</CustomFormLabel>
            <br></br>
            {quarters.map((item, index) => {
              return (
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  style={{
                    marginBottom: "20px",
                  }}
                  key={index}
                  value={index}
                  onClick={handleSelectQuarter}
                >
                  {item}
                </Button>
              );
            })}
          </Box>
        );
      case 2:
        return (
          <Box pt={3}>
            <CustomFormLabel htmlFor="Experiment">Experiment</CustomFormLabel>
            <br></br>
            {getExperiment(selectLevel, selectQuarter).map((item, index) => {
              return (
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  style={{
                    marginBottom: "20px",
                  }}
                  key={index}
                  value={index}
                  onClick={(e: any) => {
                    handelSelectExperiments(e, item.target);
                  }}
                >
                  {index + 1}. {item.title}
                </Button>
              );
            })}
            {/* <Typography variant="h5">Terms and condition</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Sard about this site or you have been to it, but you cannot figure
              out what it is or what it can do. MTA web directory isSard about
              this site or you have been to it, but you cannot figure out what
              it is or what it can do. MTA web directory is
            </Typography>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Agree with terms?"
            /> */}
          </Box>
        );
      default:
        break;
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <PageContainer>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          준비 중입니다. 다른 기능을 이용하여 주십시오.
        </Alert>
      </Snackbar>

      <ParentCard title="Level Select Wizard">
        <Box width="100%">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Stack spacing={2} mt={3}>
                <Alert severity="success">
                  All steps completed - you&apos;re finished
                </Alert>

                <Box textAlign="right">
                  <Button
                    onClick={handleReset}
                    variant="contained"
                    color="error"
                  >
                    Reset
                  </Button>
                </Box>
              </Stack>
            </>
          ) : (
            <>
              <Box>{handleSteps(activeStep)}</Box>

              <Box display="flex" flexDirection="row" mt={3}>
                <Button
                  color="inherit"
                  variant="contained"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box flex="1 1 auto" />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

                {/* <Button
                  onClick={handleNext}
                  variant="contained"
                  color={
                    activeStep === steps.length - 1 ? "success" : "secondary"
                  }
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button> */}
              </Box>
            </>
          )}
        </Box>
      </ParentCard>
    </PageContainer>
  );
};

export default FormWizard;
