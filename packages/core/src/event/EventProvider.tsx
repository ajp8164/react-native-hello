import React, { type ReactNode } from 'react';

import EventEmitter from 'eventemitter3';

const event = new EventEmitter();
export const EventContext = React.createContext<EventEmitter>(event);

export const EventProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  return (
    <EventContext.Provider value={event}>{children}</EventContext.Provider>
  );
};
