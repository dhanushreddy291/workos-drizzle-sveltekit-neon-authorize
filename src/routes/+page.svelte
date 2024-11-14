<script>
  const { data } = $props();

  const { posts } = data;
</script>

<ol class="posts">
  {#each posts as post}
    <li class="post">
      <p class="post-head">
        <span class="post-title">{post.title}</span>
        <span class="post-user">{post.userId}</span>
      </p>
      <p class="post-content">{post.content}</p>
    </li>
  {/each}
</ol>
