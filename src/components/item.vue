<template>
	<div class='itemWrap' @click='fn'>
		<span v-show='bol'><slot name='activeImg'></slot><br/></span>
		<span v-show='!bol'><slot name='normalImg'></slot><br/></span>
		<span :class='{active: bol}'>{{ txt }}</span>
	</div>
</template>

<script>
export default {
	props: ['txt', 'mark', 'sel'],
	computed: {
		bol: function(){
			if (this.mark == this.sel){
				return true;
			}
			return false;
		}
	},
	methods: {
		fn: function(){
			this.$emit('change',this.mark);
			this.$router.push('/' + this.mark);
		}
	}
}
</script>

<style>
.itemWrap{width: 25%; float: left; text-align: center;font-size: 0rem;}
.itemWrap img{width: 1rem;height: 1rem;margin-top: 0.5rem;}
.itemWrap span{font-size: 0.6rem; color: #666;display: block;margin-top: 0.1rem;}
.itemWrap .active{color: #611987;}
</style>
