import { Step, StepLabel, Stepper } from "@material-ui/core";
import useStyles from "../utils/styles";

const CheckoutWizard = ({ activeStep = 0 }) => {
  const classes = useStyles();
  return (
    <Stepper
      dir="ltr"
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
  );
};

export default CheckoutWizard;
