<template>
	<div class="menu-template">
		<div class="separator">horizontal menu</div>
	</div>
</template>

<script>
  export default {
    name: 'menu'
  }
</script>

<style scoped>
	:root{
		--color: {
			background: red;
			color: yellow;
		}
	}
	.separator {
		display: block;
		height: 1rem;
		margin: 1rem;
		@apply --color
	}

</style>
