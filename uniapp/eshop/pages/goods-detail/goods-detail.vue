<template>
	<view class="goods_detail">
		<swiper indicator-dots>
			<swiper-item v-for="(item,index) in swipers" :key="index">
				<image :src="item.src"></image>
			</swiper-item>
		</swiper>

		<view class="box1">
			<view class="price">
				<text>￥{{detail.sell_price}}</text>
				<text>￥{{detail.sell_price}}</text>
			</view>
			<view class="goods_name">
				{{detail.title}}
			</view>
		</view>

		<view class="line"></view>

		<view class="box2">
			<view>{{detail.stock_quantity}}</view>
			<view>{{detail.sell_price}}</view>
		</view>

		<view class="line"></view>


		<view class="box3">
			<view class="tit">{{content.title}}</view>
			<view class="content">
				<rich-text :nodes="content.content"></rich-text>
			</view>
		</view>

		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>

	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'

	export default {
		data() {
			return {
				id: 0,
				swipers: [],
				detail: {},
				content: {},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		components: {
			uniGoodsNav
		},
		onLoad(options) {
			this.id = options.id
			this.getSwipers()
			this.getDetail()
			this.getContent()
		},
		methods: {
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			},
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/api/getthumimages/' + this.id
				})

				this.swipers = res.data.message

			},
			async getDetail() {
				const res = await this.$myRequest({
					url: '/api/goods/getinfo/' + this.id
				})

				this.detail = res.data.message[0]
			},
			async getContent() {
				const res = await this.$myRequest({
					url: '/api/goods/getdesc/' + this.id
				})
				this.content = res.data.message[0]
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 700rpx;

		image {
			width: 745rpx;
			height: 98%;
			border: 1px solid red;
		}
	}

	.line {
		height: 10rpx;
		width: 750rpx;
		background: #eee;
	}

	.box1 {
		padding: 10rpx;

		.price {
			font-size: 35rpx;
			color: $shop-color;
			line-height: 80rpx;

			text:nth-child(2) {
				color: #ccc;
				font-size: 28rpx;
				text-decoration: line-through;
				margin-left: 20rpx;
			}
		}

		.goods_name {
			font-size: 32rpx;
			line-height: 60rpx;
		}
	}

	.box2 {
		padding: 0 10rpx;
		font-size: 32rpx;
		line-height: 70rpx;
	}

	.box3 {
		padding: 0 10rpx;
		.tit {
			line-height: 70rpx;
			font-size: 30rpx;
			padding-left: 10rpx;
			border-bottom: 2px solid #eee;
		}

		.content {
			padding: 15rpx;
			font-size: 32rpx;
			line-height: 50rpx;
		}
	}
	.goods_nav{
		bottom: 0;
		width: 100%;
		height: 120rpx;
		position: fixed; 
		uni-goods-nav{
			width: 100%;
		}
	}
</style>
