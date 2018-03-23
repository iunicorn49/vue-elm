<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menu">
			<ul>
				<li :class="{'current': currentIndex === index}"
					@click.stop="selectMenu(index, $event)" 
					v-for="(item, index) in goods" 
					:key="index" 
				class="menu-item">
					<span class="text border-1px">
						<span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foods">
			<ul>
				<li v-for="(item, index) in goods" :key="index" class="food-list-hook food-list">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-for="(food, fIndex) in item.foods" :key="fIndex" class="food-item border-1px">
							<div class="icon">
								<img width="57" :src="food.icon">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">${{food.price}}</span><span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
								</div>
								<div class="cart-control-wrapper">
									<cart-control :food="food"></cart-control>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<cart
			:delivery-price="seller.deliveryPrice"
			:min-price="seller.minPrice"
		></cart>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import Cart from 'components/cart/cart'
	import CartControl from 'components/cartControl/cartControl'

	const ERR_OK = 0

	export default {
		name: 'goods',
		props: {
			seller: {type: Object, default() {return {}}}
		},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0
			}
		},
		computed: {
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let height1 = this.listHeight[i]
					let height2 = this.listHeight[i + 1]
					if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						return i
					}
				}
				return 0
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			this.$http.get('/api/goods').then(res => {
				let result = res.data
        if (result.errno === ERR_OK) {
					this.goods = result.data
					this.$nextTick(() => {
						this._initScroll()
						this._calculateHeight()
					})
        }
			})
		},
		methods: {
			_initScroll() {
				let menu = this.$refs.menu
				let foods = this.$refs.foods
				this.menuScroll = new BScroll(menu, {
					click: true
				})
				this.foodsScroll = new BScroll(foods, {
					probeType: 3,
					click: true
				})
				this.foodsScroll.on('scroll', pos => {
					this.scrollY = Math.abs(Math.round(pos.y))
				})
			},
			_calculateHeight() {
				let foodList = this.$refs.foods.querySelectorAll('.food-list-hook')
				let height = 0
				this.listHeight.push(height)
				for(let i = 0; i < foodList.length; i++) {
					let item = foodList[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			},
			selectMenu(index, e) {
				if (!e._constructed) return
				let el = this.$refs.foods.querySelectorAll('.food-list-hook')[index]
				this.foodsScroll.scrollToElement(el, 300)
			}
		},
		components: {
			Cart,
			CartControl
		}
	}
</script>

<style lang="stylus" scoped>
	@import '../../common/stylus/mixin'

	.goods
		display flex
		position absolute
		width 100%
		top 174px
		bottom 46px
		overflow hidden
		.menu-wrapper
			flex 0 0 80px // flex 等分 缩放 占位 
			width 80px // 安卓兼容问题, 需要额外写一个width
			background #f3f5f7

			.menu-item
				display table
				height 54px
				width 56px
				line-height 14px
				padding 0 12px
				font-size 0
				&.current
					background #fff
					position relative
					margin-top -1px
					z-index 10
					font-weight 700
					.text
						border-none()
				.icon
					display inline-block
					vertical-align top
					width 12px
					height 12px
					margin-right 2px
					background-size 12px 12px
					background-repeat no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')
				.text
					display table-cell
					width 56px
					vertical-align middle
					font-size 12px
					border-1px(rgba(7,17,27,.1))
				&:last-child
					.text
						border-none()

		.foods-wrapper
			flex 1
			.title
				padding-left 14px
				height 26px
				line-height 26px
				border-right 2px solid #d9dde1
				font-size 12px
				color rgb(147,153,159)
				background #f3f5f7
			.food-item
				display flex
				margin 18px
				padding-bottom 18px
				border-1px(rgba(7,17,27,.1))
				&:last-child
					border-none()
					margin-bottom 0
				.icon
					flex 0 0 57px
					margin-right 10px
				.content
					flex 1
				  .name
						margin 2px 0 8px 0
						height 14px
						font-size 14px
						line-height 14px
						color rgb(7,17,27)
					.desc, .extra
						line-height 10px
						font-size 10px
						color rgb(147,153,159)
					.desc
						margin-bottom 8px
						line-height 14px
					.extra
						.count
							margin-right 12px
					.price
						font-weight 700
						line-height 24px
						.now
							margin-right 8px
							font-size 14px
							color rgb(240,20,20)
						.old
							text-decoration line-through
							font-size 10px
							color rgb(147,153,159)
					.cart-control-wrapper
						position absolute
						bottom 0
						right 0
</style>
