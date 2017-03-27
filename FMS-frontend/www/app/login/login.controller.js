/* created IIFE function to avoid collison */
(function () {
    angular.module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope', '$ionicModal', '$state', '$ionicPopup','getDeviceInfo'];

    function loginController($scope, $ionicModal, state, $ionicPopup,getDeviceInfo) {

/*******************************************************************************************************************/
        var vm = this;
        vm.login = login;
        vm.adminLogin = adminLogin;
        vm.checked = true;
        vm.selectedLocationName="";
        vm.data = {};
		vm.locationNames = ["Global Axis B&C Block", "Global Axis D Block", "Global Axis H Block"];
		vm.rating = {
      'taste': 0,
      'service': 0,
      'hygine': 0,
      'veriety': 0,
      'quality': 0,
	  'water':0
    };
    vm.rating.max = 5;
        function login() {
            //console.log(this.username + "," + this.selectedLocationName + "," + this.selectedVehicleType);
            var empname = vm.empname;
			var empID = vm.empID;
            function OnInsertSucess() {
				console.log('inserted successfully');
			}


			  function onError(err,res) {
				  console.log(res);
				console.log('error');
			  }
            if (vm.rating.taste ===0 || vm.rating.service ===0 || vm.rating.hygine ===0||vm.rating.veriety===0||vm.rating.quality===0||vm.rating.water==0) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Warning',
                    template: 'Please give rating to all fields'
                });

                alertPopup.then(function (res) {
                    console.log('Thank you for submitting your respone in warning popup');
                });
            }
            else
			  {
				  console.log(vm.rating.comments);
				  var d = new Date();
				  var submitDate = d.toISOString();
				  var db = openDatabase('fms', '1.0', 'Test DB', 5 * 1024 * 1024);
				  console.log(db);
				  if(vm.rating.comments==undefined || vm.rating.comments ==""){
					  vm.rating.comments="No Comments";
				  }
				  db.transaction(function (tx) {

					tx.executeSql('INSERT INTO fms(empId,location,Punctuality,Ambiance,Behaviour,Skill,\
					Safety,water,comments,submitDate) \
					VALUES (?,?,?,?,?,?,?,?,?,?)',
					  [vm.empID,vm.selectedLocationName,
						vm.rating.taste, vm.rating.service,
						vm.rating.hygine, vm.rating.veriety,
						vm.rating.quality,vm.rating.water,
						vm.rating.comments, submitDate
					  ],
					  OnInsertSucess, onError);
				  });
				  var alertPopup = $ionicPopup.alert({
					title: 'Thanks For your feedback!',
					template: 'Press Ok to save your response'
				  });

				  alertPopup.then(function (res) {
					console.log('Thank you for not eating my delicious ice cream cone');
					// console.log($scope.rating.taste);
					localStorage.clear();
					//$state.go('login');
					vm.empname = "";
					vm.empID="";
					vm.rating.taste = 0;
					vm.rating.service =0;
					vm.rating.hygine =0;
					vm.rating.veriety =0;
					vm.rating.quality =0;
					vm.rating.water =0;
					vm.rating.comments="";
					vm.selectedLocationName="";
				  });
			}

        }
        function adminLogin() {
           // console.log(vm.adminUserName + "," + vm.adminPassword);
            if (vm.adminUserName === undefined || vm.adminPassword === undefined) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Warning',
                    template: 'Please fill all the field'
                });

                alertPopup.then(function (res) {
                    console.log('Thank you for submitting your respone in warning popup');
                });

            }
            else {
				var getOnlineStatusService = getDeviceInfo.deviceInfo();
				//alert(getOnlineStatusService.connectionStatus);
				if(vm.adminUserName == "FMS" && vm.adminPassword =="Tcs@1234")
                state.go('admin');
			    else
				{
					var alertPopup = $ionicPopup.alert({
                    title: 'Alert',
                    template: 'Please check your credentials'
                });

                alertPopup.then(function (res) {
                    console.log('Thank you for submitting your respone in warning popup');
                });
				}
            }
        }

        $ionicModal.fromTemplateUrl('app/login/adminlogin.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function () {
            //alert('hello');
            $scope.modal.show();
        };

        $scope.closeModal = function () {
            $scope.modal.hide();
        };

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });

        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });

    }
})();
