<template>
	<view class="news">
		<!-- :是绑定数据  给孩子传递的 -->
		<!-- @是收获数据  给父亲传递的 -->
		<news-item :newsList="newsList" @itemClick="goDetail"></news-item>
	</view>
</template>

<script>
	import newsItem from "../../components/news-item/news-item.vue"
	export default {
		data() {
			return {
				newsList: []
			}
		},
		onLoad() {
			this.getNew()
		},
		components: {
			"news-item": newsItem
		},
		methods: {
			async getNew() {
				const res = await this.$myRequest({
					url: '/api/getnewslist'
				})

				this.newsList = res.data.message
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/news-detail/news-detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.news {
		box-sizing: border-box;
		padding: 5rpx;
	}
</style>
