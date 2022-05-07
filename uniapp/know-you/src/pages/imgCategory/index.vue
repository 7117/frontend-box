<template>
	<view>
		<view class="category_tab">
			<view class="category_tab_title">
				<view class="title_inner">
					<uni-segmented-control :current="current" :values="item.map(v=>v.title)" @clickItem="onClickItem"
						styleType="text" activeColor="#d4237a">
					</uni-segmented-control>
				</view>
				<view class="iconfont iconsearch"></view>
			</view>

			<scroll-view @scrolltolower="handlescrolltolower" enable-flex scroll-y class="category_tab_content">
				<view class="cate_item" v-for="item in vertical" :key="item.id">
					<image :src="item.thumb" mode="widthFix"></image>
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	import {
		uniSegmentedControl
	} from '@dcloudio/uni-ui'

	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				item: [{
						title: '最新',
						order: 'new'
					},
					{
						title: '热门',
						order: 'hot'
					}
				],
				current: 0,
				params: {
					limit: 10,
					skip: 0,
					order: "new"
				},
				vertical: [],
				hasMore: true,
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getList()
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				} else {
					return;
				}
				this.params.order = this.item[e.currentIndex].order
				this.params.skip = 0
				this.vertical = []
				this.getList()
			},
			getList() {
				this.request({
					url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
					data: this.params,
				}).then(res => {
					if (res.res.vertical.length === 0) {
						this.hasMore = false
						uni.showToast({
							title: "没了",
							icon: "none"
						})
						return;
					}
					this.vertical = [...res.res.vertical, ...this.vertical]
				})
			},
			handlescrolltolower() {
				if (this.hasMore) {
					this.params.skip += this.params.limit
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

<style lang="scss">
	.category_tab {
		.category_tab_title {

			position: relative;

			.title_inner {
				width: 60%;
				margin: 0 auto;
			}

			// 问题
			.iconsearch {
				position: absolute;
				top: 23%;
				transform: translate(-50%);
				right: 5%;
			}
		}

		.category_tab_content {
			display: flex;
			flex-wrap: wrap;
			height: calc(100vh - 36rpx);

			.cate_item {
				width: 33.33%;
				border: 4rpx solid #fff;

				image {}
			}
		}

	}
</style>
