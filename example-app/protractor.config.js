exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        'src/app/root.e2e',
        'src/app/login/login.e2e'
    ]
}