<template>
	<div class="cart">
		<div class="content" @click.stop="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight': totalCount > 0}">
						<i class="icon-shopping_cart"></i>
					</div>
					<div class="num" v-show="totalCount > 0">{{totalCount}}</div>
				</div>
				<div class="price" :class="{'highlight': totalPrice > 0}">$ {{totalPrice}}</div>
				<div class="desc">另需配送费${{deliveryPrice}}元</div>
			</div>
			<div class="content-right">
				<div :class="{'enough': totalPrice >= minPrice}" class="pay">{{payDesc}}</div>
			</div>
		</div>
		<div class="ball-container">
			<transition name="ball" v-for="(ball, index) in balls" 
				@before-enter="beforeEnter"
				@enter="enter"
				@after-enter="afterEnter"
			:key="index">
				<div class="ball" v-show="ball.show"></div>
			</transition>
		</div>
		<transition name="fold">
			<div class="shopcart-list" v-show="listShow">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty">清空</span>
				</div>
				<div class="list-content">
					<ul>
						<li class="food" v-for="(food, index) in selectFoods" :key="index">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>${{food.price * food.count}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cart-control :food="food"></cart-control>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import CartControl from '../cartControl/cartControl'

	export default {
		props: {
			selectFoods: {type: Array, default() {return []}},
			deliveryPrice: {type: Number, default: 0},
			minPrice: {type: Number, default: 0}
		},
		data() {
			return {
				balls: [
					{show: false},
					{show: false},
					{show: false},
					{show: false},
					{show: false}
				],
				dropBalls: [],
				fold: true
			}
		},
		computed: {
			listShow() {
				if (!this.totalCount) {
						this.fold = true
						return false
					}
				let show = !this.fold
				return show
			},
			totalPrice() {
				let total = 0
				this.selectFoods.forEach(item => {
					total += item.price * item.count
				})
				return total
			},
			totalCount() {
				let count = 0
				this.selectFoods.forEach(item => {
					count += item.count
				})
				return count
			},
			payDesc() {
				if (this.totalPrice === 0) return `\$${this.minPrice}元起送`
				if (this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice
					return `还差\$${diff}元起送`
				} else {
					return '去结算'
				}
			}
		},
		methods: {
			toggleList() {
				if (!this.totalCount) return
				this.fold = !this.fold
			},
			drop(target) {
				let ball = this.balls.find(item => {
					return !item.show
				})
				ball.show = true
				ball.el = target
				this.dropBalls.push(ball)
			},
			beforeEnter(el) {
				this.balls.forEach((item, index) => {
					let rect = null
					if (item.show) {
						rect = item.el.getBoundingClientRect() // 获取元素基于视口的坐标
						let x = rect.left - 32
						let y = -(window.innerHeight - rect.top - 22)
						el.style.display = ''
						el.style.webkitTransform = `translate3d(${x}px,${y}px,0)`
						el.style.transform = `translate3d(${x}px,${y}px,0)`
					}
				})
			},
			enter(el) {
				/** 主动触发浏览器重绘, 变量并不使用 */
				let rf = el.offsetHeight
				this.$nextTick(() => {
					el.style.webkitTransform = 'translate3d(0,0,0)'
					el.style.transform = 'translate3d(0,0,0)'
				})
			},
			afterEnter(el) {
				let ball = this.dropBalls.shift()
				if (ball) {
					ball.show = false
					el.style.display = 'none'
				}
			}
		},
		components: {
			CartControl
		}
	}
</script>

<style lang="stylus" scoped>
	$transiton-time = .5s
	.cart
		position fixed
		left 0
		bottom 0
		z-index 50
		width 100%
		height 48px
		.content
			display flex
			background #141d27
			font-size 0
			color rgba(255,255,255,.5)
			.content-left
				flex 1
				.logo-wrapper
					display inline-block
					position relative
					top -10px
					margin 0 12px
					padding 6px
					height 56px
					width 56px
					box-sizing border-box
					vertical-align top
					border-radius 50%
					background #141d27
					.logo
						width 100%
						height 100%
						border-radius 50%
						background rgba(255,255,255,.2)
						text-align center
						.icon-shopping_cart
							font-size 24px
							line-height 44px
						&.highlight
							background rgb(0,120,160)
							.icon-shopping_cart
								color #fff
					.num
						position absolute
						top 0
						right 0
						width 24px
						height 16px
						line-height 16px
						text-align center
						border-radius 16px
						font-size 9px
						font-weight 700
						color #fff
						background #ff5d5d
						box-shadow 0 4px 8px 0 rgba(0,0,0,.4)
				.price
					display inline-block
					vertical-align top
					line-height 24px
					font-size 16px
					margin 12px
					padding-right 12px
					box-sizing border-box
					border-right: 1px solid rgba(255,255,255,.1)
					font-weight 700
					&.highlight
						color #fff
				.desc
					display inline-block
					vertical-align top
					line-height 24px
					margin 12px 0 0 12px
					font-size 10px
			.content-right
				flex 0 0 105px
				width 105px
				text-align center
				.pay
					line-height 48px
					height 48px
					font-size 14px
					font-weight 700
					background #2b333b
					&.enough
						background #00b43c
						color #fff
		.ball-container
			.ball
				position fixed
				left 32px
				bottom 22px
				z-index 200
				width 16px
				height 16px
				border-radius 50%
				background #00a0dc
				transition all .5s
		.shopcart-list
			position absolute
			top 0
			left 0
			z-index -1
			background #fff
			transform translate3d(0, -100%, 0)
			width 100%
			.list-header
				height 40px
				line-height 40px
				padding 0 18px
				background #f3f5f7
				border-bottom 1px solid rgba(7,17,27,.1)
				.title
					float left
					font-size 14px
					color rgb(7,17,27)
				.empty
					float right 
					font-size 12px
					color rgb(0,160,220)
			.list-content
				padding 0 18px
				max-height 217px

		.fold-enter-active, .fold-leave-active
			transition: all 1s
		.fold-enter, .fold-leave-active
			transform: translate3d(0, 0, 0)

</style>
