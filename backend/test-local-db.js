const mongoose = require('mongoose');

const checkLocalDB = async () => {
    try {
        console.log('🔄 Connecting to Local MongoDB (localhost:27017)...');
        await mongoose.connect('mongodb://localhost:27017/mra_database', { family: 4 });
        console.log('✅ Successfully connected to Local MongoDB!');
        console.log('🚀 We can use this instead of Atlas to continue development.');
    } catch (error) {
        console.log('❌ Could not connect to Local MongoDB.');
        // console.log('Error:', error.message);
    } finally {
        await mongoose.connection.close();
    }
};

checkLocalDB();
