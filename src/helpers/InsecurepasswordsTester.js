

async function findPasswordDocuments() {
    const mongoose = require("mongoose");
  const models = mongoose.connection.models;
  for (const modelName of Object.keys(models)) {
    const model = models[modelName];
    const schema = model.schema;
    const hasPassword = schema.paths.hasOwnProperty('password');
    if (hasPassword) {
      const ModelClass = mongoose.model(modelName);
      try {
        const doc = await ModelClass.findOne({ password: { $ne: null } }, 'password');
        if (doc) {
        let  document= doc.toObject()
          let password=document["password"]
          return password
        } else {
          console.log(`No documents found with non-null password in ${modelName}`);
        }
      } catch (err) {
        console.error(`Error retrieving document from ${modelName}:`, err);
      }
    }
  }
}

async function findPasswordTable() {
  try {
    // Get a list of all tables in the database
    const showTablesQuery = 'SHOW TABLES';
    connection.query(showTablesQuery, async (err, tables) => {
      if (err) throw err;

      // Check each table for the presence of a 'password' column
      for (const table of tables) {
        const tableName = table['Tables_in_database'];
        const describeTableQuery = `DESCRIBE ${tableName}`;

        connection.query(describeTableQuery, (err, columns) => {
          if (err) throw err;

          // Check if any column in the table is named 'password'
          const passwordColumn = columns.find(column => column.Field === 'password');
          if (passwordColumn) {
            console.log(`Table "${tableName}" contains a 'password' column.`);

            // If you want to fetch a document with a non-null password, you can do it here
            const fetchPasswordDocQuery = `SELECT password FROM ${tableName} WHERE password IS NOT NULL LIMIT 1`;
            connection.query(fetchPasswordDocQuery, (err, results) => {
              if (err) throw err;

              if (results.length > 0) {
                console.log({ passwordField: results[0].password });
              } else {
                console.log(`No documents found with non-null password in ${tableName}`);
              }
            });
          }
        });
      }
    });
  } catch (err) {
    console.error('Error:', err);
  }
}
module.exports={findPasswordTable,findPasswordDocuments}