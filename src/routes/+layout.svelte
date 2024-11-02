<script>
	const { children, data } = $props();
  const isAuth = data.isAuthenticated;

</script>
<nav>
  <h1>Neon Authorize + WorkOS Demo</h1>
  {#if isAuth}
    <a href="/logout">Sign out</a>
  {:else}
    <a href="/login">Sign in</a>
  {/if}
</nav>
{@render children()}
