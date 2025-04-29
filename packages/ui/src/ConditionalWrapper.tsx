import type { JSX } from "react";

export interface ConditionalWrapperProps {
  condition: boolean;
  wrapper: (children: JSX.Element) => JSX.Element;
  children: JSX.Element;
}

// See https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2
const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) => (condition ? wrapper(children) : children);

export { ConditionalWrapper };
