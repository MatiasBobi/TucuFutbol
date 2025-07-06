import { useEffect, useState } from 'react';

// Utilidades para debugging y rendimiento
export const debug = {
  // Log con timestamp
  log: (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`, data || '');
  },

  // Log de rendimiento
  performance: (name: string, fn: () => void) => {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`⏱️ ${name}: ${(end - start).toFixed(2)}ms`);
  },

  // Log de memoria
  memory: () => {
    // @ts-ignore - React Native performance memory
    if (global.performance && global.performance.memory) {
      // @ts-ignore - React Native performance memory
      const memory = global.performance.memory;
      console.log('🧠 Memoria:', {
        used: `${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        total: `${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
        limit: `${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
      });
    }
  },

  // Log de re-renders
  render: (componentName: string) => {
    console.log(
      `🔄 Re-render: ${componentName} - ${new Date().toLocaleTimeString()}`,
    );
  },
};

// Hook para debugging de re-renders
export const useRenderDebug = (componentName: string) => {
  useEffect(() => {
    debug.render(componentName);
  });
};

// Hook para medir tiempo de carga
export const useLoadTime = (dependencies: any[]) => {
  const [loadTime, setLoadTime] = useState<number>(0);

  useEffect(() => {
    const start = performance.now();

    return () => {
      const end = performance.now();
      setLoadTime(end - start);
      debug.log(`⏱️ Tiempo de carga: ${(end - start).toFixed(2)}ms`);
    };
  }, dependencies);

  return loadTime;
};
