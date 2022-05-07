<template>
	<scroll-view scroll-y @scrolltolower="handleToLower" class="album_scroll_view">
		<view class="album_swiper">
			<swiper autoplay indicator-dots="true" circular="true">
				<swiper-item v-for="item in banner" :key="item.id">
					<image :src="item.thumb"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="album_list">
			<navigator class="album_item" v-for="item in album" :key="item.id" :url="`/pages/album/index?id=${item.id}`">
				<view class="album_img">
					<image :src="item.cover" mode="aspectFill"></image>
				</view>
				<view class="album_info">
					<view class="album_name">
						{{item.name}}
					</view>
					<view class="album_desc">
						{{item.desc}}
					</view>
					<view class="album_btn">
						<view class="album-attention">
							关注
						</view>
					</view>

				</view>
			</navigator>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		mounted() {
			uni.setNavigationBarTitle({
				title: '专辑'
			})
			this.getList()
		},
		data() {
			return {
				params: {
					limit: 5,
					order: "new",
					skip: 0
				},
				hasMore: true,
				banner: [],
				album: []
			}
		},
		methods: {
			getList() {
				this.request({
					url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
					data: this.params
				}).then(res => {
				  //不用重新组装的数据
					if (this.banner.length === 0) {
						this.banner = res.res.banner
					}
					//判断是否还有数据
					if (res.res.album.length === 0) {
						console.log(res.res.album)
						this.hasMore = false
						return;
					}
					//有数据的进行组装
					this.album = [...res.res.album, ...this.album]
				}).catch(res => {
					console.log(res)
				})
			},
			handleToLower() {
				if (this.hasMore) {
					this.params.skip += this.params.limit;
					this.getList()
				} else {
					uni.showToast({
						title: "没了",
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.album_scroll_view {
		height: calc(100vh - 36px);
	}

	.album_swiper {
		swiper {
			height: calc(750rpx/2.3);

			image {
				height: 100%;
			}
		}
	}

	.album_list {
		padding: 10rpx;

		.album_item {
			padding: 10rpx 0;
			display: flex;
			border-bottom: 1rpx solid #ccc;

			.album_img {
				flex: 1;
				padd: 10rpx;

				image {
					width: 200rpx;
					height: 200rpx;
				}
			}

			.album_info {
				flex: 2;
				padding: 0 10rpx;
				overflow: hidden;

				.album_name {
					font-size: 30rpx;
					color: #000;
					padding: 10rpx 0;
				}

				.album_desc {
					padding: 10rpx 0;
					font-size: 24rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}

				.album_btn {
					padding: 10rpx;
					display: flex;
					justify-content: flex-end;

					.album-attention {
						color: $color;
						border: 2rpx solid $color;
						padding: 10rpx;
					}
				}
			}
		}
	}
</style>
