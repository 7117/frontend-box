<template>
	<view>
		A组件<button @click="addNum">A组件修改B组件的数据</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods:{
			addNum(){
				uni.$emit("updateNum",10)
			}
		}
	}
</script>

<style>

</style>
