<template>
	<view>
		B组件这是b组件{{num}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: 0
			};
		},
		created() {
			uni.$on("updateNum", num => {
				this.num = this.num + num
			})
		},
		methods: {
		}
	}
</script>

<style>

</style>
