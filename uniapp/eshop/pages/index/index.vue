<template>
	<view>
		<swiper indicator-dots circular="true">
			<swiper-item v-for="(item,key) in swipers" :key="item.key">
				<image :src="item.img">
			</swiper-item>
		</swiper>

		<!-- 導航區域 -->
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in navs" :key="index" @click="navClick(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>

		<view class="hot_goods">
			<view class="tit">推薦商品</view>
			<goods-list :goods="goods" @goodsItemClick="goDetail"></goods-list>
		</view>
	</view>
</template>

<script>
	import goodsList from '../../components/goods-list/goods-list.vue'
	export default {
		data() {
			return {
				swipers: [],
				goods: [],
				navs: [{
						icon: 'iconfont icon-ziyuan',
						title: '黑玛超市',
						'path': '/pages/goods/goods'
					},
					{
						icon: 'iconfont icon-ziyuan',
						title: '黑玛超市',
						'path': '/pages/contact/contact'
					},
					{
						icon: 'iconfont icon-ziyuan',
						title: '黑玛超市',
						'path': '/pages/pics/pics'
					},
					{
						icon: 'iconfont icon-ziyuan',
						title: '黑玛超市',
						'path': '/pages/videos/videos'
					},
				]
			}
		},
		onLoad() {
			this.getSwipers()
			this.getHotGoods()
		},
		components: {
			"goods-list":goodsList
		},
		methods: {
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/api/getlunbo'
				})
				this.swipers = res.data.message
				console.log(this.swipers)
			},
			async getHotGoods() {
				const res = await this.$myRequest({
					url: '/api/getgoods?pageindex=1'
				})
				console.log(res)
				this.goods = res.data.message
			},
			navClick(path) {
				uni.navigateTo({
					url: path
				})
			},
			goDetail(id){
				uni.navigateTo({
					url:'/pages/goods-detail/goods-detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}
	}

	.nav {
		display: flex;

		.nav_item {
			width: 25%;
			text-align: center;

			view {
				width: 120rpx;
				height: 120rpx;
				background: $shop-color;
				border-radius: 60rpx;
				margin: 10px auto;
				line-height: 120rpx;
				color: white;
				font-size: 52rpx;
			}

			text {
				font-size: 30rpx;
			}
		}
	}

	.hot_goods {
		background: #eee;
		overflow: hidden;
		margin-top: 10px;

		.tit {
			height: 50px;
			line-height: 50px;
			color: $shop-color;
			text-align: center;
			letter-spacing: 20px;
			background: #fff;
			margin: 10px 0;
		}
	}
</style>
