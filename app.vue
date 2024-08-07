<template>
  <div>
    Working ml5 in nuxt: HandPose 
	</div>
</template>

<script setup lang="ts">
useHead({
  script: [
	  {
		  src: 'p5.min.js',
			tagPosition: 'bodyClose'
		},
		{
		  src: 'ml5.js',
			tagPosition: 'bodyClose'
		},
		{
		  src: 'sketch2.js',
			tagPosition: 'bodyClose'
		}
	]
})
</script>
