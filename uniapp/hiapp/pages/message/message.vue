<template>
	<view>
		<view>message</view>
		<view>
			<button type="primary" @click="chooseImg">上傳圖片</button>
			<image v-for="item in imgArr" :src="item" @click="previewImg(item)">
			</image>
		</view>
		
		<button @click="goDirect">跳轉按鈕</button>
		<button @click="goTab">跳轉按鈕TABBAR</button>
		<button @click="goRedict">跳轉按鈕Redict</button>
		
		

		<!-- #ifdef H5 -->
		<view>H5</view>
		<!-- #endif -->

		<!-- #ifdef MP-WEIXIN -->
		<view>weixin</view>
		<!-- #endif -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgArr: []
			}
		},
		onLoad() {
			// #ifdef H5
			console.log("H5打印")
			// #endif
		},
		methods: {
			chooseImg() {
				const that = this;
				uni.chooseImage({
					count: 5,
					success(res) {
						that.imgArr = res.tempFilePaths
						console.log(that.imgArr)
					},
					fail() {
						console.log("fail")
					}
				})
			},
			previewImg(item) {
				console.log(item)
				uni.previewImage({
					current: item,
					urls: this.imgArr,
					indicator: 'default',
					loop: true
				})
			},
			goDirect(){
				uni.navigateTo({
					url:'/pages/home/home'
				})
			},
			goTab(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			goRedict(){
				uni.redirectTo({
					url:'/pages/home/home'
				})
					
			}
		}
	}
</script>

<style>
	/* #ifdef H5 */
	view {
		color: pink;
	}
	/* #endif */
	
</style>
