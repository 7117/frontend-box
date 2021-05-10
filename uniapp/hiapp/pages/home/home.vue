<template>
	<view>
		<view>
			数据学习{{msg}}
		</view>
		<view>
			{{1+2}}
		</view>
		<view>
			<image v-bind:src="imgurl"></image>
		</view>
		<view v-for="(item,index) in arr" :key="item.id">
			名字：{{item.name}}
			年龄：{{item.age}}
		</view>

		<button type="primary" v-on:click="clickHandle(20,$event)">按钮</button>

		<navigator url="/pages/navigator/navigator?id=100">跳轉navigator按钮</navigator>
		<navigator url="/pages/message/message" open-type="switchTab">跳轉tabbar按钮</navigator>
		<navigator url="/pages/message/message" open-type="redirect">跳轉redirect按钮</navigator>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: 'hello',
				imgurl: "https://www.uniswap123.com/assets/images/robot.jpg",
				arr: [{
						name: "宋小宝",
						age: 20,
						id: 1
					},
					{
						name: "宋小宝",
						age: 20,
						id: 1
					},
					{
						name: "宋小宝",
						age: 20,
						id: 1
					}
				]
			}
		},
		methods: {
			onUnload() {
				console.log("unload")
			},
			clickHandle(es, $event) {
				console.log(es, $event)
			}
		}
	}
</script>

<style>

</style>
