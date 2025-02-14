<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { formSchema, type FormSchema } from "$lib/schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } =
    $props();

  const form = superForm(data.form, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="my-2 w-[calc(100vh*2/3)]">
  <Form.Field {form} name="message">
    <Form.Control>
      {#snippet children({ props })}
        <Textarea
          {...props}
          placeholder="Message..."
          rows={3}
          class="resize-none"
          bind:value={$formData.message}
        />
      {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Send</Form.Button>
</form>
