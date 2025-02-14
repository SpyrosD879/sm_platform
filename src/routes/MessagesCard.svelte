<script>
  import * as Card from "$lib/components/ui/card/index.js";
  let {messages} = $props();
</script>

<Card.Root
  class="flex flex-col-reverse w-[calc(100vh*2/3)] max-h-[calc(100vh*2/3)] overflow-scroll scrollbar-hide"
>
  <Card.Content class="py-0">
    {#each messages as message}
      <Card.Root class="my-4">
        <Card.Content>
          <p class="overflow-hidden max-h-20">{message.content}</p>
        </Card.Content>
      </Card.Root>
    {/each}
  </Card.Content>
</Card.Root>
