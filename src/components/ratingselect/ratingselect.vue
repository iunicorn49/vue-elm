<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span @click.stop="select(2)" class="block positive" :class="{'active': selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click.stop="select(1)" class="block positive" :class="{'active': selectType === 1}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
			<span @click.stop="select(0)" class="block negative" :class="{'active': selectType === 0}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
		</div>
		<div class="switch" :class="{'on': onlyContent}">
			<span @click.stop="toogleContent" class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>

	const POSITIVE = 1
	const NEGATIVE = 0
	const ALL = 2

	export default {
		props: {
			ratings: {type: Array, default() {return []}},
			selectType: {type: Number, default: ALL},
			onlyContent: {type: Boolean, default: false},
			desc: {
				type: Object, 
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}	
				}
			}
		},
		computed: {
			positive() {
				return this.ratings.filter(item => {
					return item.rateType === POSITIVE
				})
			},
			negative() {
				return this.ratings.filter(item => {
					return item.rateType === NEGATIVE
				})
			}
		},
		methods: {
			select(type) {
				this.$emit('evSelect', type)
			},
			toogleContent() {
				this.$emit('evToogle')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import '../../common/stylus/mixin.styl'

	.ratingselect
		.rating-type
			padding 18px 0
			margin 0 18px
			border-1px(rgba(7,17,27,.1))
			font-size 0
			.block
				display inline-block
				padding 8px 12px
				margin-right 8px
				border-radius 1px
				color rgb(77,85,93)
				font-size 12px
				line-height 16px
				&.active
					color #fff
				&.positive
					background rgba(0,160,220,.2)
					&.active
						background rgba(0,160,220,1)
				&.negative
					background rgba(77,85,93,.2)
					&.active
						background rgba(77,85,93,1)
				.count
					font-size 8px
					margin-left 2px
		.switch
			padding 12px 18px
			line-height 24px
			font-size 12px
			border-bottom 1px solid rgba(7,17,27,.1)
			color rgb(147,153,159)
			font-size 0
			.icon-check_circle
				display inline-block
				vertical-align top
				margin-right 4px
				font-size 24px
			.text
				font-size 12px
			&.on
				.icon-check_circle
					color #00c850
</style>
