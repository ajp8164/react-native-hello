import type { JSX } from 'react';

interface ConditionalWrapper {
  condition: boolean;
  wrapper: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
}

// See https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2
const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapper) => (condition ? wrapper(children) : children);

export { ConditionalWrapper };
