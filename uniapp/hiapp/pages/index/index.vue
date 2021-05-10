<template>
	<view class="content">
		<test v-if="flag" :title="title" @myEven="getNum"></test>
		<button type="primary" @click="qiehuan">切換TEST組件</button>
		子组件给父组件的{{num}}
		<testA></testA>
		<testB></testB>	
		<view>
		    <uni-calendar 
		    :insert="true"
		    :lunar="true" 
		    :start-date="'2019-3-2'"
		    :end-date="'2019-5-20'"
		    @change="change"
		     ></uni-calendar>
		</view>
	</view>
</template>

<script>
	import test from '../../components/test.vue'
	import testA from '../../components/a.vue'
	import testB from '../../components/b.vue'
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'

	
	export default {
		data() {
			return {
				title: 'Hello',
				flag: true,
				num:0
			}
		},
		onLoad(options) {
			console.log("onLoad", options)
		},
		onShow() {
			console.log("on show")
		},
		onReady() {
			console.log("on ready")
		},
		onHide() {
			console.log("on hide")
		},
		methods: {
			qiehuan() {
				this.flag = !this.flag
			},
			getNum(num){
				this.num= num
				console.log(num)
			},
			change(e){
				console.log("a")
			}
		},
		components: {
			test: test,
			testA:testA,
			testB:testB,
			uniCalendar
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
