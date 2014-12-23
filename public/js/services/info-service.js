/**
 * New node file
 */
SAPP.service('info-service', ['httpService', function(httpService){
	var service = {
		save: function(scope, data){
			httpService.post(scope,'/add', data).then(function(rs) {
				var infos = service.getInfos();
				infos.push(data);
				service.setInfos(infos);
				scope.$broadcast('saveInfo', rs);
			},function(data){
				alert('error');
			});
		},
		
		load: function(scope, conditions){
			httpService.get(scope,'/load', conditions).then(function(rs) {
				if(angular.isUndefined(rs) || !rs.length)
				{
					alert('没有数据！');
					return;
				}
				var arrays = [];
				angular.forEach(rs, function(value, key){
					var tmp = angular.fromJson(value);
					if (typeof tmp === 'string')
					{
						tmp = angular.fromJson(tmp);
					}
					arrays.push(tmp);
				});
				
				service.setInfos(arrays);
				scope.$broadcast('loadInfo', arrays);
			},function(data){
				alert('error');
			});
		},
		
		update: function(scope, info){
			httpService.post(scope,'/update', info).then(function(rs){
				if(!rs)
					return;
				var infos = service.getInfos();
				var index = 0;
				for (var i = 0; i < infos.length; i++)
				{
					if (infos[i].id == info.id)
					{
						index = i;
						break;
					}
				}
				infos[index] = info;
				scope.$broadcast('loadInfo', infos);
				scope.$broadcast('saveInfo', rs);
			});
		},
		
		remove: function(scope, info, id){
			httpService.get(scope,'/remove?id='+id).then(function(rs){
				if(!rs)
					return;
				var infos = service.getInfos();
				var index = 0;
				for (var i = 0; i < infos.length; i++)
				{
					//console.log('id: '+infos[i].id);
					if (infos[i].id == id)
					{
						index = i;
						break;
					}
				}
				infos.splice(index, 1);
				scope.$broadcast('loadInfo', infos);
			});
		},
		
		setInfos: function(rs){
			this.info = rs;
		},
		
		getInfos: function(){
			if(!this.info)
			{
				return[];
			}
			return this.info;
		}
	};
	return service;
}]);