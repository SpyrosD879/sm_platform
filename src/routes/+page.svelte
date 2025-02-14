<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { pb } from "$lib/pocketbase";

  let messages: any[] = $state([]);
  let unsubscribe: () => void;
  onMount(async () => {
    const resultList = await pb.collection("messages").getList(1, 50, {
      sort: "+created",
    });
    messages = resultList.items;

    unsubscribe = await pb
      .collection("messages")
      .subscribe("*", async ({ action, record }) => {
        if (action === "create") {
          messages = [...messages, record];
        }
      });
  });

  onDestroy(() => {
    unsubscribe?.();
  });

  import type { PageData } from "./$types.js";
  import MenuBar from "./MenuBar.svelte";
  import MessagesCard from "./MessagesCard.svelte";
  import MessageForm from "./MessageForm.svelte";
  let { data }: { data: PageData } = $props();
</script>

<div class="flex items-center justify-center h-screen">
  <div
    id="this div is so that the whole image is centered; not every component"
  >
    <MenuBar />
    <div class="flex gap-6">
      <MessagesCard {messages} />
      <MessageForm {data} />
    </div>
  </div>
</div>
