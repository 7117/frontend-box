<template>
	<view class="video_play">

		<image :src="videoObj.img"></image>

		<view class="video_tool">
			<view @click="handleMuted" :class="['iconfont',muted?'iconjingyin':'iconshengyin']"></view>
			<view class="iconfont iconzhuanfa">
				<button type="default" open-type="share"></button>
			</view>
		</view>

		<view class="video_wrap">
			<video :muted="muted" :src="videoObj.video" objectFit="fill"></video>
		</view>

		<view class="download">
			<view @click="handleDownload" class="download_btn">下载视频</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				videoObj: {},
				muted: false,
			}
		},
		methods: {
			handleMuted() {
				this.muted = !this.muted
			},
			async handleDownload() {

				await uni.showLoading({
					title: "下载中"
				});
				// 1 将远程文件 下载到小程序内存中
				const {
					tempFilePath
				} = (await uni.downloadFile({
					url: this.videoObj.video
				}))[1];
				// 2 将内存中的文件 下载到本地上
				await uni.saveVideoToPhotosAlbum({
					filePath: tempFilePath
				});
				uni.hideLoading();
				await uni.showToast({
					title: "下载成功"
				})
			}
		},
		onLoad() {
			this.videoObj = getApp().globalData.video
		}
	}
</script>

<style lang="scss" scoped>
	.video_play {
		position: relative;

		image {
			position: absolute;
			width: 100vm;
			height: 100vh;
			z-index: -1;
			filter: blur(20rpx);
		}

		.video_tool {
			height: 80rpx;
			display: flex;
			justify-content: flex-end;
			margin-top: 10rpx;

			.iconfont {
				width: 80rpx;
				color: #fff;
				font-size: 50rpx;
				border-radius: 40rpx;
				background-color: rgba(0, 0, 0, 2);
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 20rpx;
			}

			.iconzhuanfa {
				position: relative;

				button {
					position: absolute;
					width: 100%;
					height: 100%;
					opacity: 0;
				}
			}
		}

		.video_wrap {
			margin-top: 20rpx;
			display: flex;
			justify-content: center;

			video {
				width: 360rpx;
				height: 600rpx;
			}


		}

		.download {
			display: flex;
			justify-content: center;
			margin-top: 30rpx;

			.download_btn {
				width: 360rpx;
				height: 40rpx;
				border-radius: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				border: 5rpx solid #fff;
				padding: 30rpx 0;
				background-color: rgba(0, 0, 0, 0.6);
			}
		}
	}
</style>
