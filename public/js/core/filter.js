/**
 * New node file
 */

SAPP.filter('isEmptyFilter', function(){
	return function(value){
		if(angular.isUndefined(value))
		{
			return "中国";
		}
		return value;
	};
});