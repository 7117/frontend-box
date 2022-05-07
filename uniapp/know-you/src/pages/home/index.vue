<template>
	<view>
		<view class="home_tab">
			<view class="home_tab_title">
				<view class="title_inner">
					<uni-segmented-control :current="current" :values="item.map(v=>v.title)" @clickItem="onClickItem"
						styleType="text" activeColor="#d4237a">
					</uni-segmented-control>
				</view>
				<view class="iconfont iconsearch"></view>
			</view>

			<view class="home_tab_content">
				<view class="content">
					<view v-show="current === 0">
						<home-recommand></home-recommand>
					</view>
					<view v-show="current === 1">
						<home-category></home-category>
					</view>
					<view v-show="current === 2">
						<home-new></home-new>
					</view>
					<view v-show="current === 3">
						<home-album></home-album>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		uniSegmentedControl
	} from '@dcloudio/uni-ui'

	import homeAlbum from "./home-album"
	import homeCategory from "./home-category"
	import homeNew from "./home-new"
	import homeRecommand from "./home-recommand"

	export default {
		data() {
			return {
				item: [{
						title: '推荐'
					},
					{
						title: '分类'
					},
					{
						title: '最新'
					},
					{
						title: '专辑'
					}
				],
				current: 0
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			}
		},
		components: {
			uniSegmentedControl,
			homeAlbum,
			homeCategory,
			homeNew,
			homeRecommand,
		}
	}
</script>

<style lang="scss">
	.home_tab {
		.home_tab_title {

			position: relative;

			.title_inner {
				width: 60%;
				margin: 0 auto;
			}

			// 问题
			.iconsearch {
				position: absolute;
				top: 23%;
				transform: translate(-50%);
				right: 5%;
			}
		}

		.home_tab_content {}
	}
</style>
