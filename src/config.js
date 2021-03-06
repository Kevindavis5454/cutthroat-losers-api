require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL ||
        "http://localhost:3000/api",
    DATABASE_URL: process.env.DATABASE_URL || "postgresql://user:pass@localhost/whatever",
    TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || "postgresql://user:pass@localhost/whatever-test",

}