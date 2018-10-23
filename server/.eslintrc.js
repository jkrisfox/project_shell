module.exports = {
    "plugins": ["prettier"],
    "rules": {
        "prettier/prettier": "error"
    },
    "env": {
        "jest": true
    },
    "extends": ["eslint:recommended", "airbnb-base", "prettier"]
};