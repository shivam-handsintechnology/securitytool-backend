// snapshotResolver.js
const path = require('path');

module.exports = {
    resolveSnapshotPath: (testPath, snapshotExtension) => {
        // Custom logic to resolve snapshot path
        const snapshotFileName = path.basename(testPath) + snapshotExtension;
        return path.join('__snapshots__', snapshotFileName);
    },
    resolveTestPath: (snapshotFilePath, snapshotExtension) => {
        // Custom logic to resolve test path from snapshot path
        const testFileName = path.basename(snapshotFilePath, snapshotExtension);
        return path.join('some', 'example', testFileName);
    },
};
