
export const DOORON = 'DOORON';  
export const DOOROFF = 'DOOROFF';

export const dooron = (index) => ({
  type : DOORON,
  index
});

export const dooroff = (index) => ({
  type : DOOROFF,
  index
});