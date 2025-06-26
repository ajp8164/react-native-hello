import type { SVGImages } from './image';

export type HelloConfig = {
  buildEnvironment?: string;
  sentryEndpoint?: string;
  sentryLoggingEnabled?: boolean;
  svgImages?: SVGImages;
  theme?: object;
  userId?: string;
};
