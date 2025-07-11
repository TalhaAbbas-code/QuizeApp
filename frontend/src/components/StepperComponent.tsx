// 🛠 StepperComponent.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

interface StepperProps {
  activeStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  completed: { [key: number]: boolean };
}

export default function StepperComponent({
  activeStep,
  totalSteps,
  onStepClick,
  completed
}: StepperProps) {
  const steps = Array.from(
    { length: totalSteps },
    (_, i) => `Question ${i + 1}`
  );

  return (
    <Box sx={{ width: "100%", mb: 5 }}>
      <Stepper nonLinear activeStep={activeStep}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <Step key={index} completed={completed[index]}>
            <StepButton
              onClick={() => onStepClick(index)}
              sx={{
                "& .MuiStepLabel-iconContainer .MuiStepIcon-root.Mui-completed":
                  {
                    color: "secondary.main", 
                  },
                "& .MuiStepLabel-iconContainer .MuiStepIcon-root.Mui-active": {
                  color: "secondary.main", 
                },
              }}
            >
              Question {index + 1}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
