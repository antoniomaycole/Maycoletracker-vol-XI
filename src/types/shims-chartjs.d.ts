declare module 'react-chartjs-2' {
  import type { ChartType, ChartOptions } from 'chart.js';
  import type { ComponentType } from 'react';
  export const Bar: ComponentType<any>;
  export default {} as any;
}

declare module 'chart.js' {
  export * from 'any';
  const Chart: any;
  export default Chart;
}
