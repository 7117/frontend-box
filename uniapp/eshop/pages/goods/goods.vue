<template>
	<view class="goods_list">
		<goods-list @goodsItemClick="goDetail" :goods="goods"></goods-list>
		<view v-show="flag" class="isOver">我是有底线的</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		data() {
			return {
				pageIndex: 1,
				goods: [],
				isOver: false,
				flag: false,
			}
		},
		onPullDownRefresh() {
			console.log("onPullDownRefresh")
			this.pageIndex = 1
			this.goods = [],
				this.flag = false,
				setTimeout(() => {
					this.getGoodsList(() => {
						uni.stopPullDownRefresh()
					})
				}, 1000)
		},
		onLoad() {
			this.getGoodsList()
		},
		onReachBottom() {
			if (this.goods.length < 10 * this.pageIndex) {
				return this.flag = true
			}
			this.pageIndex++
			this.getGoodsList()
			console.log(this.pageIndex)
		},
		methods: {
			async getGoodsList(callBack) {
				const res = await this.$myRequest({
					url: '/api/getgoods?pageindex=' + this.pageIndex
				})

				this.goods = [...this.goods, ...res.data.message]

				if (callBack) {
					callBack()
				}
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/goods-detail/goods-detail?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods_list {
		background-color: #eee;
		overflow: hidden;
		margin-top: 10px;
	}

	.isOver {
		text-align: center;
		width: 100%;
		height: 50px;
		line-height: 50px;
		font-size: 28rpx;
	}
</style>
