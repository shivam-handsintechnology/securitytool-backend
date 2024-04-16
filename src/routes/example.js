const fileContent = `
router.get('/', verifytoken, InjectionController.getAllLogs)
router.route("/:ip",verifytoken).delete(InjectionController.deleteLogs).get(InjectionController.getLogs)
router.get('/count',verifytoken, InjectionController.getLogsCount);
`;

const regex = /\.(get|post|put|delete|patch|head|options|trace)\(/g;
let methods = [];
let match;

while ((match = regex.exec(fileContent)) !== null) {
  methods.push(match[1]);
}

console.log(methods);
