<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<rating-select @evToogle="toogleContent" @evSelect="select" :only-content="onlyContent" :select-type="selectType" :ratings="ratings"></rating-select>
			<div class="rating-wrapper">
				<ul>
					<li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, index) in ratings" :key="index" class="rating-item">
						<div class="avatar">
							<img width="28" height="28" :src="rating.avatar">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.delivery">{{rating.delivery}}</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="icon-thumb_up"></span>
								<span class="item" v-for="(recommend, recommendIndex) in rating.recommend" :key="recommendIndex">{{recommend}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import Star from 'components/star/star'
	import Split from '../split/split'
	import RatingSelect from '../ratingselect/ratingselect'
	import { formatDate } from 'common/js/date'

	const POSITIVE = 1
	const NEGATIVE = 0
	const ALL = 2

	export default {
		name: 'ratings',
		props: {
			seller: {type: Object, default() {return {}}}
		},
		data() {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true,
			}
		},
		created() {
			this.$http.get('/api/ratings').then(info => {
				info = info.data
				if (info.errno === 0) {
					this.ratings = info.data
				}
			})
		},
		mounted() {
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.ratings, {
					click: true
				})
			})
		},
		methods: {
			needShow(type, text) {
				if (this.onlyContent && !text) return false
				if (this.selectType === ALL) {
					return true
				} else {
					return type === this.selectType
				}
			},
			toogleContent() {
				this.onlyContent = !this.onlyContent
				this.refresh()
			},
			select(type) {
				this.selectType = type
				this.refresh()
			},
			refresh() {
				if (this.scroll) {
					this.$nextTick(() => {
						this.scroll.refresh()
					})
				}
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			}
		},
		components: {
			Star,
			Split,
			RatingSelect
		}
	}
</script>

<style lang="stylus" scoped>
	@import '../../common/stylus/mixin.styl'

	.ratings
		position absolute
		top 174px
		bottom 0
		left 0
		width 100%
		overflow hidden
		.overview
			display flex
			padding 18px 0
			.overview-left
				flex 0 0 137px
				width 137px
				padding 6px 0
				border-right 1px solid rgba(7,17,27,.1)
				text-align center
				@media only screen and (max-width:320px)
					flex 0 0 120px
					width 120px
				.score
					margin-bottom 6px
					line-height 28px
					font-size 24px
					color rgb(255,153,0)
				.title
					margin-bottom 8px
					line-height 12px
					font-size 12px
					color rgb(7,17,27)
				.rank
					line-height 10px
					font-size 10px
					color rgb(147,153,159)
			.overview-right
				flex 1
				padding 6px 0 6px 24px
				@media only screen and (max-width:320px)
					padding-left 6px
				.score-wrapper
					margin-bottom 8px
					line-height 18px
					font-size 0
					.title
						display inline-block
						vertical-align top
						font-size 12px
						line-height 18px
						color: rgb(7,17,27)
					.star
						display inline-block
						vertical-align top
						margin 0 12px
					.score
						display inline-block
						vertical-align top
						color rgb(255,153,0)
						font-size 12px
						line-height 18px
				.delivery-wrapper
					font-size 0
					.title
						font-size 12px
						line-height 18px
						color: rgb(7,17,27)
					.delivery
						margin-left 12px
						font-size 12px
						color rgb(147,153,159)
		.rating-wrapper
			padding 0 18px
			.rating-item
				display flex
				padding 18px 0
				border-1px(rgba(7,17,27,.1))
				.avatar
					flex 0 0 28px
					width 28px
					margin-right 12px
					img
						border-radius 50%
				.content
					flex 1
					position relative
					.name
						margin-bottom 4px
						line-height 12px
						font-size 10px
						color rgb(7,17,27)
					.star-wrapper
						margin-bottom 6px
						font-size 0
						.star
							display inline-block
							vertical-align top
							margin-right 6px
						.delivery
							display inline-block
							vertical-align top
							line-height 12px
							font-size 10px
							color rgb(7,17,27)
					.text
						line-height 18px
						color rgb(7,17,27)
						font-size 12px
						margin-bottom 8px
					.recommend
						line-height 16px
						font-size 0
						.icon-thump_top, .item
							display inline-block
							margin 0 8px 4px 0
							font-size 9px
						.icon-thump_top
							color rgb(0,160,220)
						.item
							padding 0 6px
							border 1px solid rgba(7,17,27,.1)
							color rgb(147,153,159)
							background #fff
							border-radius 1px
					.time
						position absolute
						top 0
						right 0
						line-height 12px
						font-size 10px
						color rgb(147,153,159)

							
</style>
