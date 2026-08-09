declare module '*.svg' {
    const content: string;
    export default content;
  }
  
  declare module '*.svg?react' {
    import React = require('react');
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
  }
  
  declare module "*.png" {
    const content: string;
    export default content;
  }
  