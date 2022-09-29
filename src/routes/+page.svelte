<script lang="ts">
import storage from "$lib";

const s = storage("page");

s.set("foo");
</script>

{s.get()}
