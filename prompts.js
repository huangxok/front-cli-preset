module.exports = [
  {
    name: "ui-framework",
    type: "list",
    message: "choose UI Framework",
    choices: [
      {
        name: "Element UI",
        value: "element-ui"
      },
      {
        name: "none",
        value: "none"
      }
    ],
    default: "element-ui"
  }
];
