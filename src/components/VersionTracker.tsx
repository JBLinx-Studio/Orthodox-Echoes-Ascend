
import { useEffect, useState } from 'react';

export function VersionTracker() {
  const [buildTime, setBuildTime] = useState<string>('');
  const [deployTime, setDeployTime] = useState<string>('');

  useEffect(() => {
    // Get build time from Vite define
    if (typeof __BUILD_TIME__ !== 'undefined') {
      setBuildTime(__BUILD_TIME__);
    }

    // Get deploy timestamp from meta tag
    const deployMeta = document.querySelector('meta[name="deploy-timestamp"]');
    if (deployMeta) {
      setDeployTime(deployMeta.getAttribute('content') || '');
    }

    // Log version info for debugging
    console.log('Orthodox Echoes - Version Info:', {
      buildTime: buildTime || 'Unknown',
      deployTime: deployTime || 'Unknown',
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    });
  }, [buildTime, deployTime]);

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white text-xs p-2 rounded font-mono">
      <div>Build: {buildTime ? new Date(buildTime).toLocaleString() : 'Unknown'}</div>
      {deployTime && <div>Deploy: {deployTime}</div>}
    </div>
  );
}

// Declare the global variable for TypeScript
declare const __BUILD_TIME__: string;
