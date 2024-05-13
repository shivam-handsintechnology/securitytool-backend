const { ESLint } = require('eslint');

// ESLint configuration
const eslintOptions = {
    useEslintrc: false,
     // Use babel-eslint as the parser
    extensions: ['.js'], // Specify the file extensions to analyze (optional)
    overrideConfig: {
        plugins: ['security','security-node'], // Include the eslint-plugin-security plugin
        rules: {
            // Add rules provided by eslint-plugin-security
            // For example, 'detect-non-literal-require' rule to detect non-literal require() calls
            'security/detect-non-literal-require': 'error',
            // You can add more rules from eslint-plugin-security as needed
        }
    }
};

// Create ESLint instance
const eslint = new ESLint(eslintOptions);

// Function to test files
async function test() {
    try {
        // Fetch file contents
        let filesToTest = await fetch('http://localhost:5000/fileContent')
            .then(response => response.json())
            .then(data => data)
    
        filesToTest = filesToTest.data;

        // Loop through files
        for (const file of filesToTest) {
            try {
                // Lint file content
                if (file.extension === '.js') {
                    const results = await eslint.lintText(file.content);
                    if (results.length) {
                        console.log(`Linting errors in file ${file.name}:`);
                        for (const result of results) {
                          
                            if(result.messages && result.messages.length > 0){
                                console.log(result.messages)
                                console.log(result.messages.map(message => message.message).join('\n'));
                            }
                  
                        }
                    } else {
                        console.log(`No linting errors in file ${file.name}`);
                    }
                }
            } catch (error) {
                console.error(`Error in file ${file.name}: ${error.message}`);
            }
        }
    } catch (fetchError) {
        console.error(`Error fetching files: ${fetchError}`);
    }
}

// Run the test function
test();
