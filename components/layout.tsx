import { html } from "hono/html";
import { css } from "@emotion/css";
import { extractCritical } from "@emotion/server";
import { FetchAndAppend } from "./fetch-and-append.js";
import { prefersColorScheme } from "@/styles/mixins/prefers-color-scheme.js";

export const Layout = ({ children }: { children?: any }) => {
  const bodyStyles = css`
    font-family: Arial, sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;

    text-rendering: optimizeLegibility;

    background-color: #fff;
    color: #000;

    * {
      box-sizing: border-box;
    }

    ${prefersColorScheme("dark")} {
      background-color: #000;
      color: #fff;
    }
  `;

  const critical = extractCritical(
    html` <body class="${bodyStyles}">
      ${children}
    </body>` as string,
  );

  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          ${critical.css}
        </style>
        ${FetchAndAppend()}
      </head>
      <body class="${bodyStyles}">
        ${children}
      </body>
    </html>
  `;
};
