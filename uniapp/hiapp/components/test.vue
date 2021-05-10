<template>
	<view id="myView">
		test組件{{num}}
		这是父组件传递过来的数值  {{title}}
		<button @click="sendNum">给父组件传值</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: 3,
				initID: false
			};
		},
		props: ['title'],
		methods:{
			sendNum(){
				console.log('父传值')
				this.$emit('myEven',this.num)
			}
		},
		beforeCreate() {
			console.log("beforeCreate")
			console.log(this.num)
		},
		created() {
			this.initID = setInterval(() => {
				console.log("定時器任務")
			}, 1000)
			console.log(this.num)
		},
		beforeMount() {
			// console.log('beforeMount', document.getElementById('myView'))
		},
		mounted() {
			console.log('mounted', document.getElementById('myView'))
		},
		beforeUpdate() {

		},
		destroyed() {
			console.log("destored")
			clearInterval(this.initID)
		}
	}
</script>

<style>
</style>
