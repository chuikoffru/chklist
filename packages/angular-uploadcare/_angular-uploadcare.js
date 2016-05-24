// Write your package code here!

/* @ngInject */
export default function UploadCare() {
 
    var directive = {
    	restrict: 'A',
        require: 'ngModel',
        scope: {
            onWidgetReady: '&',
	        onUploadComplete: '&',
	        onChange: '&',
	        ngModel: '='
        },
        controller: ($scope, $element, $attrs) => {

        }
        
    };
    return directive;
}

// Variables exported by this module can be imported by other packages and
// applications. See angular-uploadcare-tests.js for an example of importing.
export const name = 'angular-uploadcare';
