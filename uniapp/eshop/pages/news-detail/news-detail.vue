<template>
	<view class="news_detail">
		<text class="tit">{{detailList.title}}</text>
		<view class="info">
			<text>发表时间：{{detailList.add_time}}</text>
			<text>浏览：{{detailList.click}}</text>
		</view>

		<view class="content">
			<rich-text :nodes="detailList.content"></rich-text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				detailList: {}
			}
		},
		methods: {
			async getNewsDetail() {
				const res = await this.$myRequest({
					url: '/api/getnew/' + this.id
				})

				if (res.data.message.length < 1) {
					res.data.message={
						"title":"空",
						"add_time":20202020,
						"click":1,
						"content":"<p>AAAAAAAAAAA</p>"
					}
				}

				this.detailList = res.data.message
			}
		},
		onLoad(options) {
			this.getNewsDetail()
			this.id = options.id
		}
	}
</script>

<style lang="scss">
	.news_detail {
		font-size: 30rpx;
		padding: 0 20rpx;

		.tit {
			text-align: center;
			width: 710rpx;
			display: block;
			margin: 20rpx 0;
		}

		.info {
			display: flex;
			justify-content: space-between;
		}

	}
</style>
