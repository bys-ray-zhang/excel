/**
 * New node file
 */
SAPP.controller('infoController', ['$scope', 'info-service', function(scope, infoService) {
	
	scope.query = {};
	
	scope.add = function(){
		$('#infoModal').modal('toggle');
		scope.$broadcast('addInfo');
	};
	
	scope.update = function(id)
	{
		$('#infoModal').modal('toggle');
		scope.$broadcast('editInfo', id);
	};
	
	scope.remove = function(id)
	{
		if(confirm("确定要删除数据吗？"))
		{
			var infos = infoService.getInfos();
			infoService.remove(scope, null, id);			
		}
	};
	
	scope.query = function()
	{
		var qObj = scope.query;
		var hasCondition = false;
		var arrays = infoService.getInfos();
		if (qObj.company)//query company
		{
			arrays = queryCompany(qObj.company, arrays);
			hasCondition = true;
		}
		
		if (qObj.province)
		{
			arrays = queryCompany(qObj.province, arrays);
			hasCondition = true;
		}
		
		if (qObj.phone)
		{
			arrays = queryCompany(qObj.phone, arrays);
			hasCondition = true;
		}
		
		if (qObj.quantity)
		{
			arrays = queryQuantity(qObj.quantity, arrays);
			hasCondition = true;
		}
		
		if (!hasCondition)
		{
			scope.tableItems = infoService.getInfos();
		}
		else
		{
			scope.tableItems = arrays;
		}
	};
	
	var query = function(name, condition, arrays)
	{
		var tmpArrays = [];
		angular.forEach(arrays, function(value, key){
			if (value[name].indexOf(condition) >= 0)
			{
				tmpArrays.push(value);
			}
		});
		
		return tmpArrays;
	}
	
	var queryCompany = function(value, arrays)
	{
		return query('company', value, arrays);
	};
	
	var queryProvince = function(value, arrays)
	{
		return query('province', value, arrays);
	};
	
	var queryPhone = function(value, arrays)
	{
		return query('phone', value, arrays);
	};
	
	var qQuantity = function(name, arrays){
		var tmpArrays = [];
		angular.forEach(arrays, function(value, key){
			if (!angular.isUndefined(value[name]))
			{
				tmpArrays.push(value);
			}
		});
		
		return tmpArrays;
	};
	
	var queryQuantity = function(value, arrays)
	{
		if (value == 1)
		{
			arrays = qQuantity('moreSixty', arrays);
		}
		else if (value == 2)
		{
			arrays = qQuantity('sixty', arrays);
		}
		else if (value == 3)
		{
			arrays = qQuantity('fiftyFive', arrays);
		}
		else if (value == 4)
		{
			arrays = qQuantity('fifty', arrays);
		}
		else if (value == 5)
		{
			arrays = qQuantity('lessFifty', arrays);
		}
		return arrays;
	};
	
	(function load(){
		scope.$on('loadInfo', function(event, datas){
			if (angular.isUndefined(datas))
			{
				scope.tableItems = [];
			}
			scope.tableItems = datas;
		});
		infoService.load(scope);
	})();
	
}]);

SAPP.controller('infoModelController', ['$scope', 'info-service', function(scope, infoService){
	
	var info = scope.info = {};
	scope.$on('saveInfo', function(event, rs){
		if(rs)
		{
			alert('保存成功！');
		}
		else
		{
			alert('保存失败！');
		}
		info = scope.info = {};
		scope.$emit("loadInfo", infoService.getInfos());
	});
	scope.$on('editInfo', function(event, id){
		var infos = infoService.getInfos();
		for (var i = 0; i < infos.length; i++)
		{
			if (infos[i].id == id)
			{
				info = scope.info = infos[i];
				break;
			}
		}
	});
	
	scope.$on('addInfo', function(event){
		info = scope.info = {};
	});
	
	scope.save = function(){
		if (angular.isUndefined(info.company))
		{
			alert('公司名称不能为空！');
			return;
		}
		if (angular.isUndefined(info.province))
		{
			alert('所在省市不能为空！');
			return;
		}
		/*
		if (angular.isUndefined(info.phone))
		{
			alert('电话不能为空！');
			return;
		}
		if (angular.isUndefined(info.email))
		{
			alert('邮件不能为空！');
			return;
		}*/
		if (!info.id)//new
		{debugger;
			var timestamp = Date.parse(new Date());
			info.id = timestamp;
			infoService.save(scope, info);
		}
		else//update
		{
			infoService.update(scope, info);
		}
		
	};
	
	
}]);