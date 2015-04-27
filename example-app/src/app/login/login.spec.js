describe("example-app.login", function () {
    var test;

    beforeEach(module('example-app.login'));

    beforeEach(inject(function (_test_) {
        test = _test_;
    }));

    beforeEach(function () {
        //do some stuff
    });

    it('should equal 2', function () {
        expect(test).toBe(2);
    });

    describe("someService", function () {
        //tests for a service in this module
    });

    describe("someController", function () {
        // tests for a controller in this module
    });
});