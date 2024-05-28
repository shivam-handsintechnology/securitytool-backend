module.exports = async () => {
    // Delete All Videos after 2AM
    const fs = require('fs');
    const path = require('path');
    const dir = path.join(__dirname, '../../videos');
    try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            // delete old videos lestt then half and hour hours
            if (fs.statSync(filePath).ctime < new Date(Date.now() - 30 * 60 * 1000)) {
                fs.unlinkSync(filePath);
            } else {
                console.log("No Video Found")
            }
        }
        );
    } catch (error) {
        console.log(error);
    }
}