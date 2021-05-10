<template>
	<view>
		<view>
			樣式的學習
		</view>
		<view class="box1">
			測試文字
			<text>aaasssssssssssssssssa</text>
		</view>
		<view class="iconfont icon-tupian">
			
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import url("./a.css");
	
	.box1 {
		width:375rpx;
		height: 375rpx;
		background-color: $uni-color-primary;
		font-size: 30rpx;
		text{
			color: blue;
		}
	}
</style>
