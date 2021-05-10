<template>
	<view class="box2" hover-class="box2-active">
		<view class="box" hover-start-time="2000" hover-class="box-active" hover-stop-propagation>我是一个大盒子</view>
		<button class="abutton" size="mini" type="primary" plain >通过方法跳转到about页面</button>
		<image src="../../static/hmlogo.png" ></image>
		<image src="../../static/hmlogo.png" mode="aspectFit"></image>
		<image src="../../static/hmlogo.png" mode="aspectFill"></image>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.abutton {
		margin-top: 100px;
	}

	.box {
		width: 100px;
		height: 100px;
		background: #DD4A68;
	}

	.box2 {
		width: 200px;
		height: 100px;
		background-color: #48C23D;
	}

	.box-active {
		background-color: #0062CC;
	}

	.box2-active {
		background-color: black;
	}
</style>
