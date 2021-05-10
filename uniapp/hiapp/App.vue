<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show~~')
		},
		onHide: function() {
			console.log('App Hide')
		},
		onError:function(err){
			console.log(err)
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./static/fonts/iconfont.css");
	
	.gomeImgLoad{
		width: 750rpx !important;
		height: auto;
	}
</style>
