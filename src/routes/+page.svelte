<script lang="ts">
import storage from "$lib";

const s = storage("page", "localStorage");

// s.set({ foo: -1, bar: 2, x: void 0 });

const foo = s.get();
console.log({ foo });
</script>

{s.get()}
