import { css } from "@emotion/css";

export const noScrollbar = css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::webkit-scrollbar {
    display: none;
  }
`;
