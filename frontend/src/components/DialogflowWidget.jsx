// src/components/DialogflowWidget.jsx

import { useEffect } from 'react';

const DialogflowWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="Saarthi"
      agent-id="481d94c0-8be5-41e8-8229-4af18f1bb002"
      language-code="en"
    ></df-messenger>
  );
};

export default DialogflowWidget;
