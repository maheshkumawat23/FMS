app.service('getDeviceInfo',["$window",function($window){

	this.deviceInfo = function(){
			var deviceInfo = {};
			deviceInfo.connectionStatus = $window.navigator.onLine;
			return deviceInfo;
			
	}

}])