import React from "react";
import ReactPlayer from "react-player";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import PageContainer from "../../../../../src/components/container/PageContainer";
import Breadcrumb from "../../../../../src/layouts/full/shared/breadcrumb/Breadcrumb";

import CustomFormLabel from "../../../../../src/components/forms/theme-elements/CustomFormLabel";
import ParentCard from "../../../../../src/components/shared/ParentCard";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Stack } from "@mui/system";
import { Height } from "@mui/icons-material";
import { useRouter } from "next/router";

const steps = ["Video 1", "Video 2", "Video 3", "Video 4", "Quiz", "Finish"];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const selfinflatingballoon = () => {
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

  const [isWindow, setIsWindow] = useState<boolean>(false);

  useEffect(() => {
    setIsWindow(true);
  }, []);

  const videos = [
    "/videos/v1.mp4",
    "/videos/v2.mp4",
    "/videos/v3.mp4",
    "/videos/v4.mp4",
  ];

  // quiz select item info
  const [selectquiz, setSelectquiz] = React.useState(0);
  const handleSelectquiz = (event: any) => {
    const { value } = event.currentTarget;

    handleSnackbarClose();

    if (!(value == 1)) {
      setSnackbarOpen(true);
      return;
    }

    setSelectquiz(value);
    handleNext();
  };
  const quizs = [<>산소</>, <>이산화탄소</>];

  const [isShowNextButton, setIsShowNextButton] = useState<boolean>(true);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step: any) => step === -1;

  const isStepSkipped = (step: any) => skipped.has(step);

  const router = useRouter();

  useEffect(() => {
    if (activeStep === steps.length) {
      router.push("/");
      return;
    }

    if (activeStep === 4) {
      setIsShowNextButton(false);
    } else {
      setIsShowNextButton(true);
    }
  }, [activeStep]);

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
      case 1:
      case 2:
      case 3:
        return (
          <Box>
            <CustomFormLabel htmlFor="Videos">
              스스로 커지는 풍선 | Video 4 / {`${step + 1}`}
            </CustomFormLabel>
            <br></br>
            <div>
              <ReactPlayer
                className="react-player"
                url={videos[step]}
                width="100%"
                height="70vh"
                style={{
                  objectFit: "fill",
                }}
                muted={false}
                playing={true}
                loop={true}
                controls={true}
                playsinline
              />
            </div>
          </Box>
        );
      case 4:
        return (
          <Box>
            <CustomFormLabel htmlFor="quiz">quiz</CustomFormLabel>
            <div>
              식초와 탄산수소 나트륨이 만나면
              (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)라는 기체가 발생해요.
            </div>
            <br></br>
            <div> &lt;보기 &gt;</div>
            <br></br>
            {quizs.map((item, index) => {
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
                  onClick={handleSelectquiz}
                >
                  {item}
                </Button>
              );
            })}
          </Box>
        );
      case 5:
        return (
          <Box>
            <CustomFormLabel htmlFor="Finish">Finish</CustomFormLabel>
            <br></br>
            <ReactPlayer
              className="react-player"
              url="https://youtu.be/XVAoQ60yAZc?si=NSxtkV-Z-Dcx31KR"
              width="100%"
              height="70vh"
              style={{
                objectFit: "fill",
              }}
              muted={true}
              playing={true}
              loop={true}
              playsinline
            />
          </Box>
        );
      default:
        return <></>;
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
          오답 입니다. 다시 선택해주세요.
        </Alert>
      </Snackbar>
      <ParentCard title="스스로 커지는 풍선">
        <Box width="100%">
          <Stepper
            style={{
              flexWrap: "wrap",
              justifyItems: "center",
              alignContent: "space-between",
              justifyContent: "space-around",
            }}
            activeStep={activeStep}
          >
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
              <Box>{isWindow && handleSteps(activeStep)}</Box>

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
                {isShowNextButton && (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    color={
                      activeStep === steps.length - 1 ? "success" : "secondary"
                    }
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                )}
              </Box>
            </>
          )}
        </Box>
      </ParentCard>
    </PageContainer>
  );
};

export default selfinflatingballoon;
