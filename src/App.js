// react-emotion-multi-step-form@0.10.0
import "./app.css";

import React, { useRef } from "react";
import {
  useInputs,
  Captions,
  FormBody,
  ComboboxMulti,
  RadioControl,
  RadioOption,
  Input,
  withFormContextAndTheme,
} from "react-emotion-multi-step-form";
import Reward from 'react-rewards';

// Import SVG icons as React components using SVGR (built-in with create-react-app)
import { ReactComponent as LinkIcon } from "./assets/link.svg";
import { ReactComponent as TreeIcon } from "./assets/tree.svg";
import { ReactComponent as PriceTagsIcon } from "./assets/price-tags.svg";
import options from "./data";

const App = () => {
  const { error, isSubmitPage } = useInputs();
  const rewardRef = useRef();

  const handleSubmit = data => {
    console.log(data);
    rewardRef.current.rewardMe();
  };

  return (
    <div>
      <h1>
        Newsletter Subscription
      </h1>
      <Captions callToActionText="Get the latest news straight to your inbox!" />
      {isSubmitPage ? (<Reward ref={rewardRef} type="confetti"></Reward>) : null}
      <FormBody initialFocus={false} submitText="Subscribe" submitWidth={130} onSubmit={handleSubmit}>
        <ComboboxMulti
          name="interests"
          caption="What are your interests?"
          icon={PriceTagsIcon}
          height={240}
          validationRules={{ required: 'Please select a Topic' }}
          options={options}
        />
        <RadioControl
          name="frequency"
          caption="How often do you want to receive our newsletter?"
          icon={TreeIcon}
          validationRules={{ required: 'Please select a frequency' }}
        >
          <RadioOption value="daily" />
          <RadioOption value="weekly" />
          <RadioOption value="monthly" />
        </RadioControl>
        <Input 
          name="email"
          type="email"
          caption="What's your email address?"
          icon={LinkIcon}
          validationRules={{ required: 'Please fill in your email address' }}
        />
      </FormBody>
      <div className="error-message">{error.message}</div>
    </div>
  );
}

// Wrap component with React Context.Provider and Emotion ThemeProvider
export default withFormContextAndTheme(App);