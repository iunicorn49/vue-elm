<template>
	<div class="cart-control">
		<div @click.stop="decrease" class="decrease icon-remove_circle_outline" v-show="count > 0"></div>
		<div class="count" v-show="count > 0">{{count}}</div>
		<div @click.stop="add" class="add icon-add_circle"></div>
	</div>
</template>

<script>
	export default {
		props: {
			food: {type: Object, default() {return {}}}
		},
		data() {
			return {
				count: 0
			}
		},
		created() {
			this.count = this.food.count ? this.food.count : this.count
		},
		methods: {
			add() {
				this.count++
			},
			decrease() {
				this.count--
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.cart-control
		font-size 0
		.decrease, .count, .add
			display inline-block
		.decrease, .add
			padding 6px
			font-size 24px
			line-height 24px
			color rgb(0,160,220)
		.count
			vertical-align top
			width 12px
			padding-top 6px
			line-height 24px
			text-align center
			font-size 10px
			color rgb(147,153,159)
</style>
