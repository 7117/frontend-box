<template>
	<view>
		<button @click="get">
			发送请求
		</button>
		<button type="primary" @click="setstoreData">
			存儲數據
		</button>
		<button type="primary" @click="getstoreData">
			獲取數據
		</button>
		<button type="primary" @click="delstoreData">
			移除數據
		</button>
		<view>list</view>
		<view class="box-item" v-for="item in list">
			{{item}}
		</view>
		<button @click="pullDown">
			下拉刷新
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ['前端', '测试', 'UI', '后端', '前端', '测试', 'UI', '后端']
			}
		},
		onPullDownRefresh() {
			console.log("pull down")
			setTimeout(() => {
				this.list = ['前端', '测试', 'UI', '后端']
				uni.stopPullDownRefresh()
			}, 2000)
		},
		onReachBottom() {
			console.log("触底了")
			this.list = [...this.list, ...['a', 'b', 'c']]
		},
		methods: {
			pullDown() {
				uni.startPullDownRefresh()
			},
			get() {
				uni.request({
					url: "http://localhost:8082/api/getlunbo",
					success(res) {
						console.log(res)
					},
				})
			},
			setstoreData(){
				// uni.setStorageSync('id',100);
				uni.setStorage({
					key:'id',
					data:80,
					success() {
						console.log("success")
					},
					fail() {
						console.log("fail")
					}
				})
			},
			getstoreData(){
				uni.getStorage({
					key:'id',
					success(res) {
						console.log("success",res)
					},
					fail() {
						console.log("fail")
					}
				})
			},
			delstoreData(){
				uni.removeStorage({
				    key: 'id',
				    success: function (res) {
				        console.log('success');
				    }
				});
			}
		}
	}
</script>

<style>
	.box-item {
		height: 100px;
		line-height: 100px;
	}
</style>
