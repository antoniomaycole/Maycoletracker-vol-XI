
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { ToastProvider } from './components/ui/ToastProvider';
  import VoiceCommandListener from './components/VoiceCommandListener';

  createRoot(document.getElementById("root")!).render(
    <ToastProvider>
      <App />
      {/* Global voice command listener (user-controlled) */}
      {/* Mount after App so it can use the toast system */}
      <VoiceCommandListener />
    </ToastProvider>
  );
  