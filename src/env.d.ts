/// <reference types="astro/client" />

type Env = {
  RETRO_API_KEY: string;
};

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}

declare module '*.vs' {
  const value: string;
  export default value;
}

declare module '*.fs' {
  const value: string;
  export default value;
}

declare module '*.vert' {
  const value: string;
  export default value;
}

declare module '*.frag' {
  const value: string;
  export default value;
}

declare module '*.glsl' {
  const value: string;
  export default value;
}

declare module '*.wgsl' {
  const value: string;
  export default value;
}
