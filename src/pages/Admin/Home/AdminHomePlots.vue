<template>
	<section class="PlotsArea">
		<div id="plot-1" class="plot-card totle-apply">
			<ChartTotleApply></ChartTotleApply>
		</div>
		<div id="plot-2" class="plot-card task-type">2</div>
		<div id="plot-3" class="plot-card totle-worked">3</div>
		<div id="plot-4" class="plot-card animal-ethic">4</div>
		<div id="plot-5" class="plot-card animal-buy">5</div>
		<div id="plot-6" class="plot-card animal-lib">6</div>
		<div id="plot-7" class="plot-card apply-tend">7</div>
		<div id="plot-8" class="plot-card reply-list">8</div>
		<div id="plot-9" class="plot-card apply-type">9</div>
		<div id="plot-10" class="plot-card apply-prop">10</div>
		<div id="plot-11" class="plot-card apply-undo">11</div>
		<div id="plot-12" class="plot-card apply-logs">12</div>
		<div id="plot-13" class="plot-card people-stat">13</div>
	</section>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import ChartTotleApply from './Plots/ChartTotleApply.vue';
</script>

<script lang="ts">
export default defineComponent({
	name: 'AdminHomePlots',
});
</script>

<style scoped lang="less">
.PlotsArea {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: repeat(8, 20vh);
	grid-gap: 2vw;
	grid-auto-rows: 10vw;
	grid-auto-columns: 1fr;
	grid-template-areas:
		'a b c'
		'd e f'
		'd e f'
		'g g h'
		'g g h'
		'i j k'
		'i j l'
		'm m l';
}

.cell {
	background-color: #bfa;
	width: 100%;
	height: 10vw;
}
#plot-1 {
	grid-area: a;
}
#plot-2 {
	grid-area: b;
}
#plot-3 {
	grid-area: c;
}
#plot-4 {
	grid-area: d;
}
#plot-5 {
	grid-area: e;
}
#plot-6 {
	grid-area: f;
}
#plot-7 {
	grid-area: g;
}
#plot-8 {
	grid-area: h;
}
#plot-9 {
	grid-area: i;
}
#plot-10 {
	grid-area: j;
}
#plot-11 {
	grid-area: k;
}
#plot-12 {
	grid-area: l;
}
#plot-13 {
	grid-area: m;
}

.plot-card {
	background-color: #fff;
	border-radius: 1vw;
	box-shadow: 0 0 0.6vw rgba(0, 0, 0, 0.2);
	overflow: hidden;
}
</style>
