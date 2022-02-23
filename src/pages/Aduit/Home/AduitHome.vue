<template>
	<div class="wapper">
		<div class="searchBox">
			<div class="search">
				<a-form :model="state.search.condition" name="basic" autocomplete="off">
					<a-input-search v-model:value="state.search.condition.title" placeholder="搜索内容" enter-button="Search" size="large" />
					<a-form-item label="年度" name="year">
						<a-radio-group v-model:value="state.search.condition.year" option-type="button" :options="state.search.options.year" />
					</a-form-item>
					<a-form-item label="类型" name="type">
						<a-radio-group v-model:value="state.search.condition.type" option-type="button" :options="state.search.options.type" />
					</a-form-item>
					<a-form-item label="状态" name="state">
						<a-radio-group v-model:value="state.search.condition.state" option-type="button" :options="state.search.options.state" />
					</a-form-item>
				</a-form>
			</div>
			<div class="btns"></div>
		</div>

		<div class="plots">
			<div id="aduit-plot-1" class="plot-card">1</div>
			<div id="aduit-plot-2" class="plot-card">2</div>
			<div id="aduit-plot-3" class="plot-card">3</div>
			<div id="aduit-plot-4" class="plot-card">4</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, reactive } from 'vue';

const state = reactive({
	search: {
		options: {
			year: [
				{ label: 'Apple', value: 'Apple' },
				{ label: 'Pear', value: 'Pear' },
			],
			type: [
				{ label: 'Apple', value: 'Apple' },
				{ label: 'Pear', value: 'Pear' },
			],
			state: [
				{ label: 'Apple', value: 'Apple' },
				{ label: 'Pear', value: 'Pear' },
			],
		},
		condition: {
			title: '',
			year: '',
			type: '',
			state: '',
		},
	},
});
</script>

<script lang="ts">
export default defineComponent({
	name: 'AduitHome',
});
</script>

<style lang="less" scoped>
.wapper {
	min-width: 1200px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.searchBox {
		display: flex;
		padding: 3vh 5vw;
		background-color: #fff;
		box-shadow: 0 0 0.6vw rgba(0, 0, 0, 0.2);
		border-radius: 20px;
		.search {
			flex-grow: 1;
		}
	}
	.plots {
		background-color: #bfa;
		padding: 3vh 5vw;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 20vh);
		grid-gap: 2vw;
		grid-template-areas:
			'a b'
			'c d';
		#aduit-plot-1 {
			grid-area: a;
		}
		#aduit-plot-2 {
			grid-area: b;
		}
		#aduit-plot-3 {
			grid-area: c;
		}
		#aduit-plot-4 {
			grid-area: d;
		}
		.plot-card {
			background-color: #fff;
			border-radius: 1vw;
			box-shadow: 0 0 0.6vw rgba(0, 0, 0, 0.2);
			overflow: hidden;
		}
	}
}
</style>
