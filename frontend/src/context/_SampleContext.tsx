import { createContext } from "react";
import _SampleService from "../services/_SampleService";

export interface _ISampleContext {
  example: (body: object) => Promise<void>;
}

export const _SampleContext = createContext<_ISampleContext>({} as _ISampleContext);

export function _SampleProvider({ children }: { children: React.ReactNode }) {
  async function example(body: object) {
    const response = await _SampleService.example(body);
    console.log(response);
  }

  return <_SampleContext.Provider value={{
    example
  }}>
    { children }
  </_SampleContext.Provider>
}