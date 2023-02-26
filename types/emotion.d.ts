import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    mode: string;
    color: string;
    subColor: string;
    reverseColor: string;
    backgroundColor: string;
    subBackgroundColor: string;
    reverseBackgroundColor: string;
    borderColor: string;
    primaryColor: string;
    error: string;
  }
}
