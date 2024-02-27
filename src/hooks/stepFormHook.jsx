import { useState } from "react";

export function stepFormHook(steps) {
    const [currentStep, setCurrentStep] = useState(0);

    function changeStep(index,event){
        if(event) event.preventDefault();

        if(index < 0 || index >= steps.length) return;

        setCurrentStep(index);
    };

    return {
        currentStep,
        currentComponent: steps[currentStep],
        changeStep,
        isFirstStep: currentStep === 0 ? true : false,
        isLastStep: currentStep + 1 === steps.length ? true : false,
    };
}