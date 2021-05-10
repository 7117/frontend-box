<template>
	<view>
		<view class="news_item" @click="navigator(item.id)" v-for="(item,index) in newsList" :key="index">
			<image :src="item.img_url"></image>
			<view class="right">
				<view class="tit">
					{{item.title}}
				</view>
				<view class="info">
					<text>{{item.add_time | formatDate}}</text>
					<text>{{item.click}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['newsList'],

		filters:{
			formatDate(date){
				const oDate = new Date(date)
				const year = oDate.getFullYear();
				const mon = oDate.getMonth().toString().padStart(2, 0);
				const day = oDate.getDay().toString().padStart(2, 0);
				return year + '-' + mon + '-' + day
			}
		},
		methods: {
			navigator(id) {
				this.$emit('itemClick', id)
			}
		}
	}
</script>

<style lang="scss">
	.news_item {
		display: flex;
		border-bottom: 1px solid $shop-color;

		image {
			max-width: 200rpx;
			height: 150rpx;
		}

		.right {
			box-sizing: border-box;
			padding: 5rpx 5rpx 5rpx 15rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.tit {
				font-size: 33rpx;
			}

			.info {
				font-size: 24rpx;

				text:nth-child(2) {

					margin-left: 30rpx;
				}
			}
		}
	}
</style>
