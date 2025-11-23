<div class="box">
	<slot />
</div>

<style>
	.box {
		display: inline-block;
		width: 350px;
		border: 2px inset rgba(255,255,255,0.5);
		border-radius: 2px;
		box-shadow: inset 0 0 0 5px #bbc06e, inset 0 0 0 6px rgb(255 255 255 / 50%);
		padding: 1em;
		margin: 0 0 1em 0;
		text-align: center;
		align-items: center;
		background-color: rgb(177, 116, 36);
	}
</style>
