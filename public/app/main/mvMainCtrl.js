blueStemApp.controller('mvMainCtrl', function($scope, expanseManager) {
    $scope.courses = [
        {name: 'Circular Reasoning', featured: true, published: new Date('1/1/2001')},
        {name: 'Ad Hominem', featured: false, published: new Date('4/1/2001')},
        {name: 'Argumentum ad Populum', featured: false, published: new Date('1/5/2001')},
        {name: 'Equivocation', featured: true, published: new Date('1/8/2001')},
        {name: 'Begging the Question', featured: true, published: new Date('1/8/2008')},
        {name: 'Post Hoc/Proctor Hoc', featured: true, published: new Date('1/9/1822')},
        {name: 'False Dilemma', featured: false, published: new Date('1/8/2001')},
        {name: 'Kettle Logic', featured: true, published: new Date('1/8/2001')},
        {name: 'Moralistic Fallacy', featured: false, published: new Date('6/8/2001')},
        {name: 'Homonculus Fallacy', featured: true, published: new Date('1/8/2001')},
        {name: 'If-by-whiskey', featured: false, published: new Date('3/21/2013')},
        {name: 'Nirvana', featured: true, published: new Date('3/8/2011')}
    ];
    expanseManager.loadAllExpanses().then(function (expanses) {
        $scope.expanses = expanses;
    });

});