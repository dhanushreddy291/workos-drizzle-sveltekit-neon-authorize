<script>
  const { children, data } = $props();
  const isAuth = data.isAuthenticated;
</script>

<nav>
  <h1><a href="/"> Neon Authorize + WorkOS Demo </a></h1>
  <div>
    {#if isAuth}
      <a class="btn" href="/post">Post</a>
      <a class="btn" href="/logout">Sign out</a>
    {:else}
      <a class="btn" href="/login">Sign in</a>
    {/if}
  </div>
</nav>
{@render children()}
