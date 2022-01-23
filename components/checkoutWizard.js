import { Step, StepLabel, Stepper } from "@mui/material";
import useStyles from "../utils/styles";
import RTL from "./RTL";

const CheckoutWizard = ({ activeStep = 0 }) => {
  const classes = useStyles();
  return (
    <RTL>
      <Stepper
        className={classes.transparentBackgroud}
        activeStep={activeStep}
        alternativeLabel
      >
        {["ورود به سایت", "ثبت آدرس", "روش پرداخت", "ثبت سفارش"].map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </RTL>
  );
};

export default CheckoutWizard;
