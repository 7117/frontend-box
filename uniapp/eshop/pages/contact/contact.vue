<template>
	<view class="contact">
		<image src="../../static/swiper/1.jpg"></image>
		<view class="info">
			<view @click="telNum">联系电话：400-400-400 [点击拨打] </view>
			<view>联系地址：啊啊啊啊啊啊啊啊啊啊啊啊 </view>
		</view>

		<map id="map" ref="map" class="map" :scale="scale" :longitude="longitude" :latitude="latitude" :markers="markers"></map>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 117.02496707,
				latitude: 36.68278473,
				scale: 11,
				markers: [{
					longitude: 117.02496707,
					latitude: 36.68278473,
					iconPath: '../../static/icon/cart-active.png',
					width: 30,
					height: 30,

				}]
			}
		},
		methods: {
			telNum(){
				uni.makePhoneCall({
					phoneNumber:'400-400-400'
				})
			}
		}
	}
</script>

<style lang="scss">
	.contact {
		image {
			width: 100%;
			height: 320rpx;
			mode: aspectFit;
		}

		.info {
			padding: 10rpx 20rpx;
			font-size: 30rpx;

			view {
				line-height: 70rpx;
				border: 1px solid #eee;
			}
		}
	}

	.map {
		width: 750rpx;
		height: 750rpx;
	}
</style>
