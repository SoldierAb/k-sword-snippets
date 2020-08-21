const vscode = require("vscode");
const swordConfig = require("./config");
/**
 * @description
 * @param {*} document
 * @param {*} position
 * @param {*} token
 * @param {*} context
 */
function provideCompletionItems(document, position, token, context) {
  const line = document.lineAt(position);
  // 只截取到光标位置为止，防止一些特殊情况
  const lineText = line.text.substring(0, position.character);
  let res = [];

  Object.keys(swordConfig).forEach((key) => {
    const reg = new RegExp(`${key}\.$`, "g");
    if (reg.test(lineText)) {
      res = swordConfig[key].map((comp) => {
        return new vscode.CompletionItem(comp, vscode.CompletionItemKind.Field);
      });
    }
  });

  return res;
}

/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * @param {*} item
 * @param {*} token
 */
function resolveCompletionItem(item, token) {
  return null;
}

module.exports = function (context) {
  // 注册代码建议提示，只有当按下“.”时才触发
  context.subscriptions.push(
    ...[
      vscode.languages.registerCompletionItemProvider(
        "javascript",
        {
          provideCompletionItems,
          resolveCompletionItem,
        },
        "."
      ),
      vscode.languages.registerCompletionItemProvider(
        "jsx",
        {
          provideCompletionItems,
          resolveCompletionItem,
        },
        "."
      ),
      vscode.languages.registerCompletionItemProvider(
        "tsx",
        {
          provideCompletionItems,
          resolveCompletionItem,
        },
        "."
      ),
      vscode.languages.registerCompletionItemProvider(
        "vue",
        {
          provideCompletionItems,
          resolveCompletionItem,
        },
        "."
      ),
      vscode.languages.registerCompletionItemProvider(
        "typescript",
        {
          provideCompletionItems,
          resolveCompletionItem,
        },
        "."
      )
    ]
  );
};




