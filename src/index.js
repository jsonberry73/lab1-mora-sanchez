const app = require('./app');
const connectDB = require('./db/connection');

async function main() {
    await connectDB();

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    console.log(`Server is running on port ${PORT}`);
}

main();