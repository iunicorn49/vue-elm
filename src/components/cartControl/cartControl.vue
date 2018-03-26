<template>
	<div class="cart-control">
		<transition name="fade">
			<div @click.stop="decrease" class="decrease icon-remove_circle_outline" v-show="food.count > 0"></div>
		</transition>
		<transition name="fade">
			<div class="count" v-show="food.count > 0">{{food.count}}</div>
		</transition>
		<div ref="add" @click.stop="add" class="add icon-add_circle"></div>
	</div>
</template>

<script>

	export default {
		props: {
			food: {type: Object, default() {return {}}}
		},
		methods: {
			add() {
				if (!this.food.count) {
					this.$set(this.food, 'count', 1)
				} else {
					this.food.count++
				}
				this.$emit('isAdd', this.$refs.add)
			},
			decrease() {
				if (!this.food.count || this.food.count <= 0) return
				this.food.count--
			}
		}
	}
</script>

<style lang="stylus" scoped>
	$transiton-time = .7s

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

	.fade-enter-active
		transition $transiton-time
	.fade-leave-active
		transition $transiton-time
		transform translate3d(40px,0,0) rotate(90deg)
		opacity 0
	.fade-enter
		transition $transiton-time
		transform translate3d(40px,0,0) rotate(90deg)
		opacity 0	
</style>
