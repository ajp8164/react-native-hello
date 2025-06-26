import { useEffect } from 'react';

interface AutoSubmitForm {
  submitWhen: () => boolean;
  handleSubmit: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watchValue: any;
}

/**
 * Will dismiss the keyboard when a watched value changes and the result of submitWhen() is true.
 */
const AutoSubmitForm = ({
  handleSubmit,
  submitWhen,
  watchValue,
}: AutoSubmitForm) => {
  useEffect(() => {
    if (submitWhen()) {
      handleSubmit();
    }
  }, [watchValue]);

  return null;
};

export { AutoSubmitForm };
