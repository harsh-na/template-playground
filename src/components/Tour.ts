import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";

/* ---------- STYLES ---------- */

const style = document.createElement("style");

style.textContent = `

.shepherd-button-secondary {
  background-color: #6c757d !important;
}

.shepherd-button {
  background-color: #050c40 !important; 
  color: white !important;
}

.tour-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
  padding-bottom: 4px;
}

.tour-title {
  font-weight: 600;
  font-size: 13px;
  color: #050c40;
}

.tour-progress {
  font-size: 12px;
  color: #777;
}

.tour-body {
  font-size: 14px;
  line-height: 1.5;
  margin-top: 6px;
}

`;

document.head.appendChild(style);


/* ---------- TOUR INIT ---------- */

const tour = new Shepherd.Tour({
  defaultStepOptions: {
    classes: "shepherd-theme-arrows",
    scrollTo: true,
  },
  useModalOverlay: true,
});


/* ---------- HELPERS ---------- */

function getProgress() {
  const step = tour.currentStep;
  if (!step) return "";

  const current = tour.steps.findIndex(s => s.id === step.id) + 1;
  const total = tour.steps.length;

  return `<span class="tour-progress">Step ${current}/${total}</span>`;
}


function stepLayout(title: string, body: string) {
  return `
    <div class="tour-header">
      <div class="tour-title">${title}</div>
      ${getProgress()}
    </div>

    <div class="tour-body">
      ${body}
    </div>
  `;
}


function getButtons(type: "first" | "middle" | "last" = "middle") {

  if (type === "first") {
    return [
      {
        text: "Skip",
        action: () => tour.cancel(),
        classes: "shepherd-button-secondary",
      },
      {
        text: "Next",
        action: () => tour.next(),
      },
    ];
  }

  if (type === "last") {
    return [
      {
        text: "Back",
        action: () => tour.back(),
        classes: "shepherd-button-secondary",
      },
      {
        text: "Finish Tour",
        action: () => tour.cancel(),
      },
    ];
  }

  return [
    {
      text: "Back",
      action: () => tour.back(),
      classes: "shepherd-button-secondary",
    },
    {
      text: "Skip",
      action: () => tour.cancel(),
      classes: "shepherd-button-secondary",
    },
    {
      text: "Next",
      action: () => tour.next(),
    },
  ];
}


function addStep(
  id: string,
  title: string,
  body: string,
  element?: string,
  position: any = "right",
  type: "first" | "middle" | "last" = "middle"
) {

  const step: any = {
    id,
    text: () => stepLayout(title, body),
    buttons: getButtons(type),
  };

  if (element) {
    step.attachTo = {
      element,
      on: position,
    };
  }

  tour.addStep(step);
}



/* ---------- STEPS ---------- */

addStep(
  "intro",
  "Template Playground Tour",
  "Welcome to the Template Playground. This short guide will help you explore the main tools and features.",
  undefined,
  undefined,
  "first"
);


addStep(
  "template-dropdown",
  "Template Selection",
  "Choose a template from this dropdown to edit and experiment with different configurations.",
  ".samples-element",
  "bottom"
);


addStep(
  "toggle-editor",
  "Editor Panel",
  "Toggle the editor panel on or off. It contains the Concerto Model, TemplateMark, and JSON Data editors.",
  ".tour-editor"
);


addStep(
  "toggle-preview",
  "Preview Window",
  "Show or hide the live preview to see the results of your template in real time.",
  ".tour-preview"
);


addStep(
  "toggle-problems",
  "Problems Panel",
  "View compilation errors and warnings here to help debug your template.",
  ".tour-problems"
);


addStep(
  "fullscreen-modal",
  "Fullscreen Preview",
  "Open the preview in fullscreen mode for better visibility.",
  ".tour-fullscreen"
);


addStep(
  "template-share",
  "Share Template",
  "Generate a shareable link for your templates and collaborate easily.",
  ".tour-share"
);


addStep(
  "start-tour-button",
  "Restart Tour",
  "Restart the guided tour anytime to review the Playground features.",
  ".tour-start-tour"
);


addStep(
  "editor-settings",
  "Editor Settings",
  "Customize editor settings and configure your editing experience.",
  ".tour-settings"
);


addStep(
  "ai-assistant",
  "AI Assistant",
  "Use the AI assistant to get help creating and editing templates.",
  ".tour-ai-assistant",
  "left"
);


addStep(
  "concerto-model",
  "Concerto Model",
  "Define the data model including concepts, types, and relationships.",
  ".tour-concerto-model",
  "top"
);


addStep(
  "template-mark",
  "TemplateMark Editor",
  "Write your natural language template with variables and logic.",
  ".tour-template-mark",
  "top"
);


addStep(
  "json-data",
  "JSON Data",
  "Provide sample data matching your Concerto model to test templates.",
  ".tour-json-data",
  "top"
);


addStep(
  "preview-panel",
  "Live Preview",
  "View the rendered output of your template.",
  ".tour-preview-panel",
  "top"
);


addStep(
  "learn-button",
  "Learning Pathway",
  "Access documentation and tutorials to learn how to create templates effectively.",
  ".learnNow-button",
  "bottom",
  "last"
);


export default tour;