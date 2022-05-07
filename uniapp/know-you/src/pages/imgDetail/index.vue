<template>
	<view>
		<view class="user_info">
			<view class="user_icon">
				<image :src="imgDetail.user.avatar" mode="widthFix"></image>
			</view>
			<view class="user_desc">
				<view class="user_name">{{imgDetail.user.name}}</view>
				<view class="user_time">{{imgDetail.cnTime}}</view>
			</view>
		</view>

		<view class="high_img">
			<swiper-action @swiperAction="handleSwiperAction">
				<image mode="widthFix" :src="imgDetail.thumb"></image>
			</swiper-action>
		</view>

		<view class="user_rank">
			<view class="rank">
				<text class="iconfont icondianzan">{{imgDetail.rank}}</text>
			</view>
			<view class="user_collect">
				<text class="iconfont iconshoucang">收藏</text>
			</view>
		</view>

		<view class="album_wrap">
			<view class="album_title">

			</view>
			<view class="album_list">
				<view class="album_item" v-for="(item,index) in album" :key="index">
					<view class="album_cover">
						<image :src="item.cover" :mode="widthFix"></image>
					</view>

					<view class="album_info">
						<view class="album_info_text">专辑</view>
						<view class="album_name">{{item.name}}</view>
						<text class="iconfont iconiconfontjiantou4"></text>
					</view>
				</view>
			</view>
		</view>

		<view class="hot">
			<view class="comment_title">
				<text class="iconfont iconhot"></text>
				<text class="comment_text">最热评论</text>
			</view>
			<view class="comment_list">
				<view class="comment_item" v-for="item in hot" :key="item.id">
					<view class="comment_user">
						<view class="user_icon">
							<image :src="item.user.avatar"></image>
						</view>
						<view class="user_name">
							<view class="user_nickname">{{item.user.name}}</view>
							<view class="user_time">{{item.atime}}</view>
						</view>
						<view class="user_badge">
							<image v-for="(item2,index) in user.title" :key="index" :src="item2.icon" mode=""></image>
						</view>
					</view>
					<view class="comment_desc"></view>
				</view>
			</view>
		</view>

		<!-- 下载 -->
		<view class="download">
			<view class="download_btn" @click="handleDownload">下载图片</view>
		</view>

	</view>
</template>

<script>
	import moment from "moment";
	moment.locale("zh-cn")
	import swiperAction from "@/components/swiperAction"
	export default {
		components: {
			swiperAction
		},
		data() {
			return {
				imgDetail: {},
				newThumb: '',
				album: [],
				hot: [],
				comment: [],
				imgIndex: 0,
				imgList: [],
			}
		},
		onLoad() {
			const {
				imgList,
				imgIndex
			} = getApp().globalData

			this.imgIndex = imgIndex
			this.imgList = imgList

			this.getDate()

		},
		methods: {
			async handleDownload() {
				await uni.showLoading({
					title:"下载中"
				})
				
				const res = await uni.downloadFile({
					url: this.imgDetail.img
				})

				const tmpPath = res[1].tempFilePath
				
				const res2 = await uni.saveImageToPhotosAlbum({
					filePath: tmpPath
				})
				
				uni.hideLoading();
				
				await uni.showToast({
					title:"下载完成"
				})
				
			},
			getDate() {
				this.imgDetail = this.imgList[this.imgIndex]

				this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow()

				this.getComments(this.imgDetail.id)
			},
			handleSwiperAction(e) {
				if (e.direction === 'left' && this.imgIndex < this.imgList.length - 1) {
					this.imgIndex++;
					this.getDate();
				} else if (e.direction === 'right' && this.imgIndex > 0) {
					this.imgIndex--;
					this.getDate();
				} else {
					uni.showToast({
						title: "meile"
					})
				}
			},
			getComments(id) {
				this.request({
					url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
				}).then(res => {
					this.album = res.res.album
					this.hot = res.res.hot
					this.comment = res.res.comment
				}).catch(res => {
					console.log(res)
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user_info {
		display: flex;
		padding: 10rpx;

		.user_icon {
			padding: 0 20rpx;

			image {
				width: 88rpx;
				border-radius: 50%;
			}
		}
	}

	.user_desc {
		.user_name {
			color: #000;
			font-size: 600;
		}

		.user_time {
			color: #ccc;
			font-size: 24rpx;
			padding: 10rpx 0;
			;
		}
	}

	.user_rank {
		display: flex;
		height: 80rpx;
		border-bottom: 5rpx solid #ccc;

		.rank {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			.iconfont {}
		}

		.user_collect {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			.iconfont {}
		}
	}


	.album_wrap {
		padding: 20rpx;

		.album_title {
			padding: 10rpx 0;
		}

		.album_list {
			.album_item {
				display: flex;
				padding: 10rpx 0;
				border-bottom: 10rpx solid #eee;

				.album_cover {
					flex: 1;

					image {
						width: 180rpx;
						height: 180rpx;
					}
				}

				.album_info {
					flex: 3;
					padding-left: 20rpx;
					position: relative;

					.album_info_text {
						width: 100rpx;
						height: 50rpx;
						background-color: $color;
						color: #fff;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.album_name {
						padding: 10rpx 0;
						color: #888;
					}

					.iconfont {
						font-size: 40rpx;
						position: absolute;
						top: 50%;
						transform: translate(-50%);
						right: 10%;
						color: #000;
					}
				}
			}
		}
	}

	.hot {
		.comment_title {
			padding: 15rpx;

			.iconfont {
				color: red;
				font-size: 40rpx;
			}

			.comment_text {
				font-weight: 600;
				font-size: 28rpx;
				color: #666;
				margin-left: 10rpx;
			}
		}

		.comment_list {}
	}

	.download {
		height: 120rpx;
		display: flex;
		justify-content: center;

		.download_btn {
			width: 90%;
			height: 95%;
			background-color: $color;
			color: #fff;
			font-size: 50rpx;
			font-weight: 600;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
