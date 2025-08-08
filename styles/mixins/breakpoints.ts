import { css } from "@emotion/css";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export type BreakpointMap = {
  [key in Breakpoint]: number;
};

export const breakpointMap: BreakpointMap = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export type BreakpointHandler = (
  point: Breakpoint | number,
  style: any,
) => string;

export const getBreakpointValue = (point: Breakpoint | number): number => {
  if (typeof point === "number") return point;
  return breakpointMap[point] || breakpointMap.md;
};

export const lowerThan: BreakpointHandler = (point, style) => {
  return css`
    @media screen and (max-width: ${getBreakpointValue(point)}px) {
      ${style}
    }
  `;
};

export const lowerThanEqual: BreakpointHandler = (point, style) => {
  return css`
    @media screen and (max-width: ${getBreakpointValue(point) + 1}px) {
      ${style}
    }
  `;
};

export const greaterThan: BreakpointHandler = (point, style) => {
  return css`
    @media screen and (min-width: ${getBreakpointValue(point) + 1}px) {
      ${style}
    }
  `;
};

export const greaterThanEqual: BreakpointHandler = (point, style) => {
  return css`
    @media screen and (min-width: ${getBreakpointValue(point)}px) {
      ${style}
    }
  `;
};

export const between = (
  start: Breakpoint | number,
  end: Breakpoint | number,
  style: any,
) => {
  return css`
    @media screen and (min-width: ${getBreakpointValue(start) +
      1}px) and (max-width: ${getBreakpointValue(end)}) {
      ${style}
    }
  `;
};
