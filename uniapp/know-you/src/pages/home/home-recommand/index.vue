<template>
	<scroll-view scroll-y @scrolltolower="handleToLower" class="recommand_view" v-if="recommends.length>0">
		<view class="recommand_wrap">
			<navigator class="recommand_item" v-for="item in recommends" :key="item.id"
				:url="`/pages/album/index?id=${item.target}`">
				<image :src="item.thumb" mode="widthFix"></image>
			</navigator>
		</view>

		<view class="months_wrap">
			<view class="months_title">
				<view class="months_title_info">
					<view class="months_info">
						<text>{{months.MM}}/</text>
						{{months.MM}}月
					</view>
					<view class="months_text">你负责美丽就好</view>
				</view>
				<view class="months_title_more">更多 >
				</view>
			</view>
			<view class="months_content">
				<view class="months_item" v-for="(item,index) in months.items" :key="item.id">
					<go-detail :list="months.items" :index="index">
						<image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
					</go-detail>
				</view>
			</view>
		</view>

		<view class="hots_wrap">
			<view class="hots_title">
				<text>热门</text>
			</view>
			<view class="hots_content">
				<view class="hots_item" v-for="(item,index) in hots" :key="item.id">
					<go-detail :list="hots" :index="index">
						<image :src="item.thumb" mode="widthFix"></image>
					</go-detail>
				</view>
			</view>
		</view>
	</scroll-view>
</template>


<script>
	import moment from "moment";
	import goDetail from "@/components/goDetail.vue";

	export default {
		data() {
			return {
				recommends: [],
				months: {},
				hots: [],
				params: {
					limit: 30,
					order: "hot",
					skip: 0
				},
				hasMore: true,
			}
		},
		mounted() {
			this.getList()
			uni.setNavigationBarTitle({
				title: "推荐"
			})
		},
		components: {
			goDetail
		},
		methods: {
			handleToLower() {
				if (this.hasMore) {
					this.params.skip += this.params.limit
					this.getList()
				} else {
					uni.showToast({
						title: "没了",
						icon: "none"
					})
				}

			},
			getList() {
				this.request({
					url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
					data: this.params,
				}).then(res => {

					if (res.res.vertical.length === 0) {
						this.hasMore = false
						return;
					}

					if (this.recommends.length === 0) {
						this.recommends = res.res.homepage[1].items;
						this.months = res.res.homepage[2];
						this.months.MM = moment(this.months.stime).format("MM")
						this.months.DD = moment(this.months.stime).format("DD")
					}
					this.hots = [...this.hots, ...res.res.vertical];
				}).catch(res => {
					console.log(res)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.recommand_view {
		height: calc(100vh - 36px);
	}

	.recommand_wrap {
		display: flex;
		flex-wrap: wrap;

		.recommand_item {
			width: 50%;
			border: 3 rpx solid #fff;
		}
	}

	.months_wrap {
		.months_title {
			display: flex;
			justify-content: space-between;
			padding: 20rpx;

			.months_title_info {
				color: $color;
				font-size: 30rpx;
				font-weight: 600;
				display: flex;

				.months_info {
					text {
						font-size: 36rpx;
					}
				}

				.months_text {
					color: #666;
					margin-left: 30rpx;
					font-size: 34rpx;
				}
			}

			.months_title_more {
				font-size: 24rpx;
				color: $color;
			}
		}

		.months_content {
			display: flex;
			flex-wrap: wrap;

			.months_item {
				width: 33.33%;
				border: 5rpx solid #fff;
			}
		}
	}

	.months_content {}

	.hots_wrap {
		.hots_title {
			padding: 20rpx;

			text {
				border-left: 20rpx solid #000;
				font-size: 24rpx;
				font-weight: 600;
				padding-left: 20rpx;
			}
		}

		.hots_content {
			display: flex;
			flex-wrap: wrap;

			.hots_item {
				width: 33.33%;
				border: 5rpx solid #fff;
			}
		}
	}
</style>
