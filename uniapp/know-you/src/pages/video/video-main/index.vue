<template>
	<scroll-view @scrolltolower="handleScrolltolower" scroll-y="true" enable-flex class="video_main">
		<view @click="handleGoVideo(item)" class="video_item" v-for="(item,index) in videowp" :key="index">
			<image :src="item.img" mode="widthFix"></image>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			urlobj: Object
		},
		watch: {
			urlobj() {
				this.videowp = []
				this.getList()
			}
		},
		data() {
			return {
				videowp: [],
				hasMore: true,
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList() {
				this.request({
					url: this.urlobj.url,
					data: this.urlobj.params,
				}).then(res => {
					if (res.res.videowp.length === 0) {
						this.hasMore = false
						uni.showToast({
							title: "没了",
							icon: "none",
						})
					}
					this.videowp = [...res.res.videowp, ...this.videowp]
				})
			},
			handleScrolltolower() {
				if (this.hasMore) {
					this.urlobj.params.skip += this.urlobj.params.limit
					this.getList()
				} else {
					uni.showToast({
						title: "没了",
						icon: "none",
					})
				}
			},
			handleGoVideo(item) {
				getApp().globalData.video = item
				uni.navigateTo({
					url: "/pages/videoPlay/index"
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.video_main {
		display: flex;
		flex-wrap: wrap;
		height: calc(100vh - 36px);

		.video_item {
			width: 33.33%;
			border: 5rpx solid #fff;
		}
	}
</style>
