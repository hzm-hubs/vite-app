module.exports = {
	// 'prettier','plugin:prettier/recommended' 二选一即可，都可以启用 prettier/prettier
	extends: ["plugin:vue/recommended", "plugin:prettier/recommended"],
	rules: {
		"prettier/prettier": "error",
		"vue/no-multiple-template-root": "off",
	},
};
