import "react-quill/dist/quill.snow.css";
import { Element, Node } from "domhandler";
import parse, {
  DOMNode,
  HTMLReactParserOptions,
  attributesToProps,
  domToReact,
} from "html-react-parser";
import React, { ReactNode, ElementType } from "react";
import "react-quill/dist/quill.core.css";
interface DescriptionContentProps {
  description: string;
}
const options: HTMLReactParserOptions = {
  replace: (node: DOMNode) => {
    if (node.type === "text") {
      // Preserve text nodes
      return node.data;
    }

    node = node as Element;
    if (!node.attribs) {
      return;
    }

    if (node.name === "ol" || node.name === "ul") {
      return React.createElement(
        node.name,
        {
          style: {
            listStyleType: node.name === "ol" ? "decimal" : "disc",
            marginLeft: "25px",
          },
        },
        domToReact(node.children as DOMNode[], options)
      );
    }

    if (node.name === "blockquote") {
      return React.createElement(
        node.name,
        {
          style: {
            borderLeft: "4px solid #0B1D51",
            paddingLeft: "10px",
          },
        },
        domToReact(node.children as DOMNode[], options)
      );
    }

    if (node.name === "code") {
      return React.createElement(
        node.name,
        {
          style: {
            backgroundColor: "#d1d1d1",
            padding: "2px 5px",
            borderRadius: "3px",
          },
        },
        domToReact(node.children as DOMNode[], options)
      );
    }

    if (node.name === "a") {
      return React.createElement(
        node.name,
        {
          style: { color: "blue", textDecoration: "underline" },
          href: node.attribs.href,
        },
        domToReact(node.children as DOMNode[], options)
      );
    }
    if (node.name === "pre") {
      return React.createElement(
        node.name,
        {
          style: {
            backgroundColor: "#23241f",
            color: "#f8f8f2",
            overflow: "auto",
            borderRadius: "5px",
            padding: "8px",
          },
        },
        domToReact(node.children as DOMNode[], options)
      );
    }
    if (node.name === "br") {
      return <br />;
    }
  },
};

export const DescriptionContent = ({
  description,
}: DescriptionContentProps) => {
  return <>{parse(description, options)}</>;
};
