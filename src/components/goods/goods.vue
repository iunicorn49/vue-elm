<template>
	<div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li v-for="(item, index) in goods" :key="index" class="menu-item">
					<span class="text border-1px">
						<span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
						{{item.name}}
					</span>

				</li>
			</ul>
		</div>
		<div class="foods-wrapper"></div>
	</div>
</template>

<script>
	const ERR_OK = 0

	export default {
		name: 'goods',
		// props: {
		// 	seller: {type: Object, default: {}}
		// },
		data() {
			return {
				goods: []
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			this.$http.get('/api/goods').then(res => {
				let result = res.data
        if (result.errno === ERR_OK) {
          this.goods = result.data
        }
			})
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
		.foods-wrapper
			flex 1
			background #fff
</style>
