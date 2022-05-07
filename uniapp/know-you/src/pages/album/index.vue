<template>
	<view>
		<view class="album_bg">
			<image :src="album.cover" mode="widthFix"></image>
			<view class="album_info">
				<view class="album_name">
					<text>{{album.name}}</text>
				</view>
				<view class="album_btn">
					关注专辑
				</view>
			</view>
		</view>

		<view class="album_author">
			<view class="album_author_info">
				<image mode="widthFix" :src="album.user.avatar"></image>
				<view class="author_name"><text>{{album.user.name}}</text></view>
			</view>
			<view class="album_author_desc"><text>{{album.desc}}</text></view>
		</view>

		<view class="album_list">
			<view class="album_item" v-for="(item,index) in wallpaper" :key="item.id">
				<go-detail :list="wallpaper" :index="index">
					<image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
				</go-detail>
			</view>
		</view>
	</view>
</template>

<script>
	import goDetail from "@/components/goDetail.vue";

	export default {
		onLoad(options) {
			this.id = options.id
			this.getList()
		},
		onReachBottom() {
			if (this.hasMore) {
				this.params.first = 0
				this.params.skip += this.params.limit
				this.getList()
			} else {
				uni.showToast({
					title: "none",
					icon: "none",
				})
			}
		},
		data() {
			return {
				params: {
					limit: 5,
					order: "new",
					skip: 0,
					first: 1
				},
				id: -1,
				album: {},
				wallpaper: [],
				hasMore: true,
			}
		},
		methods: {
			getList() {
				this.request({
					url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
					data: this.params
				}).then(res => {
					if (Object.keys(this.album).length === 0) {
						this.album = res.res.album
					}

					if (res.res.wallpaper.length === 0) {
						this.hasMore = false;
						uni.showToast({
							title: "none",
							icon: "none",
						})
						return;
					}

					this.wallpaper = [...this.wallpaper, ...res.res.wallpaper]
				}).catch(res => {
					console.log(res)
					uni.showToast({
						title: res,
						icon: "none"
					})
				})
			}
		},
		components: {
			goDetail
		},
	}
</script>

<style lang="scss" scoped>
	.album_bg {
		position: relative;

		image {}

		.album_info {
			position: absolute;
			width: 100%;
			left: 0;
			bottom: 0;
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			align-items: center;
			padding: 0 15rpx;
			color: #fff;

			.album_name {
				font-size: 40rpx;
			}

			.album_btn {
				background-color: $color;
				width: 152rpx;
				height: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 10rpx;
			}
		}

	}

	.album_author {
		padding: 10rpx;

		.album_author_info {
			display: flex;
			align-items: center;

			image {
				width: 50rpx;
			}

			.author_name {
				color: #000;
				margin-left: 30rpx;
			}
		}

		.album_author_desc {}
	}


	.album_list {
		display: flex;
		flex-wrap: wrap;

		.album_item {
			width: 33.33%;
			border: 3rpx solid #fff;

			image {
				height: 160rpx;
			}
		}
	}
</style>
