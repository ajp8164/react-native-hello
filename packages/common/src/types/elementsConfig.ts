import type { SVGImages } from './image';

export type ElementsConfig = {
  buildEnvironment?: string;
  sentryEndpoint?: string;
  sentryLoggingEnabled?: boolean;
  svgImages?: SVGImages;
  userId?: string;
};
