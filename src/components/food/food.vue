<template>
	<transition name="slide">
		<div class="food" v-show="showFlag">
			<div class="food-content">
				<div class="image-header">
					<img :src="food">
				</div>	
			</div>		
		</div>
	</transition>
</template>

<script>
	export default {
		props: {
			food: {type: Object, default() {return {}}}
		},
		data() {
			return {
				showFlag: false
			}
		},
		methods: {
			show() {
				this.showFlag = true
			},
			hide() {
				this.showFlag = false
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.food
		position fixed
		top 0
		bottom 48px
		left 0
		z-index 30
		width 100%
		background #fff
		transform translate3d(0,0,0)
		&.slide-enter, &.slide-leave-active
			transform translate3d(100%,0,0)
		&.slide-enter-active, &.slide-leave-active
			transition all .5s linear
</style>
