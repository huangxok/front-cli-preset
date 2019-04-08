module.exports = (api, options, rootOptions) => {
  const utils = require("./utils")(api);
  api.render("../template");
  // 修改 `package.json` 里的字段
  api.extendPackage({
    dependencies: {
      axios: "^0.18.0",
      qs: "^6.5.2",
      vue: "^2.6.6",
      "vue-router": "^3.0.1",
      vuex: "^3.0.1",
      "normalize.css": "^8.0.1"
    }
  });

  if (options["ui-framework"] === "element-ui") {
    api.extendPackage({
      dependencies: {
        "element-ui": "^2.7.0"
      }
    });
    //require("./element.js")(api, options);
  }

  // 复制并用 ejs 渲染 `./template` 内所有的文件
  // api.render(files => {
  //   // console.log(files);
  //   Object.keys(files)
  //     .filter(path => path.startsWith("src/") || path.startsWith("public/"))
  //     .forEach(path => delete files[path]);
  // });

  api.onCreateComplete(() => {
    utils.deleteFile("./src/components/HelloWorld.vue");
  });
};
