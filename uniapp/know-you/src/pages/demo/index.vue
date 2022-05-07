<template>
	<view>
		<view @touchstart="handleTouchstart" @touchend="handleTouchend">
			ssss
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			handleTouchstart(event) {
				console.log(event.changedTouches[0].clientX)
				console.log(event.changedTouches[0].clientY)
			},
			handleTouchend(event) {
				console.log("bbbb")
			}
		}
	}
</script>

<style>

</style>
