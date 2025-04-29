import { useEffect } from 'react';

export interface AutoSubmitFormProps {
  submitWhen: () => boolean;
  handleSubmit: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watchValue: any;
}

/**
 * Will dismiss the keyboard when a watched value changes and the result of submitWhen() is true.
 */
const AutoSubmitForm = ({ handleSubmit, submitWhen, watchValue }: AutoSubmitFormProps) => {
  useEffect(() => {
    if (submitWhen()) {
      handleSubmit();
    }
  }, [watchValue]);

  return null;
};

export default AutoSubmitForm;
