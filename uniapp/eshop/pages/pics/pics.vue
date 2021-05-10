<template>
	<view class="pics">
		<scroll-view class="left" scroll-y>
			<view @click="clickItem(index,item)" v-for="(item,index) in cates" :key="index" :class="active ===index?'active':''">{{item.title}}</view>
		</scroll-view>

		<scroll-view class="right" scroll-y>
			<view v-if="secondData.length > 0" class="item" v-for="(item,index) in secondData" :key="index">
				<image @click="previewImg(item.img_url)" :src="item.img_url"></image>
				<text>{{item.title}}</text>
			</view>
			<view v-if="secondData.length === 0" class="noData">暂无数据</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cates: [],
				active: 3,
				secondData: [],
			}
		},
		onLoad() {
			this.getPics()
		},
		methods: {
			async getPics() {
				const res = await this.$myRequest({
					url: '/api/getimgcategory'
				})

				this.cates = res.data.message

				this.clickItem(3, this.cates[3])
			},
			async clickItem(index, item) {
				this.active = index

				const res = await this.$myRequest({
					url: '/api/getimages/' + item.id
				})

				this.secondData = res.data.message

			},
			previewImg(current) {
				const urls = this.secondData.map(item => {
					return item.img_url
				})

				uni.previewImage({
					current: current,
					urls: urls
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.pics {
		display: flex;
		height: 100%;

		.left {
			width: 200rpx;
			height: 100%;

			view {
				height: 120rpx;
				line-height: 120rpx;
				text-align: center;
				color: #333;
				font-size: 30rpx;
				border-top: 1px solid #eee;
			}

			.active {
				color: white;
				background: $shop-color;
			}
		}

		.right {
			height: 100%;
			width: 550rpx;
			box-sizing: border-box;
			padding: 5rpx;

			.item {
				image {
					border-radius: 5rpx;
				}

				text {
					font-size: 30rpx;
					line-height: 60rpx;
				}
			}

			.noData {
				display: flex;
				justify-content: center;
			}
		}
	}
</style>
